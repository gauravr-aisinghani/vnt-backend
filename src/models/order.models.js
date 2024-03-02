import mongoose,{Schema} from "mongoose"


const orederItemSchema = new Schema({
    productId:{
        type: Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type: Number,
        required: true
    }
})

const orderSchema = new Schema({
    orderPrice:{
        type: Number,
        required: true
    },
    buyer:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    orderItems:{
        type:[orederItemSchema]
    },
    status:{
        type: String,
        enum: ["PENDING","SHIPPED","CANCELLED","DELIVERED"],
        default: "PENDING"
    },
    address:{
        type: Schema.Types.ObjectId,
        ref :"Address",
        required : true,
    }
},{timestamps: true})

export const Order = mongoose.model("Order",orderSchema)