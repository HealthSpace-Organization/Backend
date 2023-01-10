var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var OrganRequestSchema=new Schema({
    profile_id:{
        type:String,
        ref:'Patient' || 'Donor' || 'Organization' || 'Hospital',
        required:[true,'Profile id field is required!'],
        maxlength:100
    },
    organ_name:{
        type:String,
        required:[true,'Organ name field is required!'],
        maxlength:100
    },
    blood_group: {
        type: String,
        required:[true,'Blood group field is required!'],
        required: false
    },
    documents: {
        type: String,
        required:[true,'Documents field is required!'],
        required: false
    },
    created_date:{
        type:Date,
        default:Date.now
    }
});

const OrganRequest=mongoose.model('OrganRequest',OrganRequestSchema);
module.exports={OrganRequest};