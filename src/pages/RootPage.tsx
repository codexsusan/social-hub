import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RootPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    } else {
      navigate("/home");
    }
  }, [navigate, token]);
  return null;
}

export default RootPage;
