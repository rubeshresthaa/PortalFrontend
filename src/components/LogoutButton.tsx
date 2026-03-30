import React from "react";
import { useLogoutMutation } from "../store/api/authApi";

const LogoutButton: React.FC = () => {
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      // Clear local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      // Redirect to login page
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
      // Still clear local storage and redirect even if API call fails
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
