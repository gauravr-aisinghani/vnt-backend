import mongoose,{Schema} from "mongoose"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

const sellerSchema = new Schema({
    fullName:{
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    userName:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: [true,'Password is required']
    },
    refreshToken:{
        type: String
    }
},{timestamps: true})

sellerSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password,10)
    next()
})

sellerSchema.methods.generateAccessToken = function(){
    return Jwt.sign(
        {
            _id : this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

sellerSchema.methods.generateRefreshToken = function(){
    return Jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Seller = mongoose.model("Seller",sellerSchema)