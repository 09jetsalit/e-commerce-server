export const categoryPost = async (req, res) => {
    try {
        res.send(`Hello categoryPost In Controller`);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}
export const categoryGet = async (req, res) => {
    try {
        res.send(`Hello categoryGet In Controller`);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}
export const categoryDelete = async (req, res) => {
    try {
        res.send(`Hello categoryDelete In Controller`);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}