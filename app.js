
const express = require('express');
const path =require('path')
const app =express()

app.use("/", require(path.join(__dirname,'routes/record.js')));


const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log("Server up and running available at http://localhost:" + port)
);

app.use(function (req, res, next) {
  next(createError(404));
});


