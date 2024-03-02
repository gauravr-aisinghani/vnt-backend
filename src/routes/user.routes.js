import { Router } from "express";
import {registerUser,getAllShirts,getAllTshirts,getAllJeans,getAllJackets,getProductInfo,getRelatedProducts} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post( upload.none(), registerUser)

router.route("/getallShirts").get(getAllShirts)

router.route("/getallTshirts").get(getAllTshirts)

router.route("/getallJeans").get(getAllJeans)

router.route("/getallJackets").get(getAllJackets)

router.route("/getproductinfo").post(upload.none(),getProductInfo)

router.route("/getrelatedproducts").post(upload.none(),getRelatedProducts)




export default router