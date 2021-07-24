const express = require('express')
const router = express.Router()
const controlls = require('./index')

router.get('/', controlls.listContacts)

router.get('/:contactId', controlls.getContactById)

router.post('/', controlls.addContact)

router.delete('/:contactId', controlls.removeContact)

router.patch('/:contactId', controlls.updateContact)

module.exports = router
