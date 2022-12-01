const express               =require('express')
const router                =express.Router();
const checkUser             =require('../middlewares/checkUser')
const authorization         =require('../middlewares/authorization')
const productController     =require('../controllers/productsControllers')



router.get('/get',checkUser,productController.productsGet)
router.route('/create').post(checkUser,authorization,productController.productPost).get(checkUser,authorization,productController.productGet)

router.get('/:id/show',checkUser,productController.productShowGet)
router
router.route('/:id/update').get(checkUser,authorization,productController.productUpdateGet).put(checkUser,authorization,productController.productUpdatePut)
router.delete('/:id/delete',checkUser,authorization,productController.productDelete)


module.exports=router