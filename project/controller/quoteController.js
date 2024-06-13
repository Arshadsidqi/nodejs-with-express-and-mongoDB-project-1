const QUOTE_SCHEMA = require("../models/quotes");

exports.createQuot = async (req, res) => {
  const { title, body, date } = req.body;
  try {
    const newQuote = new QUOTE_SCHEMA({
      title,
      body,
      date,
      userID: req.user.id,
    });
    await newQuote.save();
    return res.status(201).json({ message: "quote added successfully", newQuote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.fetchall = async (req, res) => {
  try {
    let quote = await QUOTE_SCHEMA.find({ userID: req.user.id });

    if (!quote) {
      res.status(400).json({ message: "quote not find" });
    }
    return res
      .status(201)
      .json({ message: "quotes fetched successfully", quote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOne = async (req, res) => {
  try {
    let quote = await QUOTE_SCHEMA.updateOne(
      { _id: req.param.id, userID: req.user.id },
      req.body,
      { new: true }
    );
    if (!quote) {
      res.status(400).json({ message: "quote not find" });
    }
    return res.status(201).json({ message: "quotes update successfully", quote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteOne = async (req, res) => {
    try {
          
      let quote = await QUOTE_SCHEMA.findOneAndDelete(
        { _id: req.params.id, userID: req.user.id });
      if (!quote) {
        res.status(400).json({ message: "quote not find" });
      }
      return res.status(201).json({ message: "quotes delete successfully",quote});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
