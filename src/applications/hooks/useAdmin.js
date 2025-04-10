// src/application/hooks/useAdmin.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdmin } from "../../infrastructure/services/adminService";

export function useAdmin() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "admin"
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      await createAdmin(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    formData,
    error,
    success,
    handleChange,
    handleSubmit
  };
}