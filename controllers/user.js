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
    res.send("Hello createCart");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const listCart = async (req, res) => {
  try {
    res.send("Hello listCart");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const deleteCart = async (req, res) => {
  try {
    res.send("Hello deleteCart");
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
