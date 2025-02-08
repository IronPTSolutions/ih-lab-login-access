require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("./middlewares/cors.middleware");
const cookieParser = require("cookie-parser");

/* DB init */
require("./config/db.config");

const app = express();

/* Middlewares */
app.use(express.json());
app.use(cookieParser()); 
app.use(logger("dev"));
app.use(cors);

/* API Routes Configuration */
const routes = require("./config/routes.config");
const corsMiddleware = require("./middlewares/cors.middleware");
app.use("/api/v1/", routes);

const port = Number(process.env.PORT || 3000);

app.listen(port, () => console.info(`Application running at port ${port}`));
