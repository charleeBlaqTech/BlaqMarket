const express               =require('express')
const router                =express.Router()
const checkUser             =require('../middlewares/checkUser')
const homeRoutesController  =require('../controllers/homeControllers')




router.route('/login').get(homeRoutesController.loginGet).post(homeRoutesController.loginPost)
router.route('/logout').get(homeRoutesController.logoutGet)
router.route('/register').get(homeRoutesController.registerGet).post(homeRoutesController.registerPost)
router.get('/home',checkUser,homeRoutesController.homeGet)
router.get('/about',checkUser,homeRoutesController.aboutGet)
router.get('/contact',checkUser,homeRoutesController.contactGet)
router.get('/blog',checkUser,homeRoutesController.blogGet)
router.get('/cart',checkUser,homeRoutesController.cartGet)
router.post('/cart/:id',checkUser,homeRoutesController.cartPost)
router.get('/cart/:id/delete',checkUser,homeRoutesController.cartDelete)

module.exports=router