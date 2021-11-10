const ratings = require("../models/ratings");
const { use } = require("../routes/routes");
exports.getRating = async (req, res) => {
  try {
    const rating = await ratings.find({
      email: req.user.email,
      id: req.params.id,
    });
    if (rating.length !== 0) {
      res.status(200).json({
        message: "your rating",
        rating,
      });
    } else {
      res.status(200).json({
        message: "your rating",
        rating: [],
        msg: "No ratings Available",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};

exports.getAllRatings = async (req, res) => {
  try {
    const rating = await ratings.find({ id: req.params.id });
    console.log(rating);
    if (rating.length !== 0) {
      res.status(200).json({
        message: "All ratings",
        rating,
      });
    } else {
      res.status(200).json({
        message: "All ratings",
        rating: [],
        msg: "No ratings Available",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};

exports.updateRating = async (req, res) => {
  try {
    const rating = await ratings.find({
      email: req.user.email,
      id: req.params.id,
    });
    let rate;
    //console.log("rating", rating);
    if (rating.length) {
      console.log("if", req.body.Avgrating);
      rate = await ratings.updateOne(
        { email: req.user.email },
        {
          $set: {
            rating: req.body.rating,
            Avgrating: req.body.Avgrating,
            description: req.body.description,
          },
        }
      );
    } else {
      console.log("else", req.body.Avgrating);

      rate = await ratings.create({
        email: req.user.email,
        id: req.params.id,
        description: req.body.description,
        rating: req.body.rating,
        Avgrating: req.body.Avgrating,
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        user: rate,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};

exports.mapAllRatings = async (req, res) => {
  try {
    ids = JSON.parse(req.params.ids);
    console.log(ids.length);
    let obj = {};
    for (let i = 0; i < ids.length; i++) {
      //console.log(ids[i]);
      const rating = await ratings.find({ id: ids[i] });
      if (rating.length) {
        //console.log(rating[0].Avgrating);
        if (rating[0].Avgrating) {
          obj[ids[i]] = rating[0].Avgrating;
        }
      }
    }
    console.log("obj", obj);
    res.status(200).json({
      message: "All ratings",
      rating: obj,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};
