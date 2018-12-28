// Access our newly created Mongoose Model
var Tea = require('../models/tea.model.js')

// Saving the context of this module inside the _the variable
_this = this

// Let's use an Async function to get the To Do List
exports.getTeas = async function(query, page, limit){

    // We also want to set up options for the mongoose paginate

    var options = {
        page,
        limit
    }

    //Let's create a Try and Catch function 
//that way we have some error handling set. 
//Waiting for the promise
    
try {
    var teas = await Tea.paginate(query, options)
    
//Once the Mongoose promise is returned 
//we're going to go ahead and return 
//the To Do List it has produced 

    return teas;

} catch (e) {

//If the try didn't work we're going to 
//go ahead and let the users know what kind of 
//Error we have

    throw Error('Many apologies! Our teas are refusing to paginate!' )
}
}
exports.createTea = async function(tea){
    
    // Creating a new Mongoose Object by using the new keyword
    
        var newTea = new Tea({
            name: tea.name,
            kind: tea.kind,
            unit: tea.unit, 
            quantity: tea.quantity,
            price: tea.price
            
        })
    
        try{
    
            // Let's go ahead and save the Todo 
    
            var savedTea = await newTea.save()
    
            return savedTea;
        }catch(e){
          
            //if we can't create a Todo we want to throw an error 
    
            throw Error("Error while Creating Tea")
        }
    }

    exports.updateTea = async function(tea){
        var id = tea.id
    
        try{
            //Find the old Todo Object by the Id
        
            var oldTea = await Tea.findById(id);
        }catch(e){
            throw Error("Error occured while Finding the Tea")
        }
    
        // If no old Todo Object exists return false
    
        if(!oldTea){
            return false;
        }
    
        console.log(oldTea)
    
        //Edit the Todo Object
        //oldTea.name = tea.name ? tea.name : oldTea.name;
        oldTea.name = tea.name 
        oldTea.kind = tea.kind
        oldTea.unit = tea.unit
        oldTea.quantity = tea.quantity
        oldTea.price = tea.price
    
    
        console.log(oldTea)
    
        try{
            var savedTea = await oldTea.save()
            return savedTea;
        }catch(e){
            throw Error("An Error occured while updating the Tea");
        }
    }

    exports.deleteTea = async function(id){
    
        try{
            var deleted = await Tea.deleteOne({_id: id})
            if(deleted.n === 0){
                throw Error("Tea Could not be deleted")
            }
            return deleted
        }catch(e){
            throw Error("Error Occured while Deleting the Tea")
        }
    }

