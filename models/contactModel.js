const mongoose = require('mongoose');

const contactSchema = mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        require: [true, "Enter contact Name"],
    },
    age: {
        type: Number,
        require: [true, "Enter contact Email Address"],
    },
    email: {
        type: String,
        require: [true, "Enter contact Email Address"],
    },
    phone: {
        type: String,
        require: [true, "Enter contact Phone Number"],
    },
    sex: {
        type: String,
        require: [true, "Enter contact Gender"],
    },
    profession: {
        type: String,
        require: [true, "Enter contact Profession"],
    },
},
{
    timestamps: true,
})


module.exports = mongoose.model("Contact", contactSchema)