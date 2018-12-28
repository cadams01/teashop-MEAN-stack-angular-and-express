var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var TeaSchema = new mongoose.Schema({
    name: String,
    kind: String,
    unit: String,
    quantity: Number,
    price: Number
})

TeaSchema.plugin(mongoosePaginate)
const Tea = mongoose.model('Tea', TeaSchema)

module.exports = Tea;