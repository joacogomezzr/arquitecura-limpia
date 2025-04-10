// src/services/libroService.js

const API_URL = "http://127.0.0.1:8080/api/v1/books";

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