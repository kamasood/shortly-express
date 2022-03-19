// var controller = require(./controllers)
const router = require('express').router();


router.get('/');
// router.post('/');

router.get('/create');

router.get('/links');
router.post('/links');

router.get('/signup');
router.post('/signup');

router.get('/login');
router.post('/login');

router.get('/:code');

//others
