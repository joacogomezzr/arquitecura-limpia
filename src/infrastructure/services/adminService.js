// src/infrastructure/services/adminService.js
const API_URL = "http://127.0.0.1:8080/api/v1/admins";

const mapAdminToBackend = (adminData) => ({
  name: adminData.username,
  email: adminData.email,
  ...(adminData.password && { password: adminData.password }),
  ...(adminData.role && { role: adminData.role })
});

const mapAdminToFrontend = (adminData) => ({
  ...adminData,
  username: adminData.name
});

export const createAdmin = async (adminData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mapAdminToBackend(adminData)),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al crear administrador");
  }

  const data = await response.json();
  return mapAdminToFrontend(data);
};

export const getAdmins = async () => {
  const response = await fetch(API_URL, {
    credentials: 'include'
  });
  
  if (!response.ok) throw new Error("Error al obtener administradores");
  
  const data = await response.json();
  
  let admins = [];
  if (Array.isArray(data)) {
    admins = data;
  } else if (data.data && Array.isArray(data.data)) {
    admins = data.data;
  }

  return admins.map(mapAdminToFrontend);
};

export const updateAdmin = async (id, adminData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mapAdminToBackend(adminData)),
    credentials: 'include'
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
    credentials: 'include'
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar administrador");
  }

  return true;
};