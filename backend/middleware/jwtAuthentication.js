const jwt = require("jsonwebtoken");
const privatekey = process.env.PRIVATE_KEY;

const jwtAuthentication = (req, res, next) => {
  console.log("jwtAuthentication called");
  //   console.log(req.headers)

  const userToken = req.headers.authorization.split(" ")[1];
  // console.log(userToken);
  let verified = jwt.verify(userToken, privatekey);
  //   console.log("token validity status : ", verified);
  if (verified) {
    console.log("token verified");
  } else {
    return res.status(401).send(error);
  }
  next();
};
module.exports = jwtAuthentication;
