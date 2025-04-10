// src/pages/admin/AgregarAdmin.jsx
import Header from "../../components/Header";
import { useAdmin } from "../../applications/hooks/useAdmin";
import styles from "../../styles/AdminForm.module.css";

export default function AgregarAdmin() {
  const {
    formData,
    error,
    success,
    handleChange,
    handleSubmit
  } = useAdmin();

  return (
    <div className={styles.fullPageContainer}>
      <Header />
      
      <div className={styles.contentWrapper}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Agregar Nuevo Administrador</h1>
          
          {error && <div className={styles.error}>{error}</div>}
          {success && (
            <div className={styles.success}>
              ¡Administrador creado exitosamente! Redirigiendo...
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={styles.input}
                placeholder="Ingrese el nombre de usuario"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="ejemplo@dominio.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="Mínimo 6 caracteres"
                required
                minLength="6"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role" className={styles.label}>
                Rol
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="admin">Administrador</option>
                <option value="superadmin">Super Administrador</option>
              </select>
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.submitButton}>
                Registrar Administrador
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => navigate("/")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}