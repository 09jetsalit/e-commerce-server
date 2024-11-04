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
      .json({ message: "Login successful", token: token, refreshToken:refreshToken, user: payload });
  } catch (err) {
    const errMsg = err.message;
    // console.log(errMsg);
    if (err.message === "Email or Password invalid") {
      return res.status(400).json({ message: errMsg });
    }
    res.status(500).json({ message: "Server Error" });
  }
};


export const token = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const result = await UserService.refreshToken(refreshToken)
    // console.log("result:" , result);
    res.json({result})
    
  } catch (err) {
    res.status(403).json({ message: err.message})
  }
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
