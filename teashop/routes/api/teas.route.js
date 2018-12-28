var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var TeaController = require('../../controllers/tea.controller.js');


// Map each API to the Controller FUnctions

router.get('/', TeaController.getTeas)

router.post('/', TeaController.createTea)

router.put('/', TeaController.updateTea)

router.delete('/:id',TeaController.removeTea)


// Export the Router

module.exports = router;