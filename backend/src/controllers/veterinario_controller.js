import Veterinario from "../models/Veterinario.js"

const registro = async (req, res) => {
    try {
        // Paso 1
            // Obtener los datos
        const { email, password } = req.body

        // Paso 2
            // Validaciones
        if (Object.values(req.body).includes("")) {
            return res.status(400).json({ msg: "Debe llenar todos los campos" })
        }

            // Verificar si existe el email
        const verificarEmailBD = await Veterinario.findOne({email})

        if(verificarEmailBD){
            return res.status(400).json({msg:"Email ya registrado"})
        }

        // Paso 3

            // Instanciar
        const nuevoVeterinario = new Veterinario(req.body)
            // Guardar en la BD
        await nuevoVeterinario.save()

        // Paso 4

            // Respuesta
        res.status(201).json({msg:"Registro exitoso"})

    } catch (error) {

        res.status(500).json({msg: "Error"})
    }
}

// Exportación nombrada
export {
    registro
}