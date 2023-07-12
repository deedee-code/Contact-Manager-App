const mongoose = require('mongoose');

const userSchema = mongoose.Schema ({
    username: {
        type: String,
        require: [true, "Enter username"],
    },
    email: {
        type: String,
        require: [true, "Enter contact Email Address"],
        unique: [true, "Email Address already taken!"]
    },
    password: {
        type: String,
        require: [true, "Enter user password"],
    },
},
{
    timestamps: true,
})


module.exports = mongoose.model("User", userSchema)