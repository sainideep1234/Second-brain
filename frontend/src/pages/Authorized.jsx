import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Authorized({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  return <>{children}</>;
}

export default Authorized;
