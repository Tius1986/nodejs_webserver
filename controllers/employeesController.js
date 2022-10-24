const Employee = require('../models/Employee')

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find()
    if(!employees) return res.status(204).json({ 
        'message': 'No employees found'
    })
}

const createNewEmployee = async (req, res) => {
    if(!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ 
            'message': 'Firstname and lastname are are required' 
        })
    }
    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })
        res.status(201).json(result)
    } catch (err) {
        console.error(err)
    }
}

const updateEmployee = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({ 
        'message': 'Id param is required' 
    })
    const employee = await Employee.findOne({ _id: req.body.id }).exec()
    if(!employee) {
        return res.status(204).json({ "message": `No employee with id ${req.body.id}`})
    }
    try {   
        const employeeUpdated = await Employee.updateOne({ 
            _id: { 
                $set: { 
                    firstname: req.body.firstname,
                    lastname: req.body.lastname
                }
            }
        })
        res.json(employeeUpdated)

    } catch (err) {
        console.error(err)
    }
}

const deleteEmployee = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({
        'message': 'Employee id required'
    })
    const employee = await Employee.findOne({ _id: req.body.id }).exec()
    if(!employee) {
        return res.status(204).json({ 
            'message': `No employee matches id ${req.body.id}`
        })
    }
    const result = await Employee.deleteOne({ _id: req.body.id })
    res.json(result)
}

const getEmployee = async (req, res) => {
    const employee = await Employee.findOne({ _id: req.params.id })
    if(!employee) return res.status(204).json({ 
        'message': `No employee matches id ${req.params.id}`
    })
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}