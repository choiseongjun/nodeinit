const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const con = mysql.createConnection({
  host: "ls-b50b96f7518520ccd303f46226b1b0450dd04f70.csqzq9lkftya.ap-northeast-2.rds.amazonaws.com",
  user: "",
  password: "",
  database: "testdb2", //追加
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});
app.get("/users", (request, response) => {
  const sql = "select * from users";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    response.send(result);
  });
});
app.post("/users", (req, res) => {
  const nickName = req.body.nickName;
  const phoneNumber = req.body.phoneNumber;

  //   const sql =
  //     "INSERT INTO users(name,phoneNumber)  values('" +
  //     nickName +
  //     "', '" +
  //     phoneNumber +
  //     "')`";

  const sql = `INSERT INTO users(nickName,phoneNumber)  VALUES(?,?)`;
  var param = [nickName, phoneNumber];
  con.query(sql, param, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send("등록이 완료 되었습니다");
  });
});
