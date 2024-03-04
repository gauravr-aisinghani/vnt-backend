import mongoose,{Schema} from "mongoose"

const addressSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    address:{
        type: String,
        required : true
    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true
    },
    pincode:{
        type: Number,
        required: true,
    }
},{timestamps: true})

export const Address = mongoose.model("Address",addressSchema)