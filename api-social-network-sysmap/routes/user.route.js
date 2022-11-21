const {Router} = require('express');
const userController = require('../controllers/user.controller');
// const upload = require('../Middlewares/imageUploader');

const router = Router();
// const multipleUpload = upload.fields([{ name: 'coverpicture' }, { name: 'profilepicture'}]);

router.post('/signup', userController.createUser);
router.get('/showAll', userController.showAllUsers);
router.get('/:id', userController.showUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;