var express = require("express");
var router = express.Router();
const connector = require("../poolconnect");

router.get("/createtable", function (req, res) {
  connector.query(
    "CREATE TABLE category(id INT, name VARCHAR(100), description VARCHAR(200), PRIMARY KEY(id))",
    (error, results) => {
      res.json({ error, results });
    }
  );
});

router.post("/", (req, res) => {
  const { id, name, description } = req.body;
  const sql = `INSERT INTO category VALUES(?,?,?)`;
  connector.query(sql, [id, name, description], (error, result) => {
    res.json({ error, result });
  });
});

router.get("/", (req, res) => {
  const sql = "SELECT * from category";
  connector.query(sql, (error, result) => {
    res.json({ error, result });
  });
});

router.put("/:id", (req, res) => {
  const { name, description } = req.body;
  const sql = `UPDATE category set name=?, description=? where id=${req.params.id};`;
  connector.query(sql, [name, description], (error, result) => {
    res.json({ error, result });
  });
});

router.delete("/:id", (req, res) => {
  const sql = `DELETE from category where id="${req.params.id}";`;
  connector.query(sql, (error, result) => {
    res.json({ error, result });
  });
});

router.delete("/delete/all", (req, res) => {
  const sql = "truncate table category";
  connector.query(sql, (error, result) => {
    res.json({ error, result });
  });
});

module.exports = router;
