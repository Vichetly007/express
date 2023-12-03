const db = require("../util/db");

const create = async (req, res) => {
  // const {name,description} = req.body
  // const insertSql = "INSERT INTO category (name, description) VALUES (?,?)";
  // db.query(insertSql,[name,description],(error,rows)=>{
  //     if(error){
  //         res.json({
  //             message:error,
  //             error : true
  //         })
  //     }else{
  //         res.json({
  //             data: rows,
  //             message: "insert success!"
  //         })
  //     }
  // })
  // try {
  //   const { name, description } = req.body;
  //   const insertSql =
  //     "INSERT INTO category (name, description, image) VALUES (?,?)";
  //   const param = [name, description];
  //   const data = await db.query(insertSql, param);
  //   res.json({
  //     message: "insert success!",
  //     list: data,
  //   });
  // } catch (e) {
  //   console.log(e);
  // }
  try {
    const { name, description } = req.body;
    let filename = null;
    if (req.file) {
      filename = req.file.filename;
    }
    const sql =
      "INSERT INTO category (name, description, image) VALUES (?,?,?)";
    const param = [name, description, filename];
    const data = await db.query(sql, param);
    res.json({
      body: req.body,
      file: req.file,
    });
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM category");
    res.json({
      message: "List success!",
      list: data,
    });
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
};

const creates = async (req, res) => {
  try {
    const { data } = req.body;
    const insertSql = "INSERT INTO category (name,description) VALUES ? ";
    const param = [];
    for (let i = 0; i < data.length; i++) {
      param.push([data[i].name, data[i].description]);
    }
    const result = await db.query(insertSql, [param]);
    res.json({
      message: "insert success!",
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

module.exports = { create, getAll, creates };
