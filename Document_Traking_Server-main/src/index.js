//Configuracion a la base de datos

const mongoose = require("mongoose");
//En app se va a cargar toda la configuracion que se hizo en app.js
const app = require("./app");
const port = process.env.PORT || 3977;
const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");

//mongoose.set("useFindAndModify", false);

mongoose.connect(`mongodb://${IP_SERVER}:${PORT_DB}/documentTracking`, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
  if (err) {
    throw err;
  } else {
    console.log("La conexion a la base de datos es correcta.");
    app.listen(port, () => {
      console.log("####################");
      console.log("##### API REST #####");
      console.log("####################");
      console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
    });
  }
});