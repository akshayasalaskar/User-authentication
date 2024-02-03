//this file is made just to give auth token to the user so that the auth token can be saved in browser as cookie and the user stays login
//if user has token then only the app will come here and check if token is proper or not

const jwt = require("jsonwebtoken");
module.exports = (req, res) => {
  //This assumes that the req.body object has a property named token.
  const { token } = req.body;

  if (token) {
    try {
      // token , secret key
      const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
      res.json({
        auth: true,
        data: decode, // in data user id, username, email is there
      });
      console.log("Try block executed successfully");
    } catch (error) {
      res.json({
        auth: false,
        data: error.message,
      });
    }
  } else {
    res.json({
      auth: false,
      data: "No Token Found in request",
    });
  }
};
