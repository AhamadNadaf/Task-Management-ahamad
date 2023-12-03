const LoginModel = require('../model/login-modules')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { email, password } = req.body
    LoginModel.findOne({ email: email })
        .then(async (user) => {
            if (user) {
                const hashedPassword = await bcrypt.compare(password, user.password)
                if (hashedPassword) {
                    const token = jwt.sign({ email: user.email }, "secret-is-now-no-secret", { expiresIn: "1d" })
                    res.cookie("token", token)
                    const result = ({ user: user, Success: "Success" })
                    return res.send(result)

                } else {
                    return res.json("The password is wrong")

                }
            } else {
                return res.json("No user found")
            }

        })
}
const getUser = async (req, res) => {
    LoginModel.find({ type: 'Team Member' })
        .then(data => res.json(data))
        .catch(err => res.json(err));
}

const deleteUser = async (req, res) => {
    try {
        const deletedMember = await LoginModel.findByIdAndDelete(req.params.id);

        if (!deletedMember) {
            return res.status(404).json({ message: "Member not found" });
        }

        res.json({ message: "Member deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = { login, getUser, deleteUser }