import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import {
    registerSeller,
    getAllShirts,
    getAllTshirts,
    getAllJeans,
    getAllJackets
} from "../controllers/seller.controller.js"
import {addProduct} from "../controllers/seller.controller.js"
import {addCategory} from "../controllers/seller.controller.js"


const router = Router()

router.route('/register').post(
    upload.none(),
    registerSeller
)

router.route('/addcategory').post(
    upload.none(),
    addCategory
)

router.route('/addproduct').post(
    upload.fields([
        {
            name: "productImage",
            maxCount: 5
        }
    ]),
    addProduct
)

router.route("/getallShirts").get(getAllShirts)

router.route("/getallTshirts").get(getAllTshirts)

router.route("/getallJeans").get(getAllJeans)

router.route("/getallJackets").get(getAllJackets)

export default router