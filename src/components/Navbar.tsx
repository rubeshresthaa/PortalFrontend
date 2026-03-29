import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  logout,
} from "../store/slices/authSlice";
import toast from "react-hot-toast";
import { RootState } from "../store/store";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => selectCurrentUser(state));
  const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state));

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="sticky top-2 z-50 bg-white border-b border-slate-200 shadow-sm w-full max-w-[1420px] mx-auto rounded-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black text-indigo-600 tracking-tight">
              Task<span className="text-slate-800">Hub</span>
            </span>
          </Link>

          {/* Nav right */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
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
                  to="/dashboard"
                  className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors hidden sm:block"
                >
                  My Favourites
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
