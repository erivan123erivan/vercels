const jwt = require("jsonwebtoken");

exports.generateJwtToken = ({ _id, email }) => {
    return jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
};