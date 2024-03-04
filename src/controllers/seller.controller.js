import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {Seller} from '../models/seller.models.js'
import {Product} from '../models/product.models.js'
import {Category} from '../models/category.models.js'
import {uploadeOnCloudinary} from '../utils/cloudinary.js'


const registerSeller = asyncHandler(async (req,res) =>{
    const {fullName,userName,email,password} = req.body

    if(
        [fullName,userName,email,password].some((field) => field?.trim() === "" )
    ){
        throw new ApiError(400,"All fileds are required")
    }

    const existedSeller = await Seller.findOne({
        $or: [{userName},{email}]
    })

    if(existedSeller){
        throw new ApiError(409,"Seller with mail or username already exists")
    }

    const seller = await Seller.create({
        userName: userName.toLowerCase(),
        fullName,
        email,
        password
    })

    const createdSeller = await Seller.findById(seller._id).select(
        "-password -refreshToken"
    )

    if(!createdSeller){
        throw new ApiError(500,"Something went wrong while registering Seller")
    }

    return res.status(201).json(
        new ApiResponse(200,createdSeller,"Seller Registered Successfully") 
    )
})

const addCategory = asyncHandler( async (req,res) =>{
    const {name} =  req.body

    if(name.trim() === ""){
        throw new ApiError(400,"name is required")
    }

    const existedCategory = await Category.findOne({name})

    if(existedCategory){
        throw new ApiError(409,"category alrady already exists")
    }

    const category = await Category.create({ name })

    return res.status(201).json(
        new ApiResponse(200,category,"category added Successfully")
    )

})

const addProduct = asyncHandler( async (req,res) =>{
    const {name,price,description,status,category} =  req.body
    

    if(
        [name,price,description,status,category].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"All fileds are required")
    }

    const existedProduct = await Product.findOne({name})

    if(existedProduct){
        throw new ApiError(409,"Product alrady already exists")
    }

    const foundCategory = await Category.findOne({name : category})

    if (!foundCategory) {
        return res.status(400).json({ error: "Invalid category" });
      }

    const productImageLocalPath = req.files?.productImage[0]?.path

    if(!productImageLocalPath){
        throw new ApiError(400,"Product Image is required")
    }

    const productImage = await uploadeOnCloudinary(productImageLocalPath)
 

    if(!productImage){
        throw new ApiError(400,"Product Image is required")
    }

    const product = await Product.create({
        name,
        productImage: productImage.url,
        price,
        description,
        status,
        category: foundCategory._id
    })

    return res.status(201).json(
        new ApiResponse(200,product,"Product added Successfully")
    )
} )

const getAllShirts = asyncHandler (async (req,res) => {

    const ShirtCategoryId = await Category.find({name:"shirt"})

    const AllShirts = await Product.where("category").equals(ShirtCategoryId)

    if(!AllShirts){throw new ApiError(500,"Something went wrong")}

    return res.status(201).json(
        new ApiResponse(200,AllShirts,"Shirts got successfully")
    )

})

const getAllTshirts = asyncHandler (async (req,res) => {

    const TshirtCategoryId = await Category.find({name:"tshirt"})

    const AllTshirts = await Product.where("category").equals(TshirtCategoryId)

    if(!AllTshirts){throw new ApiError(500,"Something went wrong")}

    return res.status(201).json(
        new ApiResponse(200, AllTshirts ,"Tshirts got successfully")
    )
})

const getAllJeans = asyncHandler (async (req,res) => {

    const JeansCategoryId = await Category.find({name:"jeans"})
    
    const AllJeans = await Product.where("category").equals(JeansCategoryId)

    if(!AllJeans){throw new ApiError(500,"Something went wrong")}

    return res.status(201).json(
        new ApiResponse(200, AllJeans ,"Jeanses got successfully")
    )
})

const getAllJackets = asyncHandler (async (req,res) => {

    const JacketCategoryId = await Category.find({name:"jacket"})
    
    const AllJackets = await Product.where("category").equals(JacketCategoryId)

    if(!AllJackets){throw new ApiError(500,"Something went wrong")}

    return res.status(201).json(
        new ApiResponse(200, AllJackets ,"Jackets got successfully")
    )

})



export {
    registerSeller,
    addProduct,
    addCategory,
    getAllShirts,
    getAllTshirts,
    getAllJeans,
    getAllJackets
}