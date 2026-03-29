import { useGetPropertiesQuery } from "../store/api/propertyApi";
import { useAddFavouriteMutation, useGetFavouritesQuery } from "../store/api/favouriteApi";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/slices/authSlice";
import toast from "react-hot-toast";

import PropertyCard from "../components/PropertyCard";

export default function PublicDashboard() {
  const { data: propertyRes, isLoading, isError } = useGetPropertiesQuery();
  const [addFavourite] = useAddFavouriteMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { data: favRes } = useGetFavouritesQuery(undefined, {
    skip: !isAuthenticated,
  });

  const properties = propertyRes?.data || [];
  const favouritedIds = new Set(favRes?.data?.map((p: any) => p._id) || []);

  const handleBookmark = async (e: React.MouseEvent, propertyId: string) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please sign in to bookmark properties");
      return;
    }
    try {
      const result = await addFavourite({ propertyId }).unwrap();
      const msg = result?.message || "Added to favourites!";
      toast.success(msg);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to bookmark");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Hero */}
        <div className="rounded-3xl bg-gray-50 border border-gray-200 p-8 sm:p-12 mb-10 ">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-2">Portal</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
                Discover{" "}
                <span className="text-cyan-400">Featured Properties</span>
              </h1>
              <p className="text-slate-400 text-base">
                Explore top-rated properties across the platform
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 px-8 py-5 rounded-2xl flex flex-col items-center min-w-[130px]">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-1">Available</span>
              <span className="text-5xl font-black text-gray-600">
                {isLoading ? "—" : properties.length}
              </span>
            </div>
          </div>
        </div>

        {/* Section label */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">All Properties</h2>
          {!isAuthenticated && (
            <p className="text-sm text-slate-500">Sign in to bookmark properties</p>
          )}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <div className="p-10 text-center text-red-500 bg-red-50 rounded-2xl border border-red-200">
            Failed to load properties. Please try again.
          </div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <h3 className="text-xl font-bold text-slate-700 mb-2">No properties listed yet</h3>
            <p className="text-slate-500 max-w-sm text-sm">
              There are currently no featured properties to display. Check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                isFavourited={favouritedIds.has(property._id)}
                onBookmark={handleBookmark}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
