export const register = async (req, res) => {
    try {
        const { email, password} = req.body;
        if(!email | !password){
            return res.status(400).json({ message: `email or password is required`})
        }
        console.log(email, password);
        
        res.send(`Hello Register In Controller`)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Server Error"})
    }
}

export const login = async (req, res) => {
    try {
        res.send(`Hello login In Controller`)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Server Error"})
    }
}

export const currentUser = async (req, res) => {
    try {
        res.send(`Hello currentUser In Controller`)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Server Error"})
    }
}

export const currentAdmin = async (req, res) => {
    try {
        res.send(`Hello currentAdmin In Controller`)
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Server Error"})
    }
}

