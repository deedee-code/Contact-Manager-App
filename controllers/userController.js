const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')



const userInfo = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
})

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({message: "All fields are required"})
    }

    const newUser = await User.findOne({ email });
    if (newUser) {
        return res.status(400).json({message: "User already Exist!"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(200).json({ _id: user.id, email: user.email });
    } else {
        return res.status(400).json({message: "User data is not valid"})
    }
    
    res.json({message: "User Registered Successfully"});
})

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({message: "All fields are required"})
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({message: "User does not exist, register your account first!"})
    }
    
    const isPasswordCorrent = await bcrypt.compare(password, user.password)
    if (isPasswordCorrent) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30min"}
        );
        return res.status(200).json({ accessToken })
    } else {
        return res.status(400).json({message: "Invalid Password!"})
    }
})



module.exports = { userInfo, registerUser, userLogin };