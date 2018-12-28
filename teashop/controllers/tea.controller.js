// We need to be able to access the Service 
//that we just created so let's pull that in

var TeaService = require('../services/tea.service.js');


exports.getTeas = async function(req, res, next){

    // We're going to use ternary to check 
    //the existence of the query parameters
        
        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10; 
    
        try{
        
            var teas = await TeaService.getTeas({}, page, limit)
            
    // Return the todos list with the appropriate 
    //HTTP Status Code and Message.
            
            return res.status(200).json({status: 200, data: teas, message: "Succesfully Teas Rec'd"});
            
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
            return res.status(400).json({status: 400, message: e.message});
            
        }
    }

    exports.createTea = async function(req, res, next){

        // Note: Req.Body contains the form submit values.
    
        var tea = {
            name: req.body.name,
            kind: req.body.kind,
            unit: req.body.unit,
            quantity: req.body.quantity,
            price: req.body.price
        }
    
        try{
            
    // Calling the Service function 
    //with the new object from the Request Body
        
            var createdTea = await TeaService.createTea(tea)
            return res.status(201).json({status: 201, data: createdTea, message: "Succesfully Created Tea"})
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
    return res.status(400).json({status: 400, message: "Tea Creation was Unsuccesfull, I am sorry :( "})
        }
    }
    exports.updateTea = async function(req, res, next){

        // Id is necessary for the update
    
        if(!req.body._id){
            return res.status(400).json({status: 400., message: "Id must be present"})
        }
    
        var id = req.body._id;
    
        console.log(req.body)
    
        var tea = {
            id,
            name: req.body.name ? req.body.name : null,
            kind: req.body.kind ? req.body.kind : null,
            unit: req.body.unit ? req.body.unit : null,
            quantity: req.body.quantity ? req.body.quantity : null,
            price: req.body.price ? req.body.price : null
        }
    
        try{
            var updatedTea= await TeaService.updateTea(tea)
            return res.status(200).json({status: 200, data: updatedTea, message: "Succesfully Updated Tea"})
        }catch(e){
            return res.status(400).json({status: 400., message: e.message})
        }
    }  
    exports.removeTea = async function(req, res, next){

        var id = req.params.id;
    
        try{
            var deleted = await TeaService.deleteTea(id)
            return res.status(204).json({status:204, message: "Succesfully Deleted Tea"})
        }catch(e){
            return res.status(400).json({status: 400, message: e.message})
        }
    
    }
    