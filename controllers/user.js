import { connect } from "mongoose";
import { prisma } from "../config/prisma.js";

export const listUser = async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        picture: true,
        role: true,
        enabled: true,
        address: true,
        createdAt: true,
        updateAt: true,
      },
    });
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const changeStatus = async (req, res) => {
  try {
    const { id, enabled } = req.body;
    if (id !== req.user.id) {
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                enabled: enabled
            }
        })
        return res.send('Update Status Success');
    }
    res.send('Access denied because you can not change status yourself');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const changeRole = async (req, res) => {
    try {
        const { id, role } = req.body;
        if (id !== req.user.id) {
            const user = await prisma.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    role: role
                }
            })
            return res.send('Update role Success');
        }
        res.send('Access denied because you can not change role yourself');
      } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const createCart = async (req, res) => {
  try {
    const { cart } = req.body;
    // console.log(cart);
    // console.log(req.user.id);
    
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id
      }
    })

    // console.log(user);

    // delete on product on cart
    await prisma.productOnCart.deleteMany({
      where: {
        cart: {orderdById: user.id}
      }
    })
    
    // delete on cart
    await prisma.cart.deleteMany({
      where: {
        orderdById: Number(user.id)
      }
    })

    // prepare items
    const productsData = cart.map((item) => ({
      product: { connect: { id: item.id } },
      count: item.count,
      price: item.price
    }));
    
    // console.log("productsData", productsData);
    
    // calculate sum
    let cartTotal = productsData.reduce((sum, item) => sum + item.price * item.count, 0)

    // create new cart
    const newCart = await prisma.cart.create({
        data: {
          products: {
            create: productsData
          },
          cartTotal: cartTotal,
          orderdById: user.id
        }
    })
    // console.log(newCart);
    
    res.send("add product to cart success")
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const listCart = async (req, res) => {
  try {   
    const cart = await prisma.cart.findFirst({
      where: {
        orderdById: Number(req.user.id)
      },
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    })
    // console.log(cart);
    res.json({
      products: cart.products,
      cartTotal: cart.cartTotal
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const deleteCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        orderdById: Number(req.user.id)
      }
    })
    if(!cart){
      return res.status(400).json({ message: 'no cart'})
    }

    await prisma.productOnCart.deleteMany({
      where: {
        cartId: Number(cart.id)
      }
    })

    const result = await prisma.cart.deleteMany({
      where: {
        orderdById: Number(req.user.id)
      }
    })
    res.json({ message: 'cart remove success',
      deletedCount: result.count
    }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const address = async (req, res) => {
  try {
    const { address } = req.body;
    const addressUser = await prisma.user.update({
      where: {
        address: address
      }
    })
    res.send("success update address");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const saveOrder = async (req, res) => {
  try {

    // step 1 get cart
    const userCart = await prisma.cart.findFirst({
      where: {
        orderdById: Number(req.user.id)
      },
      include: {
        products: true
      }
    })

    // check cart empty
    if(!userCart || userCart.products.length === 0) {
      return res.status(400).json({ message: 'cart is empty'})
    }

    // check quantity
    for( const item of userCart.products) {
      const product = await prisma.product.findUnique({
        where: {
          id: item.productId
        },
        select: {
          quantity: true,
          title: true,
        }
      })
      if (!product || item.count > product.quantity){
        return res.status(400).json({ 
          ok: false,
          message: 'product out of stock'})
      }
    }

    // create new order
    const order = await prisma.order.create({
      data: {
        create: userCart.products.map((item) => ({
          productId: item.productId,
          count: item.count,
          price: item.price
        }))
      },
      orderdById: {
        connect: { id: req.user.id}
      },
      cartTotal: userCart.cartTotal
    })

    // update product
    const update = await userCart.product.update((item) => ({
      where: {
        id: item.product.id
      },
      data: {
        quantity: {
          decrement: item.count,
          sold: {
            increment: item.count
          }
        }
      }
    }))

    await Promise.all(
      update.map((updated) => 
        prisma.product.update(updated)
      )
    )

    await prisma.cart.deleteMany({
      where: {
        orderdById: Number(req.user.id)
      }
    })
    res.json({ ok: true, message: 'order'})

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getOrder = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        orderdById: Number(req.user.id)
      },
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    })

    if(orders.length === 0) {
      return res.status(400).json({ ok: false, message: 'No Order'})
    }

    res.json({ ok: true, orders})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
