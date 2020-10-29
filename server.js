const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const myBudgetData = require('./data.json');
const mongoose = require("mongoose");
const budgetModel = require("./models/budget_schema");

let url = 'mongodb://localhost:27017/budget';

app.use(cors());



app.get('/api/budget', (req, resp) => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to the database to get from /api/budget');
    // List All entries
    budgetModel.find({})
      .then((res) => {
        console.log(res);
        mongoose.connection.close();
        resp.json(res);
      })
      .catch((err) => {
        console.log(err);
        console.log('a connection error has happened, shown above.');
      });
  })
  .catch((err) => {
    console.log(err);
    console.log('there was a connection error to mongodb_demo, shown above');
  });
});

app.post('/api/budget', (req, resp) => {
  // console.log(myBudgetData.myBudget);

  // let newData = new budgetModel(myBudgetData);
  let newData = new budgetModel({
      "title": "Concerts",
      "budget": 90,
      "color": "#ffcd56"
    });
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
      console.log(res);
      console.log('connected to the database to post to /api/budget');
      console.log(newData);
      budgetModel.insertMany(newData)
        .then((res) => {
          console.log(res);
          mongoose.connection.close();
          resp.send(res);
        })
        .catch((err) => {
          console.log(err);
          console.log('a connection error has happened, shown above.');
        });
    })
    .catch((err) => {
      console.log(err);
      console.log('there was a connection error to mongodb_demo, shown above');
    });
});

app.get('/hello', (req, res) => {
  res.send('hello world');
});

app.get('/budget', (req, res) => {
  res.send(myBudgetData);
});

app.listen(port, () => {
  console.log(`example is listening on port localhost:${port}`);
});