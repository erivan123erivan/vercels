const router = require('express').Router();
const { 
    profile,
    register,
    logedIn,
    getUsers,
    updateProfile,
    forgetPasswrd,
    updatePassword
} = require('../controller/authController');
const multer = require('../utils/multer');
const { isAuthenticate } = require('../middlewire/auth');

router.get('/profile', profile);
router.post('/register', multer.single("image"), register);
router.post('/login', logedIn);
router.get('/users', getUsers);
router.put('/update-profile', isAuthenticate, updateProfile);
router.post('/forget-password', forgetPasswrd);
router.put('/update-password',isAuthenticate, updatePassword);

module.exports = router;