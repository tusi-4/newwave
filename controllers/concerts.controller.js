const  Concert = require('../models/concert.model');
const Workshop = require('../models/workshop.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find().populate('workshops'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getById = async (req, res) => {
  try{
    const concert = await Concert.findById(req.params.id).populate('workshops');
    if(!concert) res.status(404).json({ message: 'Not found...'});
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.addNew = async (req, res) => {
  try {
    const { performer, genre, price, day, image, workshops } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image, workshops: workshops });
    await newConcert.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.changeById = async (req, res) => {
  const { performer, genre, price, day, image, workshops } = req.body;
  try {
    const concert = await Concert.findById(req.params.id);
    if(concert) {
      await Concert.updateOne({ _id: req.params.id}, { $set: { performer: performer, genre: genre, price: price, day: day, image: image, workshops: workshops }});
      res.json(await Concert.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.removeById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if(concert) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(concert);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}