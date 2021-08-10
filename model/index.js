const fs = require("fs/promises");
const { v4 } = require("uuid");
const Joi = require("joi");
const Contact = require("../schema");


const contactSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  phone: Joi.string().min(13).required(),
});

const listContacts = async (req, res, next) => {
  const {query} = req
  try {
    const contacts = await Contact.find(query)
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error)
  }
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getById = Contact.findById(id)
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
        result:getById
      },
    });
  } catch (error) {
    next(error)
  }  
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  try { 
    await Contact.findByIdAndDelete(id)
    res.status(204).json({
      status: "success",
      code: 204,
    });
  } catch (error) {
    next(error)
  }  
};

const addContact = async (req, res, next) => {
  const {body} = req
  try {
    const contact = await Contact.find(body)
    if(contact){
      throw new Error("Such contact already exist")
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: body,
      },
    });
    return Contact.create(body)
  } catch (error) {
    next(error)
  }
};

const updateContact = async (req, res, next) => {
  const {params:{id},body} = req
  try {
    const updatedContact = Contact.findByIdAndUpdate(id,body)
    res.json({
      status: "success",
      code: 200,
      body: {
        result: updatedContact,
      },
    });
  } catch (error) {
    next(error)
  }
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
