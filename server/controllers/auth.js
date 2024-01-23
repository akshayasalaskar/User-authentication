//this file is made just to give auth token to the user so that the auth token can be saved in browser as cookie and the user stays login
//if user has token then only the app will come here and check if token is proper or not

const jwt = require("jsonwebtoken");
module.exports = (req, res) => {
  const { token } = req.body;

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
      res.json({
        auth: true,
        data: decode,
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
