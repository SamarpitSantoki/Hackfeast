const User = require("../../models/userSchema");

exports.login = async (req, res) => {
  const user = req.body;

  const { email, password } = user;
  const userData = await User.findOne({ email });

  if (!userData) {
    return res.status(400).json({
      message: "Email or password is incorrect",
    });
  }

  const isPasswordValid =
    parseInt(password) === userData.password ? true : false;
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Email or password is incorrect",
    });
  }
  const resUserData = {
    id: userData.id,
    email: userData.email,
    fname: userData.fname,
    lname: userData.lname,
    role: userData.role,
  };
  res.status(200).json({
    message: "Login success",
    user: resUserData,
  });
};

exports.register = async (req, res) => {
  const user = req.body;

  console.log(req.body);
  console.log(req.data);
  console.log(req.payload);
  const { fname, lname, email, password } = user;
  const userData = await User.findOne({ email });
  let active_ids = (await User.countDocuments({})) + 1;
  if (userData) {
    return res.status(401).json({
      message: "User already exists",
    });
  } else {
    const newUser = await new User({
      id: active_ids++,
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      admin: false,
    });
    await newUser.save();
    const resUserData = {
      id: newUser.id,
      fname: newUser.fname,
      lname: newUser.lname,
      email: newUser.email,
      role: newUser.role,
    };
    return res.status(200).json({
      message: "User created successfully",
      user: resUserData,
    });
  }
};
