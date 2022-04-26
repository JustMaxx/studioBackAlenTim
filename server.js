const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/dbConfig");
const user = require("./routes/userRoute");
const orders = require("./routes/ordersRoute");
const optionsCheckboxRouter = require("./routes/optionsCheckboxRouter");
const roleRouter = require("./routes/roleRouter");
const app = express();

let corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors({ origin: "http://localhost:8081" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/order.routes")(app);
require("./routes/sewind.routes")(app);

app.use("/optionsCheckboxRouter", optionsCheckboxRouter);
app.use("/roleRouter", roleRouter);

db.sync(); // синхронихация с БД
app.get("/", async (req, res) => {
  try {
    await db.authenticate();
    console.log("Соединение с БД было успешно установлено");
  } catch (e) {
    console.log("Невозможно выполнить подключение к БД: ", e);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`The server is working on the ${PORT}`);
});
