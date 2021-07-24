const fs = require("fs/promises");
const { v4 } = require("uuid");
const contacts = require("./contacts.json");
const Joi = require('joi')

const contactSchema = Joi.object({
  email:Joi.string().email().required(),
  name:Joi.string().required(),
  phone:Joi.string().min(13).required()
})

const listContacts = async (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = contacts.find((elem) => elem.id === id);
  if (!result | error) {
    return res.status(404).json({
      status: "Error",
      code: 404,
      message: "Product not found",
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const removeContact = (req, res, next) => {
  const { id } = req.params;
  const idx = contacts.findIndex((elem) => elem.id === id);
  if (idx === -1) {
    return res.status(404).json({
      status: "Error",
      code: 404,
      message: "Product not found",
    });
  }
  contacts.splice(idx, 1);
  res.status(204).json({
    status: "success",
    code: 204,
  });
};

const addContact = (req, res, next) => {
  const newContact = req.body;
  const {error} = contactSchema(newContact)
  if (error) {
    return res.status(400).json({
      status: "Error",
      code: 400,
      message: "Missing email or phone or name",
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: newContact,
    },
  });
};

const updateContact = (req, res, next) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  const {error} = contactSchema(updatedProduct)
  const idx = contacts.findIndex((elem) => elem.id === id);
  if (idx === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Product not found",
    });
  }
  if(error){
    return res.status(400).json({
      status:"error",
      code:400,
      message:"Missing name or email or phone",
    })
  }
  contacts[idx] = updateContact
  res.json({
    status:"success",
    code:200,
    body:{
      result:updatedProduct
    }
  })
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
