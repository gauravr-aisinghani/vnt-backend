import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {User} from '../models/user.models.js'
import {Category} from '../models/category.models.js'
import {Product} from '../models/product.models.js'
// import {uploadeOnCloudinary} from '../utils/cloudinary.js'

const registerUser = asyncHandler( async (req,res) =>{
    const {fullName,userName,email,password} = req.body

    if(
        [fullName,userName,email,password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"All fileds are required")
    }

    const existedUser = await User.findOne({
        $or: [{ userName },{ email }]
    })

    if(existedUser){
        throw new ApiError(409,"User with mail or username already exists")
    }

    // const avatarLocalPath = req.files?.avatar[0]?.path
    // const coverImageLocalPath = req.files?.coverImage[0]?.path

    // if(!avatarLocalPath){
    //     throw new ApiError(400,"Avatar file is required")
    // }

    // const avatar = await uploadeOnCloudinary(avatarLocalPath)
    // const coverImage = await uploadeOnCloudinary(coverImageLocalPath)

    // if(!avatar){
    //     throw new ApiError(400,"Avatar is required")
    // }

    const user = await User.create({
        userName : userName.toLowerCase(),
        fullName,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" 
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered Successfully")
    )
})

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

const getProductInfo = asyncHandler (async (req,res) =>{
    const {productid} = req.body

    if(productid.trim() === ""){
        throw new ApiError(400,"Product ID is required")
    }

    const ProductInfo = await Product.findById(productid)

    if(!ProductInfo){throw new ApiError(500,"Something went wrong")}

    return res.status(201).json(
        new ApiResponse(200,ProductInfo,"Product information got successfully")
    )
})


const getRelatedProducts = asyncHandler (async (req,res) =>{
    const {categoryid} = req.body

    if(categoryid.trim() === ""){
        throw new ApiError(400,"Category ID is required")
    }

    const RelatedProducts = await Product.where("category").equals(categoryid)

    if(!RelatedProducts){ throw new ApiError(500,"Something went wrong")}

    return res.status(201).json(
        new ApiResponse(200,RelatedProducts,"Related Products got Successfully")
    )

})

export {
    registerUser,
    getAllShirts,
    getAllTshirts,
    getAllJeans,
    getAllJackets,
    getProductInfo,
    getRelatedProducts
}