var express = require("express");
var router = express.Router();

router.get("/setcookie/:name/:value", (req, res) => {
  res.cookie(req.params.name, req.params.value);
  res.send(
    `cookie with name ${req.params.name} and value ${req.params.value} set`
  );
});

router.get("/setcookiewithtime/:name/:value/:time", (req, res) => {
  res.cookie(req.params.name, req.params.value, {
    maxAge: req.params.time * 1000 * 60,
  });
  res.send(
    `cookie with name ${req.params.name} and value ${req.params.value} set and will expire in ${req.params.time} minutes`
  );
});

router.get("/viewcookies", (req, res) => {
  res.send(req.cookies);
});

router.get("/delete/:name", (req, res) => {
  res.clearCookie(req.params.name);
  res.send(`cookie with name ${req.params.name} is deleted`);
});
module.exports = router;
