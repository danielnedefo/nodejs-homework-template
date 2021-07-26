const { contacts: service } = require('../../services')
const mongoose = require('mongoose')

const getOneContact = async (req, res, next) => {
    const { id } = req.params
    try {
        const validationContactId = mongoose.Types.ObjectId.isValid(id)
        if (!validationContactId) {
            return res.status(404).json({
                status: 'error',
                code: 400,
                message: 'Contact id must be a string',
            })
        }
        const contact = await service.getContactById(id)
        if (!contact) {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found contact id: ${id}`,
                data: 'Not found'
            })
        }
        res.json({
            status: 'success',
            code: 200,
            data: {
                contact
            }
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = getOneContact
