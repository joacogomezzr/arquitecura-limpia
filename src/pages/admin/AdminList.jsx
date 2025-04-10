// src/pages/admin/AdminList.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdmins, deleteAdmin, updateAdmin } from '../../infrastructure/services/adminService';
import styles from '../../styles/AdminList.module.css';

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'admin'
  });

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await getAdmins();
        setAdmins(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      role: admin.role
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedAdmin = await updateAdmin(editingAdmin.id, formData);
      setAdmins(admins.map(admin => 
        admin.id === editingAdmin.id ? updatedAdmin : admin
      ));
      setEditingAdmin(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const confirmDelete = (admin) => {
    setAdminToDelete(admin);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteAdmin(adminToDelete.id);
      setAdmins(admins.filter(admin => admin.id !== adminToDelete.id));
      setShowDeleteModal(false);
    } catch (err) {
      setError(err.message);
      setShowDeleteModal(false);
    }
  };

  if (loading) return <div className={styles.adminDashboard}>Cargando...</div>;
  if (error) return <div className={styles.adminDashboard}>Error: {error}</div>;

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Administradores</h1>
        <Link to="/admin/agregar" className={styles.addButton}>
          Agregar Administrador
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre de Usuario</th>
              <th>Correo Electrónico</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.role === 'admin' ? 'Administrador' : 'Super Admin'}</td>
                <td className={styles.actionCell}>
                  <button 
                    className={`${styles.actionButton} ${styles.editButton}`}
                    onClick={() => handleEdit(admin)}
                  >
                    Editar
                  </button>
                  <button 
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => confirmDelete(admin)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Edición */}
      {editingAdmin && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Editar Administrador</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setEditingAdmin(null)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nombre de Usuario</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.formInput}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.formInput}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Rol</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={styles.formInput}
                  required
                >
                  <option value="admin">Administrador</option>
                  <option value="superadmin">Super Administrador</option>
                </select>
              </div>
              <div className={styles.modalFooter}>
                <button 
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setEditingAdmin(null)}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className={styles.saveButton}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Confirmar Eliminación</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setShowDeleteModal(false)}
              >
                &times;
              </button>
            </div>
            <p>¿Estás seguro que deseas eliminar al administrador <strong>{adminToDelete?.name}</strong>?</p>
            <p>Esta acción no se puede deshacer.</p>
            <div className={styles.modalFooter}>
              <button 
                className={styles.cancelButton}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              <button 
                className={`${styles.saveButton} ${styles.deleteButton}`}
                onClick={handleDelete}
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