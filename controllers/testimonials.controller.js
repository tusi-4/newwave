const Testimonial = require('../models/testimonial.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testim = await Testimonial.findOne().skip(rand);
    if(!testim) res.status(404).json({ message: 'Not found...' });
    else res.json(testim);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getById = async (req, res) => {
  try {
    const testim = await Testimonial.findById(req.params.id);
    if(!testim) res.status(404).json({ message: 'Not found...'});
    else res.json(testim);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.addNew = async (req, res) => {
  try {
    const { author, text } = req.body;
    const clean = sanitize({ author, text })
    const newTestimonial = new Testimonial({ author: clean, text: clean });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.changeById = async (req, res) => {
  const { author, text } = req.body;
  try {
    const testim = await Testimonial.findById(req.params.id);
    if(testim) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { author: author, text: text }});
      res.json(await Testimonial.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.removeById = async (req, res) => {
  try {
    const testim = await Testimonial.findById(req.params.id);
    if(testim) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' }); // lub: res.json(await Testimonial.find());
    }
    else res.status(404).json({ message: 'Not found...'});
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}