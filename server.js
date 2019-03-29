const express = require("express");

const cohortsRouter = require("./cohorts/cohortsRouter");

const server = express();

server.use(express.json());

server.use("/api/cohorts", cohortsRouter);

module.exports = server;
