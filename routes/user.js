const express = require("express")
const router=express.Router()
const userController = require("../controllers/user")


router.use("/hizmetler/:hizmetid", userController.hizmetler_by_details)

router.use("/iletisim", userController.iletisim_by)

router.use("/referanslar", userController.referanslar_by)

router.use("/hizmetler", userController.hizmetler_by)

router.use("/", userController.anasayfa_by)

module.exports=router