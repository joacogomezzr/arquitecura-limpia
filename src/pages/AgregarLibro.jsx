// src/pages/AgregarLibro.jsx
import { useState } from "react";
import Header from "../components/Header";
import { agregarLibro } from "../services/libroService";

export default function AgregarLibro() {
  const [libro, setLibro] = useState({
    title: "",
    author: "",
    year: ""
  });

  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [alertaExito, setAlertaExito] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLibro({
      ...libro,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica del formulario
    if (!libro.title || !libro.author || !libro.year) {
      setMensajeError("Todos los campos son requeridos");
      setAlertaExito(false);
      setMostrarAlerta(true);
      setTimeout(() => setMostrarAlerta(false), 3000);
      return;
    }

    try {
      const yearNumber = parseInt(libro.year, 10);
      if (isNaN(yearNumber)) {
        throw new Error("El año debe ser un número válido");
      }

      await agregarLibro({
        title: libro.title,
        author: libro.author,
        year: yearNumber
      });

      setAlertaExito(true);
      setMostrarAlerta(true);
      setMensajeError("");
      setLibro({ title: "", author: "", year: "" });

      setTimeout(() => setMostrarAlerta(false), 3000);
    } catch (error) {
      console.error("Error al enviar el libro:", error);
      setMensajeError(error.message || "Hubo un error al agregar el libro. Intenta nuevamente.");
      setAlertaExito(false);
      setMostrarAlerta(true);
      setTimeout(() => setMostrarAlerta(false), 3000);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="page-header">
          <div className="icon-container">
            <span className="page-icon">📚</span>
          </div>
          <h2 className="page-title">Agregar Libro</h2>
          <p className="page-description">Ingresa los detalles del nuevo libro para añadirlo a tu biblioteca</p>
        </div>

        {mostrarAlerta && (
          <div className={`alerta ${alertaExito ? 'exito' : 'error'}`}>
            {alertaExito 
              ? "¡Libro agregado correctamente!" 
              : mensajeError}
          </div>
        )}

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
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

              <div className="form-group">
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

              <div className="form-group">
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

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => window.history.back()}>
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Guardar Libro
              </button>
            </div>
          </form>
        </div>
      </main>

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          background-color: #f5f7fa;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .main-content {
          padding: 2.5rem 2rem;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .page-header {
          background: linear-gradient(to right, #ffffff, #f9f9f9);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          margin-bottom: 2rem;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
        }
        
        .icon-container {
          width: 70px;
          height: 70px;
          background-color: #e1f5fe;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
        
        .page-icon {
          font-size: 2rem;
        }
        
        .page-title {
          color: #2a5298;
          font-size: 1.8rem;
          margin-bottom: 0.6rem;
        }
        
        .page-description {
          color: #546e7a;
          font-size: 1rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .form-container {
          background-color: white;
          border-radius: 10px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #2a5298;
        }
        
        input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          color: #333;
          transition: border 0.3s ease, box-shadow 0.3s ease;
        }
        
        input:focus {
          outline: none;
          border-color: #2a5298;
          box-shadow: 0 0 0 2px rgba(42, 82, 152, 0.2);
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .btn-primary, .btn-secondary {
          padding: 0.8rem 1.8rem;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-primary {
          background-color: #2a5298;
          color: white;
        }
        
        .btn-primary:hover {
          background-color: #1e3c72;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .btn-secondary {
          background-color: #e0e0e0;
          color: #333;
        }
        
        .btn-secondary:hover {
          background-color: #d0d0d0;
          transform: translateY(-2px);
        }
        
        .alerta {
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1.5rem;
          text-align: center;
          animation: fadeIn 0.3s ease;
        }
        
        .exito {
          background-color: #e8f5e9;
          color: #2e7d32;
          border: 1px solid #c8e6c9;
        }
        
        .error {
          background-color: #ffebee;
          color: #c62828;
          border: 1px solid #ffcdd2;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
          .main-content {
            padding: 1.5rem 1rem;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            flex-direction: column-reverse;
          }
          
          .btn-primary, .btn-secondary {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}