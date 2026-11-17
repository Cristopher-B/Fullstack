// Gasolina
import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"

// Creacion de un hook perzonalizado
export function useFetch() {
    
    // Crear el loading
    const [loading, setLoading] = useState(false)

    // Crear el auto para reutilizarlo e indicar el estado de la solicitud
    const fetchDataBackend = async (url, data = null, method = 'GET', headers = {}) => {
        // Habilitar el loading y mostrar un toast de carga
        const loadingToast = toast.loading("Procesando solicitud...")
        
        // Exito de la solicitud
        setLoading(true)
        try {
            // El auto parte con estos datos
            const response = await axios({
                method,
                url,
                headers:{
                    "Content-Type": "application/json",
                    ...headers,
                },
                data
            })
                // Respuesta exitosa, cerrar el toast de carga y mostrar un toast de éxito
                toast.dismiss(loadingToast)
                // Encadenamiento opcional para evitar caidas
                toast.success(response?.data?.msg)
                return response?.data

        }
        // Si es erroneo
        catch (error) {
            // Cerrar el toast
            toast.dismiss(loadingToast)
            // Mensaje de error, si no hay mensaje mostrar un mensaje por defecto
            toast.error(error.response?.data?.mesg || "Ocurrió un error inesperado")
            console.log(error)
        }
        // cambiear el estado del loading a false, sea correcto o erroneo, para que el usuario pueda volver a hacer otra solicitud
        finally {
            setLoading(false)
        }
    }

    // Retornar el auto y el estado del loading
    return { fetchDataBackend, loading }
}