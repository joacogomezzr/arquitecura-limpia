// src/services/adminService.js
const API_URL = "http://127.0.0.1:8080/api/v1/admins";

// Función para mapear los nombres de campos entre frontend y backend
const mapAdminToBackend = (adminData) => ({
  name: adminData.username,  // Mapea username -> name para el backend
  email: adminData.email,
  ...(adminData.password && { password: adminData.password }), // Solo incluir si existe
  ...(adminData.role && { role: adminData.role }) // Solo incluir si existe
});

const mapAdminToFrontend = (adminData) => ({
  ...adminData,
  username: adminData.name // Mapea name -> username para el frontend
});

export const createAdmin = async (adminData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mapAdminToBackend(adminData)),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear administrador");
  }

  const data = await response.json();
  return mapAdminToFrontend(data);
};

export const getAdmins = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener administradores");
  
  const data = await response.json();
  
  // Procesar la respuesta según su estructura
  let admins = [];
  if (Array.isArray(data)) {
    admins = data;
  } else if (data.data && Array.isArray(data.data)) {
    admins = data.data;
  }

  // Mapear cada admin al formato del frontend
  return admins.map(mapAdminToFrontend);
};

export const updateAdmin = async (id, adminData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mapAdminToBackend(adminData)),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar administrador");
  }

  const data = await response.json();
  return mapAdminToFrontend(data);
};

export const deleteAdmin = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar administrador");
  }

  return true;
};