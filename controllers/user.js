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
    res.send("Hello address");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const createOrder = async (req, res) => {
  try {
    res.send("Hello createOrder");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getOrder = async (req, res) => {
  try {
    res.send("Hello getOrder");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
