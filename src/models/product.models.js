import mongoose,{Schema} from "mongoose"

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    productImage:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
        default: 0
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required:true
    },

},{timestamps:true})

export const Product = mongoose.model("Product",productSchema)