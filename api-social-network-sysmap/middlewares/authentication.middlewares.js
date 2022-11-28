const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const secret = process.env.SECRET;

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { error: "no token provided" };
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return { erro: "token error" };
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return { error: " token malformatted" };
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return { error: "token invalid" };
    }

    req.userId = decoded.id;

    return next();
  });
};
