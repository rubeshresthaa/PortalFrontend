import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../store/api/authApi";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const router = useNavigate();
  const { user, isAuthenticated: isAuth } = useAuth();
  const [logout] = useLogoutMutation();

  console.log("User:", user);
  console.log("Is Auth:", isAuth);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Always redirect
      router("/");
    }
  };

  return (
    <nav className="sticky top-2 z-50 bg-white border-b border-slate-200 shadow-sm w-full max-w-[1420px] mx-auto rounded-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black text-indigo-600 tracking-tight">
              Real<span className="text-slate-800">Estate</span>
            </span>
          </Link>

          {/* Nav right */}
          <div className="flex items-center gap-4">
            {isAuth ? (
              <>
                {/* User info */}
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-semibold text-slate-800">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="text-xs text-slate-500 capitalize">
                    {user?.role || "Buyer"}
                  </span>
                </div>

                <Link
                  to="/profile"
                  className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors "
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-slate-500 hover:text-red-500 border border-slate-200 hover:border-red-200 px-4 py-2 rounded-xl transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-5 rounded-xl transition-all shadow-md shadow-indigo-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
