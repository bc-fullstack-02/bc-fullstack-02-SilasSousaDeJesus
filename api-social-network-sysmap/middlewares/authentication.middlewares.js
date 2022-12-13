const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const secret = process.env.ACCESS_TOKEN_SECRET;

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "no token provided" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).send({ erro: "token error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: " token malformatted" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: " token malformatted" });
    }

    // req.userId = decoded.id;

    return next();
  });
};
