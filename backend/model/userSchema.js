const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const userSchema = new Schema(
    {
        name:{
            type: String,
            required: [ true , 'user name is required'],
            minLength: [5, ' name mst be at lest 5 characters'],
            maxLength: [50, ' name must be at less than 50 characters'],
            trime: true
        },
        email:{
            type: String,
            required: [true , 'user email is required'],
            unique: true,
            lowercase: true,
            unique:[true , 'already registerd']
        },
        password:{
            type:String,
            select:false
        },
        followers: {
            type:String,
        }
        // forgetPasswordToken: {
        //     type:true
        // },
        // forgetPasswordExpiryDate:{
        //     type:Date
        // },
    },
    {
        timestamps:true
    }
);

userSchema.pre('save' , async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password , 10)
    return next();
});

userSchema.methods = {
    jwtToken(){
        return JWT.sign(
            {id : this._id , email: this.email},
            process.env.SECRET,
            { expiresIn: '24h'}
        );
    },

    // getForgetPasswordToken(){

    //     const forgetToken = crypto.randomByts(20).toString('hex');

    //     this.forgotPasswordToken = crypto
    //         .createHash('sha256')
    //         .update(forgetToken)
    //         .digest('hex');

    //     this.forgetPasswordExpiryDate = Date.now() + 20 * 60 * 1000;           
        
    //         return forgetToken;
    // }
}

const userModel = mongoose.model('user' , userSchema);
module.exports = userModel;