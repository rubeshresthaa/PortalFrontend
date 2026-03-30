import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  useGetPropertiesQuery,
  useGetMyPropertiesQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} from "../store/api/propertyApi";
import {
  useGetFavouritesQuery,
  useAddFavouriteMutation,
} from "../store/api/favouriteApi";
import DashboardPropertyCard from "../components/DashboardPropertyCard";
import PropertyModal from "../components/PropertyModal";
import toast from "react-hot-toast";
import { Property } from "../types/property.types.d";

export default function Dashboard() {
  const { user } = useAuth();
  const {
    data: propertiesRes,
    isLoading: isPropLoading,
    isError: isPropError,
  } = useGetPropertiesQuery();
  const {
    data: myPropertiesRes,
    isLoading: isMyPropLoading,
    isError: isMyPropError,
  } = useGetMyPropertiesQuery();
  const {
    data: favouritesRes,
    isLoading: isFavLoading,
    isError: isFavError,
  } = useGetFavouritesQuery();

  const [createProperty, { isLoading: isCreating }] =
    useCreatePropertyMutation();
  const [updateProperty, { isLoading: isUpdating }] =
    useUpdatePropertyMutation();
  const [deleteProperty] = useDeletePropertyMutation();
  const [toggleFavourite] = useAddFavouriteMutation();

  const [activeTab, setActiveTab] = useState<
    "properties" | "my-properties" | "favourites"
  >("properties");

  // Redirect buyers away from my-properties tab
  useEffect(() => {
    if (user?.role !== "seller" && activeTab === "my-properties") {
      setActiveTab("properties");
    }
  }, [user?.role, activeTab]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(
    null,
  );

  const [formData, setFormData] = useState<Partial<Property>>({
    propertyTitle: "",
    propertyAddress: "",
    propertyPrice: 0,
    propertyImage: "",
    propertyType: "",
    propertyBeds: 0,
    propertyBaths: 0,
  });

  const properties: Property[] = propertiesRes?.data || [];
  const myProperties: Property[] = myPropertiesRes?.data || [];
  const favourites: Property[] = favouritesRes?.data || [];

  const handleOpenModal = (property?: Property) => {
    if (property) {
      setEditingPropertyId(property._id);
      setFormData({
        propertyTitle: property.propertyTitle,
        propertyAddress: property.propertyAddress,
        propertyPrice: property.propertyPrice,
        propertyImage: property.propertyImage || "",
        propertyType: property.propertyType || "",
        propertyBeds: property.propertyBeds || 0,
        propertyBaths: property.propertyBaths || 0,
      });
    } else {
      setEditingPropertyId(null);
      setFormData({
        propertyTitle: "",
        propertyAddress: "",
        propertyPrice: 0,
        propertyImage: "",
        propertyType: "",
        propertyBeds: 0,
        propertyBaths: 0,
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingPropertyId(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPropertyId) {
        await updateProperty({ id: editingPropertyId, ...formData }).unwrap();
        toast.success("Property updated successfully!");
      } else {
        await createProperty(formData).unwrap();
        toast.success("Property created successfully!");
      }
      handleCloseModal();
    } catch (err: any) {
      toast.error(err?.data?.message || "Action failed!");
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (!window.confirm("Delete this property entirely?")) return;
    try {
      await deleteProperty(propertyId).unwrap();
      toast.success("Property deleted successfully!");
    } catch {
      toast.error("Failed to delete property");
    }
  };

  const handleRemoveFavourite = async (propertyId: string) => {
    if (!window.confirm("Remove this from your favourites?")) return;
    try {
      await toggleFavourite({ propertyId }).unwrap();
      toast.success("Removed from favourites");
    } catch {
      toast.error("Failed to remove bookmark");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Card */}
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-8 sm:p-12 mb-10 shadow-xl shadow-indigo-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <p className="text-indigo-100 text-sm font-semibold uppercase tracking-widest mb-2">
                My Portal
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                Welcome back,{" "}
                <span className="text-cyan-200">
                  {user?.firstName} {user?.lastName}
                </span>
              </h1>
              <p className="text-indigo-100 text-base">
                {user?.email} &nbsp;&middot;&nbsp;
                <span className="capitalize font-semibold">{user?.role}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/15 backdrop-blur-sm border border-white/30 px-6 py-4 rounded-2xl flex flex-col items-center min-w-[110px]">
                <span className="text-indigo-100 text-[10px] font-semibold uppercase tracking-widest mb-1">
                  Properties
                </span>
                <span className="text-4xl font-black text-white">
                  {isPropLoading ? "—" : properties.length}
                </span>
              </div>
              <div className="bg-white/15 backdrop-blur-sm border border-white/30 px-6 py-4 rounded-2xl flex flex-col items-center min-w-[110px]">
                <span className="text-indigo-100 text-[10px] font-semibold uppercase tracking-widest mb-1">
                  My Properties
                </span>
                <span className="text-4xl font-black text-white">
                  {isMyPropLoading ? "—" : myProperties.length}
                </span>
              </div>
              <div className="bg-white/15 backdrop-blur-sm border border-white/30 px-6 py-4 rounded-2xl flex flex-col items-center min-w-[110px]">
                <span className="text-indigo-100 text-[10px] font-semibold uppercase tracking-widest mb-1">
                  Favourites
                </span>
                <span className="text-4xl font-black text-white">
                  {isFavLoading ? "—" : favourites.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Actions */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("properties")}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "properties"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Properties
            </button>
            {user?.role === "seller" && (
              <button
                onClick={() => setActiveTab("my-properties")}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === "my-properties"
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200"
                }`}
              >
                My Properties
              </button>
            )}
            <button
              onClick={() => setActiveTab("favourites")}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "favourites"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200"
              }`}
            >
              Favourites
            </button>
          </div>

          {activeTab === "my-properties" && user?.role === "seller" && (
            <button
              onClick={() => handleOpenModal()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-indigo-200 text-sm"
            >
              + Add Property
            </button>
          )}
        </div>

        {/* Properties Content */}
        {activeTab === "properties" && (
          <>
            {isPropLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-80 rounded-2xl bg-slate-200 animate-pulse"
                  />
                ))}
              </div>
            ) : isPropError ? (
              <div className="p-10 text-center text-red-500 bg-red-50 rounded-2xl border border-red-200">
                Failed to load properties. Please try again.
              </div>
            ) : properties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <h3 className="text-xl font-bold text-slate-700 mb-2">
                  No properties found
                </h3>
                <p className="text-slate-500 max-w-sm mb-6 text-sm">
                  {user?.role === "seller"
                    ? "You haven't listed any properties yet. Click button above to add a new property."
                    : "There are no properties currently available overall."}
                </p>
                {user?.role === "seller" && (
                  <button
                    onClick={() => handleOpenModal()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all text-sm"
                  >
                    + Add Property
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {properties.map((property) => (
                  <DashboardPropertyCard
                    key={property._id}
                    property={property}
                    variant="properties"
                    userRole={user?.role}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* My Properties Content */}
        {activeTab === "my-properties" && (
          <>
            {isMyPropLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-80 rounded-2xl bg-slate-200 animate-pulse"
                  />
                ))}
              </div>
            ) : isMyPropError ? (
              <div className="p-10 text-center text-red-500 bg-red-50 rounded-2xl border border-red-200">
                Failed to load your properties. Please try again.
              </div>
            ) : myProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <h3 className="text-xl font-bold text-slate-700 mb-2">
                  No properties found
                </h3>
                <p className="text-slate-500 max-w-sm mb-6 text-sm">
                  You haven't listed any properties yet. Click the button above
                  to add a new property.
                </p>
                <button
                  onClick={() => handleOpenModal()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all text-sm"
                >
                  + Add Property
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {myProperties.map((property) => (
                  <DashboardPropertyCard
                    key={property._id}
                    property={property}
                    variant="my-properties"
                    userRole={user?.role}
                    onEdit={handleOpenModal}
                    onDelete={handleDeleteProperty}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Favourites Content */}
        {activeTab === "favourites" && (
          <>
            {isFavLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-80 rounded-2xl bg-slate-200 animate-pulse"
                  />
                ))}
              </div>
            ) : isFavError ? (
              <div className="p-10 text-center text-red-500 bg-red-50 rounded-2xl border border-red-200">
                Failed to load favourites. Please try again.
              </div>
            ) : favourites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <h3 className="text-xl font-bold text-slate-700 mb-2">
                  No favourites yet
                </h3>
                <p className="text-slate-500 max-w-sm mb-6 text-sm">
                  You haven't added any properties to your favourites yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favourites.map((property) => (
                  <DashboardPropertyCard
                    key={property._id}
                    property={property}
                    variant="favourites"
                    userRole={user?.role}
                    onRemoveFavourite={handleRemoveFavourite}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Add/Edit Property Modal */}
        <PropertyModal
          isOpen={isModalOpen}
          editingPropertyId={editingPropertyId}
          formData={formData}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          onChange={handleChange}
          isLoading={isCreating || isUpdating}
        />
      </div>
    </div>
  );
}
