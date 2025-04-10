// src/application/hooks/useLibros.js
import { useState, useEffect } from "react";
import { obtenerLibros, actualizarLibro, eliminarLibro } from "../../infrastructure/services/libroService";

export function useLibros() {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState({ campo: 'title', direccion: 'asc' });
  const [editandoLibro, setEditandoLibro] = useState(null);
  const [formularioLibro, setFormularioLibro] = useState({
    title: "",
    author: "",
    year: ""
  });
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [libroAEliminar, setLibroAEliminar] = useState(null);
  const [mensajeAlerta, setMensajeAlerta] = useState({ texto: "", tipo: "" });

  const cargarLibros = async () => {
    try {
      setCargando(true);
      const librosData = await obtenerLibros();
      setLibros(librosData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const mostrarAlerta = (texto, tipo) => {
    setMensajeAlerta({ texto, tipo });
    setTimeout(() => setMensajeAlerta({ texto: "", tipo: "" }), 5000);
  };

  const handleOrdenar = (campo) => {
    setOrden(prev => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleEditar = (libro) => {
    setEditandoLibro(libro);
    setFormularioLibro({
      title: libro.title || "",
      author: libro.author || "",
      year: libro.year || ""
    });
  };

  const handleCancelarEdicion = () => {
    setEditandoLibro(null);
  };

  const handleChangeFormulario = (e) => {
    const { name, value } = e.target;
    setFormularioLibro(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGuardarEdicion = async (e) => {
    e.preventDefault();
    
    try {
      await actualizarLibro(editandoLibro.id, formularioLibro);
      
      setLibros(prevLibros => 
        prevLibros.map(libro => 
          libro.id === editandoLibro.id ? { 
            ...libro, 
            title: formularioLibro.title,
            author: formularioLibro.author,
            year: formularioLibro.year
          } : libro
        )
      );
      
      setEditandoLibro(null);
      mostrarAlerta("Libro actualizado correctamente", "exito");
    } catch (err) {
      mostrarAlerta(err.message, "error");
    }
  };

  const confirmarEliminacion = (libro) => {
    setLibroAEliminar(libro);
    setMostrarConfirmacion(true);
  };

  const cancelarEliminacion = () => {
    setMostrarConfirmacion(false);
    setLibroAEliminar(null);
  };

  const handleEliminar = async () => {
    try {
      await eliminarLibro(libroAEliminar.id);
      setLibros(prevLibros => prevLibros.filter(libro => libro.id !== libroAEliminar.id));
      setMostrarConfirmacion(false);
      mostrarAlerta("Libro eliminado correctamente", "exito");
    } catch (err) {
      mostrarAlerta(err.message, "error");
    }
  };

  const librosFiltrados = libros
    .filter(libro => 
      libro.title?.toLowerCase().includes(busqueda.toLowerCase()) ||
      libro.author?.toLowerCase().includes(busqueda.toLowerCase()) ||
      String(libro.year || "").includes(busqueda)
    )
    .sort((a, b) => {
      const valorA = a[orden.campo]?.toString().toLowerCase() || "";
      const valorB = b[orden.campo]?.toString().toLowerCase() || "";
      
      if (valorA < valorB) return orden.direccion === 'asc' ? -1 : 1;
      if (valorA > valorB) return orden.direccion === 'asc' ? 1 : -1;
      return 0;
    });

  return {
    libros,
    cargando,
    error,
    busqueda,
    setBusqueda,
    orden,
    handleOrdenar,
    editandoLibro,
    formularioLibro,
    handleEditar,
    handleCancelarEdicion,
    handleChangeFormulario,
    handleGuardarEdicion,
    mostrarConfirmacion,
    libroAEliminar,
    confirmarEliminacion,
    cancelarEliminacion,
    handleEliminar,
    mensajeAlerta,
    cargarLibros,
    librosFiltrados
  };
}