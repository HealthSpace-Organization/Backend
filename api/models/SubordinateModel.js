var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var SubordinateSchema=new Schema({
    name:{
        type:String,
        required:[true,'Name field is required!'],
        maxlength:100
    },
    address:{
        type:String,
        required:[true,'Adress field is required!'],
        maxlength:100
    },
    nic: {
        type: String,
        required:[true,'NIC field is required!'],
        required: false
    },
    contact_number:{
        type:String,
        required:[true,'Contact number field is required!'],
        maxlength:100
    },
    email:{
        type:String,
        required:[true,'Email field is required!'],
        maxlength:100
    },
    donor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Donor',
        required:[true,'Donor field is required!']
    },
    created_date:{
        type:Date,
        default:Date.now
    }
});

const Subordinate=mongoose.model('Subordinate',SubordinateSchema);
module.exports={Subordinate};