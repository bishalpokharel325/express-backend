const mongoose=require('mongoose')
const uuidv1=require('uuidv1')
const crypto=require('crypto')
const userSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    username:{
        type:String,
        trim:true,
        required:"Username is requried",
        unique:"Username Exists"
    },
    hashed_password:{
        type:String,
        requried:"password is required",
        salt:String,
        role:{
            type:Number,
            default:0
        }

    },
    email:{
        type:String,
        trim:true,
        required:"Email is required",
        unique:"Email already exists"
    }
},{timestamps:true})
userSchema.virtual('password')
.set(
    function(password){
        this._password=password
        this.salt=uuidv1()
        this.hashed_password=this.passwordEncrypt(password)
    })
.get(
    function(){
        return this._password
    }
)
userSchema.methods={
    passwordEncrypt:function(password){
        if(!password){
            return ''
        }
        try{
            return crypto.createHmac('sha1',this.salt)
            .update(password)
            .digest('hex')
        }
        catch(error){
            return ''
        }
    }
}
exports.userModel=mongoose.model("user",userSchema)