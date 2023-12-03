const LoginModel = require('../model/login-modules')
const bcrypt = require('bcrypt')

const registrations = async (req, res) => {
    const { name, email, password, type } = req.body;
    let existingUser;
    try {
        existingUser = await LoginModel.findOne({ email });
    } catch (err) {
        res.status(400).send(err)
    }

    if (existingUser) {
        res.status(401).json({ message: "User Already Exists! Login Insted" })
    } else {
        if (email) {
            const hashPasswoord = await bcrypt.hash(password, 10)
            LoginModel.create({ name, email, password: hashPasswoord, type })
                .then(data => res.json(data))
                .catch(err => res.json(err))
        }
        else{
            res.json("Invalid Input")
        }

    }


}

module.exports = registrations
