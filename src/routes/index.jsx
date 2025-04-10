// src/routes/index.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AgregarLibro from "../pages/book/AgregarLibro";
import VerLibros from "../pages/book/VerLibros";
import AgregarAdmin from "../pages/admin/AgregarAdmin";
import AdminList from "../pages/admin/AdminList";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agregar" element={<AgregarLibro />} />
        <Route path="/ver" element={<VerLibros />} />
        <Route path="/admin/agregar" element={<AgregarAdmin />} />
        <Route path="/admin/listar" element={<AdminList />} />
      </Routes>
    </Router>
  );
}