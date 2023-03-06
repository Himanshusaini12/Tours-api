const User = require("./../modals/userModel");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    const token = JWT.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
        token_d: token,
      },
    });
  } catch (err) {
    res.json({
      status: "error",
      data: err,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // if email password exist
  if (!email || !password)
    return next(
      res.send({
        error: "enter emaill and password",
      })
    );

  const user = await User.findOne({ email });
  console.log(user);
  const f = await bcrypt.compare(password, user.password);
  if (!f || !user) {
    return res.send({
      error: "wrong password or email",
    });
  }

  const token = JWT.sign({ id: User._id }, process.env.JWT_SECRET);
  res.send({
    success: "login successful",
    user: { user },
    token: token,
  });
};

exports.protect = (req, res, next) => {
  console.log("procted");
  let Token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    Token = req.headers.authorization.split(" ")[1];
    console.log(Token);
    next();
  } else {
    console.log("unauthorised");
    return res.send({
      error: "unauthorised",
    });
  }
};
