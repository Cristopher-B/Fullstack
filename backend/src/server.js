// Requerir modulos
import express from "express"
import dotenv from "dotenv"
import routerVeterinarios from "../src/routes/veterinario_routes.js"

// Inicializaciones
const app = express()

// Configuraciones
dotenv.config()
// Middlewares
app.use(express.json())

// Variables globales
//app.set("port",3000)
app.set("port", process.env.PORT || 3000) // si no hay variable de entorno PORT, usar 3000


// Rutas
app.use("/api",routerVeterinarios)

// Exportar la instancia de express por medio de app
export default app