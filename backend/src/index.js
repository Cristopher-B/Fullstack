import app from "./server.js"
// importar database
import connection from "./database.js"

connection().catch((err) => console.log(err));

app.listen(app.get("port"), ()=>{console.log("Server on")})
// node --watch src/index.js
