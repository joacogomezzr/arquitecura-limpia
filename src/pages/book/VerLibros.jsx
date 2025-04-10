// src/pages/VerLibros.js
import Header from "../../components/Header";
import styles from "../../styles/VerLibros.module.css";
import { useLibros } from "../../applications/hooks/useLibros";

export default function VerLibros() {
  const {
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
  } = useLibros();

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