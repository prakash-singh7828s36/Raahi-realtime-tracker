import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/me", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("User authenticated:", response.data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        navigate("/login");
      })
      .finally(() => {
        setIsChecking(false);
      });
  }, []);

  // While checking login → show nothing or loader
  if (isChecking) {
    return <div>Loading...</div>;
  }

  // If authenticated → show page
  if (isAuthenticated) {
    return children;
  }

  return null;
};

export default Protected;
