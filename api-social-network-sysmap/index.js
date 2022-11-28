const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet")
const app = express();
const authMiddleware = require('./middlewares/authentication.middlewares');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const LOCALPORT = "8000";
require("dotenv/config");
require("./database");
app.use(helmet())
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routesUser = require("./routes/user.routes");
const routesProfile = require("./routes/profile.routes");
const routesPost = require("./routes/post.routes");
const routesComment = require("./routes/comment.routes");
const routesAuthentication = require("./routes/authentication.routes");

app.use("/authentication", routesAuthentication);
app.use("/user", routesUser);
// app.use(authMiddleware)
app.use("/profile", routesProfile);
app.use("/post", routesPost);
app.use("/comment", routesComment);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || LOCALPORT, () => {
  console.log(`Server running on port ${LOCALPORT}`);
});
