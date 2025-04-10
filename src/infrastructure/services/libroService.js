// src/infrastructure/services/libroService.js
const API_URL = "http://127.0.0.1:8080/api/v1/books";

export async function obtenerLibros() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al cargar libros");
    const data = await response.json();

    return Array.isArray(data)
      ? data
      : Array.isArray(data.data)
      ? data.data
      : [];
  } catch (error) {
    console.error("Error en obtenerLibros:", error.message);
    throw error;
  }
}

export async function agregarLibro(libro) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: libro.title,
        author: libro.author,
        year: libro.year
      }),
      credentials: 'include'
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.error("Error del servidor:", responseData);
      throw new Error(responseData.message || "Error al guardar el libro");
    }

    return responseData;
  } catch (error) {
    console.error("❌ Error en agregarLibro:", error.message);
    throw error;
  }
}

export async function actualizarLibro(id, libro) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: libro.title,
        author: libro.author,
        year: parseInt(libro.year, 10)
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar el libro");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en actualizarLibro:", error.message);
    throw error;
  }
}

export async function eliminarLibro(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar el libro");
    }

    return true;
  } catch (error) {
    console.error("Error en eliminarLibro:", error.message);
    throw error;
  }
}