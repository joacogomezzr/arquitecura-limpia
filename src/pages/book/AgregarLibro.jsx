// src/pages/AgregarLibro.jsx
import Header from "../../components/Header";
import { useAgregarLibro } from "../../applications/hooks/useAgregarLibro";
import styles from "../../styles/AgregarLibro.module.css";

export default function AgregarLibro() {
  const {
    libro,
    mostrarAlerta,
    alertaExito,
    mensajeError,
    handleChange,
    handleSubmit
  } = useAgregarLibro();

  return (
    <div className={styles.appContainer}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <div className={styles.iconContainer}>
            <span className={styles.pageIcon}>📚</span>
          </div>
          <h2 className={styles.pageTitle}>Agregar Libro</h2>
          <p className={styles.pageDescription}>
            Ingresa los detalles del nuevo libro para añadirlo a tu biblioteca
          </p>
        </div>

        {mostrarAlerta && (
          <div className={`${styles.alerta} ${alertaExito ? styles.exito : styles.error}`}>
            {alertaExito 
              ? "¡Libro agregado correctamente!" 
              : mensajeError}
          </div>
        )}

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={libro.title}
                  onChange={handleChange}
                  required
                  placeholder="Ingresa el título del libro"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="author">Autor</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={libro.author}
                  onChange={handleChange}
                  required
                  placeholder="Nombre del autor"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="year">Año de Publicación</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={libro.year}
                  onChange={handleChange}
                  placeholder="Año de publicación"
                  min="1000"
                  max={new Date().getFullYear()}
                  required
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <button 
                type="button" 
                className={styles.btnSecondary} 
                onClick={() => window.history.back()}
              >
                Cancelar
              </button>
              <button type="submit" className={styles.btnPrimary}>
                Guardar Libro
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}