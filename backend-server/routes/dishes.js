var express = require("express");
var router = express.Router();
const connector = require("../poolconnect");

router.get("/createtable", function (req, res) {
  connector.query(
    "CREATE TABLE dishes(id INT PRIMARY KEY, name VARCHAR(100), description VARCHAR(200),cid INT, price INT, FOREIGN KEY(cid) references category(id))",
    (error, results) => {
      res.json({ error, results });
    }
  );
});

router.post("/", (req, res) => {
  const { id, name, description, cid, price } = req.body;
  const sql = `INSERT INTO dishes VALUES(?,?,?,?,?)`;
  connector.query(sql, [id, name, description, cid, price], (error, result) => {
    res.json({ error, result });
  });
});

router.get("/", (req, res) => {
  const sql = "SELECT * from dishes";
  connector.query(sql, (error, result) => {
    res.json({ error, result });
  });
});

router.put("/:id", (req, res) => {
  const { name, description, cid, price } = req.body;
  const sql = `UPDATE dishes set name=?, description=?, cid=?, price=? where id=${req.params.id};`;
  connector.query(sql, [name, description, cid, price], (error, result) => {
    res.json({ error, result });
  });
});

router.delete("/:id", (req, res) => {
  const sql = `DELETE from dishes where id="${req.params.id}";`;
  connector.query(sql, (error, result) => {
    res.json({ error, result });
  });
});

router.get("/byname/:name", (req, res) => {
  const sql = "SELECT * from dishes where name=?";
  connector.query(sql, [req.params.name], (error, result) => {
    res.json({ error, result });
  });
});
router.delete("/delete/all", (req, res) => {
  const sql = "truncate table dishes";
  connector.query(sql, (error, result) => {
    res.json({ error, result });
  });
});

module.exports = router;
