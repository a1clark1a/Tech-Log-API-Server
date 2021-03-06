require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const { NODE_ENV } = require("./config");
const erroHandler = require("./middleware/error-handler");
const logsRouter = require("./logs-router/logs-router");
const tagsRouter = require("./tags-router/tags-router");
const usersRouter = require("./users-router/users-router");
const authRouter = require("./auth/auth-router");
const relationsRouter = require("./logTag-relation-router/relation-router");

const app = express();

const morganOption = NODE_ENV === "production" ? " tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use("/api/logs", logsRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/relations", relationsRouter);

app.use(erroHandler);

module.exports = app;
