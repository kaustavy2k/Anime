const users = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../utils/email");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};
exports.signup = async (req, res) => {
  try {
    if (await users.findOne({ email: req.body.email })) {
      return res.status(500).json({
        status: "failure",
        message: {
          errors: {
            email: {
              message: "email already registered",
            },
          },
        },
      });
    } else {
      const newuser = await users.create(req.body);
      newuser.password = undefined;
      const token = signToken(newuser._id);
      res.cookie("jwt", token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      });

      res.status(200).json({
        status: "success",
        token,
        data: {
          user: newuser,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};
exports.login = async (req, res) => {
  try {
    let correct;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json({
        status: "failure",
        message: "Please provide email and password",
      });
    }

    const user = await users.findOne({ email });
    if (user) {
      correct = await bcrypt.compare(password, user.password);
    }
    if (!user || !correct) {
      return res.status(500).json({
        status: "failure",
        message: "Incorrext email or password",
      });
    }

    const token = signToken(user._id);
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });

    user.password = undefined;
    res.status(200).json({
      status: "success",
      token,
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  let token = req.cookies.jwt;
  let decoded;
  if (!token) {
    return res.status(500).json({
      status: "failure",
      message: "you are not logged in. Please log in to continue",
    });
  }
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: err,
    });
  }
  const currentUser = await users.findById(decoded.id);
  if (!currentUser) {
    return res.status(500).json({
      status: "failure",
      message: "the user doesnt exist anymore",
    });
  }
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return res.status(500).json({
      status: "failure",
      message: "User recently changed password! Please log in again.",
    });
  }
  req.user = currentUser;
  next();
};
