const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel')

const getContacts = asyncHandler(async (req, res) => {
    const userContacts = await Contact.find({ userId: req.user.id})
    res.status(200).json(userContacts);
})

const createContact = asyncHandler(async (req, res) => {
    const { name, age, email, phone, sex, profession } = req.body;

    if (!name || !age || !email || !phone || !sex || !profession) {
        res.status(404).json({error: "All fields are required!"})
    }

    const userContact = await Contact.create({
        name,
        age,
        email,
        phone,
        sex,
        profession,
        userId: req.user.id
    })
    
    res.status(201).json({message: "Contact Saved", userContact});
})

const getContact = asyncHandler(async (req, res) => {
    const userContact = await Contact.findById(req.params.id);

    if (!userContact) {
        return res.status(404).json({message: "User Contact not found"});
    }

    res.status(200).json(userContact);
})

const updateContact = asyncHandler(async (req, res) => {
    const userContact = await Contact.findById(req.params.id);

    if (!userContact) {
        return res.status(404).json({message: "User Contact not found"});
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
    )

    res.status(200).json({message: "Updated Contact Saved Successfully", updatedContact});
})

const deleteContact = asyncHandler(async (req, res) => {
    const userContact = await Contact.findById(req.params.id);

    if (!userContact) {
        return res.status(404).json({message: "User Contact not found"});
    }

    await Contact.deleteOne({ _id: req.params.id });

    res.status(200).json({message: "User Contact Deleted Successfully"});
})



module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };
