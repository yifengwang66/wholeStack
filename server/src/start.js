const express = require("express");
const path = require("path");
const { router: apiRouter } = require("./routes/apiRouter");
const errorMiddleware = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
// const http = require('http');
const app = express();
// const server = http.createServer(app)
const port = 12138;
const bEndStaticRoot = path.resolve(__dirname, "./public/2B");
const cEndStaticRoot = path.resolve(__dirname, "./public/2C");
const staticRoot = path.resolve(__dirname, "./static");

app.use("/2b", express.static(bEndStaticRoot));
app.use("/2c", express.static(cEndStaticRoot));
app.use("/static", express.static(staticRoot));

//处理cookie的中间件
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/test", (req, res, next) => {
  console.log(req.headers, req.body, req.query, req.path);
  res.send("hello!");
});

app.use("/api", apiRouter);

app.listen(port, "localhost", () => {
  console.log("server listening at " + port);
});

app.use(errorMiddleware);

module.exports = {
  app,
};
