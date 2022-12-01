const express               =require('express')
const router                =express.Router()
const checkUser             =require('../middlewares/checkUser')
const authorization         =require('../middlewares/authorization')
const adminRoutesController =require('../controllers/adminControllers')




router.get('/get',checkUser,authorization,adminRoutesController.adminGet)
router.get('/products',checkUser,authorization,adminRoutesController.productsGet)
router.get('/:id/update',checkUser,authorization,adminRoutesController.updateGet)




module.exports=router