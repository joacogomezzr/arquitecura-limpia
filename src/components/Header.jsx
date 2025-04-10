// src/components/Header.jsx
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <span className="logo-icon">📚</span>
        <h1 className="title">Bibliotecario Administrador</h1>
      </div>
      <nav className="nav-menu">
        <Link to="/" className="nav-link home">Inicio</Link>
        <Link to="/agregar" className="nav-link add">Agregar Libro</Link>
        <Link to="/ver" className="nav-link view">Ver Libros</Link>
        <Link to="/admin/agregar" className="nav-link admin">Agregar Usuario</Link>
        <Link to="/admin/listar" className="nav-link list">Ver Admins</Link>
      </nav>
      
      <style jsx>{`
        .header {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          padding: 1.5rem 2rem;
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .logo-container {
          display: flex;
          align-items: center;
        }
        
        .logo-icon {
          font-size: 2rem;
          margin-right: 1rem;
        }
        
        .title {
          margin: 0;
          font-weight: 600;
          font-size: 1.8rem;
          letter-spacing: 0.5px;
        }
        
        .nav-menu {
          display: flex;
          gap: 1rem;
        }
        
        .nav-link {
          padding: 0.7rem 1.5rem;
          color: #fff;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }
        
        .nav-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .home {
          background-color: rgba(255, 255, 255, 0.2);
        }
        
        .add {
          background-color: #4CAF50;
        }
        
        .view {
          background-color: #2196F3;
        }

        .admin {
          background-color: #9C27B0;
        }
        
        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            padding: 1rem;
          }
          
          .logo-container {
            margin-bottom: 1rem;
          }
          
          .nav-menu {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </header>
  );
}