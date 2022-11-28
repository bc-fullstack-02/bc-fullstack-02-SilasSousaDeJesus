const {Router} = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authentication.middlewares');
// const upload = require('../Middlewares/imageUploader');

const router = Router();
// const multipleUpload = upload.fields([{ name: 'coverpicture' }, { name: 'profilepicture'}]);

router.post('/signup', userController.createUser);
// router.use(authMiddleware)
router.get('/showAll', userController.showAllUsers);
router.get('/showOne/:id', userController.showUser);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;