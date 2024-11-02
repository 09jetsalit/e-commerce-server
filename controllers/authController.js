import UserService from "../services/AuthService.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const messagee = await UserService.register(email, password);
    res.status(201).json(messagee);
  } catch (err) {
    // console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, refreshToken, payload } = await UserService.login(email, password);
    res.status(200)
      .json({ message: "Login successful", token: token, refreshtoken:refreshToken, user: payload });
  } catch (err) {
    // console.log(err);
    if (err === "Email or Password invalid") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Server Error" });
  }
};


export const token = async (req, res) => {
  
};

export const currentUser = async (req, res) => {
  try {
    res.send(`Hello currentUser In Controller`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const currentAdmin = async (req, res) => {
  try {
    res.send(`Hello currentAdmin In Controller`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
