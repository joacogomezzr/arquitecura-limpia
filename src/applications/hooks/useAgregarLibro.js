// src/application/hooks/useAgregarLibro.js
import { useState } from "react";
import { agregarLibro } from "../../infrastructure/services/libroService";

export function useAgregarLibro() {
  const [libro, setLibro] = useState({
    title: "",
    author: "",
    year: ""
  });

  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [alertaExito, setAlertaExito] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLibro(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica del formulario
    if (!libro.title || !libro.author || !libro.year) {
      setMensajeError("Todos los campos son requeridos");
      setAlertaExito(false);
      setMostrarAlerta(true);
      setTimeout(() => setMostrarAlerta(false), 3000);
      return;
    }

    try {
      const yearNumber = parseInt(libro.year, 10);
      if (isNaN(yearNumber)) {
        throw new Error("El año debe ser un número válido");
      }

      await agregarLibro({
        title: libro.title,
        author: libro.author,
        year: yearNumber
      });

      setAlertaExito(true);
      setMostrarAlerta(true);
      setMensajeError("");
      setLibro({ title: "", author: "", year: "" });

      setTimeout(() => setMostrarAlerta(false), 3000);
      return true;
    } catch (error) {
      console.error("Error al enviar el libro:", error);
      setMensajeError(error.message || "Hubo un error al agregar el libro. Intenta nuevamente.");
      setAlertaExito(false);
      setMostrarAlerta(true);
      setTimeout(() => setMostrarAlerta(false), 3000);
      return false;
    }
  };

  return {
    libro,
    mostrarAlerta,
    alertaExito,
    mensajeError,
    handleChange,
    handleSubmit
  };
}