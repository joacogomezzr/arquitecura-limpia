import { useState, useEffect } from "react";
import Header from "../components/Header";
import styles from "../styles/VerLibros.module.css";

const API_URL = "http://127.0.0.1:8080/api/v1/books";

export default function VerLibros() {
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

  useEffect(() => {
    cargarLibros();
  }, []);

  const cargarLibros = async () => {
    try {
      setCargando(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al cargar libros");
      const data = await response.json();

      const librosArray = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
        ? data.data
        : [];

      setLibros(librosArray);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

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
      const response = await fetch(`${API_URL}/${editandoLibro.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formularioLibro.title,
          author: formularioLibro.author,
          year: parseInt(formularioLibro.year, 10)
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el libro");
      }

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
      const response = await fetch(`${API_URL}/${libroAEliminar.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el libro");
      }

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

  if (cargando) return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando catálogo de libros...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3>Error al cargar los libros</h3>
        <p>{error}</p>
        <button 
          className={styles.reintentarBtn}
          onClick={() => cargarLibros()}
        >
          Reintentar
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.appContainer}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <div className={styles.iconContainer}>
            <span className={styles.pageIcon}>📚</span>
          </div>
          <h1 className={styles.pageTitle}>Catálogo de Libros</h1>
          <p className={styles.pageDescription}>
            Explora y gestiona tu colección literaria ({libros.length} libros registrados)
          </p>
        </div>

 

        {mensajeAlerta.texto && (
          <div className={mensajeAlerta.tipo === "exito" ? styles.alertaExito : styles.alertaError}>
            {mensajeAlerta.texto}
          </div>
        )}

        {librosFiltrados.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📭</div>
            <h3>No se encontraron libros</h3>
            <p>{busqueda ? `No hay resultados para "${busqueda}"` : 'La biblioteca está vacía'}</p>
            {!busqueda && (
              <a href="/agregar" className={styles.addBookBtn}>
                Agregar primer libro
              </a>
            )}
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.booksTable}>
              <thead>
                <tr>
                  <th 
                    className={`${styles.sortable} ${orden.campo === 'title' ? styles.sortableActive : ''}`}
                    onClick={() => handleOrdenar('title')}
                  >
                    Título {orden.campo === 'title' && (orden.direccion === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className={`${styles.sortable} ${orden.campo === 'author' ? styles.sortableActive : ''}`}
                    onClick={() => handleOrdenar('author')}
                  >
                    Autor {orden.campo === 'author' && (orden.direccion === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className={`${styles.sortable} ${orden.campo === 'year' ? styles.sortableActive : ''}`}
                    onClick={() => handleOrdenar('year')}
                  >
                    Año {orden.campo === 'year' && (orden.direccion === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {librosFiltrados.map((libro) => (
                  <tr key={libro.id}>
                    <td>
                      <span className={styles.bookTitle}>{libro.title}</span>
                      {libro.year && <span className={styles.mobileYear}>{libro.year}</span>}
                    </td>
                    <td>{libro.author}</td>
                    <td className={styles.yearCell}>{libro.year}</td>
                    <td className={styles.actionsCell}>
                      <button 
                        className={`${styles.actionBtn} ${styles.editBtn}`}
                        onClick={() => handleEditar(libro)}
                        title="Editar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button 
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={() => confirmarEliminacion(libro)}
                        title="Eliminar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className={styles.resultsInfo}>
          Mostrando {librosFiltrados.length} de {libros.length} libros
          {busqueda && ` (filtrado por "${busqueda}")`}
        </div>
      </main>

      {editandoLibro && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Editar Libro</h3>
              <button 
                className={styles.closeModalBtn}
                onClick={handleCancelarEdicion}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handleGuardarEdicion}>
              <div className={styles.formGroup}>
                <label htmlFor="edit-title">Título:</label>
                <input
                  type="text"
                  id="edit-title"
                  name="title"
                  value={formularioLibro.title}
                  onChange={handleChangeFormulario}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-author">Autor:</label>
                <input
                  type="text"
                  id="edit-author"
                  name="author"
                  value={formularioLibro.author}
                  onChange={handleChangeFormulario}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-year">Año:</label>
                <input
                  type="number"
                  id="edit-year"
                  name="year"
                  value={formularioLibro.year}
                  onChange={handleChangeFormulario}
                  min="1000"
                  max={new Date().getFullYear()}
                />
              </div>
              <div className={styles.modalFooter}>
                <button 
                  type="button" 
                  className={styles.cancelBtn}
                  onClick={handleCancelarEdicion}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className={styles.saveBtn}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {mostrarConfirmacion && libroAEliminar && (
        <div className={styles.modalBackdrop}>
          <div className={styles.confirmModal}>
            <div className={styles.modalHeader}>
              <h3>Confirmar Eliminación</h3>
            </div>
            <div className={styles.modalBody}>
              <p>¿Estás seguro que deseas eliminar el libro <strong>"{libroAEliminar.title}"</strong>?</p>
              <p className={styles.warningText}>Esta acción no se puede deshacer.</p>
            </div>
            <div className={styles.modalFooter}>
              <button 
                type="button" 
                className={styles.cancelBtn}
                onClick={cancelarEliminacion}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                className={styles.deleteConfirmBtn}
                onClick={handleEliminar}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}