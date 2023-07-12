const express = require('express');
const createRouter = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContact } = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

// createRouter.use(validateToken);
createRouter.get('/contacts', validateToken, getContacts);
createRouter.post('/contact', validateToken, createContact);
createRouter.get('/contact/:id', validateToken, getContact);
createRouter.put('/contact/:id', validateToken, updateContact);
createRouter.delete('/contact/:id', validateToken, deleteContact)

module.exports = createRouter;