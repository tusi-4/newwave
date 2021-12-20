const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(!seat) res.status(404).json({ message: 'Not found...' });
    else res.json(seat);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.addNew = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const theSeat = await Seat.findOne({ $and: [{ seat: seat }, { day: day }]});
    if(!theSeat) {
      const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
      await newSeat.save();
      res.json({ message: 'OK' });
    }
    else res.json(res.status(412).send('The slot is already taken...'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.changeById = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const theSeat = await Seat.findById(req.params.id);
    if(theSeat) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email }});
      res.json(await Seat.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports. removeById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(seat);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}