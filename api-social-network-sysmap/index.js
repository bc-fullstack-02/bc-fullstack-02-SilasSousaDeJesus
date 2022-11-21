const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");

const LOCALPORT = "8000";
require("dotenv/config");
require("./database");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const routesUser = require("./routes/user.route");
const routesPost = require("./routes/post.route");
const routesComment = require("./routes/comment.route");

app.use("/user", routesUser);
app.use("/post", routesPost);
app.use("/comment", routesComment);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || LOCALPORT, () => {
  console.log(`Server running on port ${LOCALPORT}`);
});
