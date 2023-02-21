const Course = require("../courses/course");

exports.create = async (req, res) => {
  if (!req.body.name && !req.body.duration && !req.body.fees) {
    res.status(400).send({ message: "Content can not be empty!" });
  }
  const course = new Course({
    name: req.body.name,
    duration: req.body.duration,
    fees: req.body.fees,
  });
  try {
    const courseToSave = await course.save();
    res.status(200).json(courseToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.findAll = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skipIndex = (page - 1) * limit;
  try {
    const course = await Course.find()
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();
    res.json(course);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedcourse = req.body;
    const options = { new: true };

    const result = await Course.findByIdAndUpdate(id, updatedcourse, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findByIdAndDelete(id);
    res.send(`Document with ${course.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
