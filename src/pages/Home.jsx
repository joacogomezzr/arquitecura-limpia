// src/pages/Home.jsx
import Header from "../components/Header";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="welcome-card">
          <div className="icon-container">
            <span className="welcome-icon">👋</span>
          </div>
          <h2 className="welcome-title">¡Bienvenido, Bibliotecario Administrador!</h2>
          <p className="welcome-text">Gestiona tu colección de libros fácilmente con nuestra plataforma intuitiva.</p>
        </div>
        
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">➕</div>
            <h3>Agregar Libros</h3>
            <p>Añade nuevos títulos a tu colección con toda la información necesaria.</p>
            <Link to="/agregar" className="feature-link">Agregar ahora</Link>

          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Ver Catálogo</h3>
            <p>Consulta y administra todos los libros en tu inventario.</p>
            <a href="/ver" className="feature-link">Ver catálogo</a>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Estadísticas</h3>
            <p>Visualiza datos importantes sobre tu colección de libros.</p>
            <Link to="/admin/listar" className="feature-link">Ver Admins</Link>

          </div>
        </div>
      </main>
      
      <style jsx>{`
        .app-container {
          min-height: 100vh;
          background-color: #f5f7fa;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .main-content {
          padding: 3rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .welcome-card {
          background: linear-gradient(to right, #ffffff, #f9f9f9);
          border-radius: 12px;
          padding: 2.5rem;
          text-align: center;
          margin-bottom: 3rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }
        
        .icon-container {
          width: 80px;
          height: 80px;
          background-color: #e1f5fe;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }
        
        .welcome-icon {
          font-size: 2.5rem;
        }
        
        .welcome-title {
          color: #2a5298;
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .welcome-text {
          color: #546e7a;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .features-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .feature-card {
          background-color: white;
          border-radius: 10px;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .feature-card h3 {
          color: #2a5298;
          margin-bottom: 0.8rem;
        }
        
        .feature-card p {
          color: #546e7a;
          margin-bottom: 1.5rem;
        }
        
        .feature-link {
          display: inline-block;
          padding: 0.7rem 1.5rem;
          background-color: #2a5298;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .feature-link:hover {
          background-color: #1e3c72;
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .main-content {
            padding: 2rem 1rem;
          }
          
          .features-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}