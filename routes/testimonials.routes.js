const express = require('express');
const router = express.Router();
// const {v4 : uuidv4} = require('uuid');

const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/random', TestimonialController.getRandom);
router.get('/testimonials/:id', TestimonialController.getById);
router.post('/testimonials', TestimonialController.addNew);
router.put('/testimonials/:id', TestimonialController.changeById);
router.delete('/testimonials/:id', TestimonialController.removeById);

module.exports = router;