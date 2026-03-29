import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/slices/authSlice';
import { useGetFavouritesQuery, useAddFavouriteMutation } from '../store/api/favouriteApi';
import { Property } from '../store/api/propertyApi';
import toast from 'react-hot-toast';
import { RootState } from '../store/store';

export default function Dashboard() {
  const user = useSelector((state: RootState) => selectCurrentUser(state));
  const { data: favouritesRes, isLoading, isError } = useGetFavouritesQuery();
  const [toggleFavourite] = useAddFavouriteMutation();

  const [isModalOpen, setModalOpen] = useState(false);
  const [propertyIdInput, setPropertyIdInput] = useState('');

  const favourites: Property[] = favouritesRes?.data || [];

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyIdInput.trim()) return;
    try {
      await toggleFavourite({ propertyId: propertyIdInput.trim() }).unwrap();
      toast.success('Bookmarked successfully!');
      setModalOpen(false);
      setPropertyIdInput('');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update favourites');
    }
  };

  const handleRemove = async (propertyId: string) => {
    if (!window.confirm('Remove this bookmark?')) return;
    try {
      await toggleFavourite({ propertyId }).unwrap();
      toast.success('Removed from favourites');
    } catch {
      toast.error('Failed to remove bookmark');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Hero Card */}
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-8 sm:p-12 mb-10 shadow-xl shadow-indigo-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <p className="text-indigo-100 text-sm font-semibold uppercase tracking-widest mb-2">Buyer Portal</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                Welcome back, <span className="text-cyan-200">{user?.firstName} {user?.lastName}</span>
              </h1>
              <p className="text-indigo-100 text-base">
                {user?.email} &nbsp;&middot;&nbsp;
                <span className="capitalize font-semibold">{user?.role}</span>
              </p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm border border-white/30 px-8 py-5 rounded-2xl flex flex-col items-center min-w-[130px]">
              <span className="text-indigo-100 text-xs font-semibold uppercase tracking-widest mb-1">Saved</span>
              <span className="text-5xl font-black text-white">{isLoading ? '—' : favourites.length}</span>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">My Favourites</h2>
            <p className="text-slate-500 text-sm mt-0.5">Properties you have bookmarked</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-indigo-200 text-sm"
          >
            + Add Bookmark
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <div className="p-10 text-center text-red-500 bg-red-50 rounded-2xl border border-red-200">
            Failed to load favourites. Please try again.
          </div>
        ) : favourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-5 text-3xl">🏠</div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No bookmarks yet</h3>
            <p className="text-slate-500 max-w-sm mb-6 text-sm">
              You haven't saved any properties yet. Go to the home page to browse and bookmark properties.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all text-sm"
            >
              + Add by Property ID
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favourites.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-indigo-50 to-blue-100 overflow-hidden">
                  {property.propertyImage ? (
                    <img
                      src={property.propertyImage}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={property.propertyTitle}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl opacity-30">🏡</span>
                    </div>
                  )}
                  {/* Type badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow">
                    {property.propertyType || 'House'}
                  </div>
                  {/* Remove button */}
                  <button
                    onClick={() => handleRemove(property._id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow text-xs font-bold flex items-center justify-center"
                    title="Remove from favourites"
                  >
                    ✕
                  </button>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-800 mb-1 truncate" title={property.propertyTitle}>
                    {property.propertyTitle}
                  </h3>
                  <p className="text-sm text-slate-500 truncate mb-4" title={property.propertyAddress}>
                    {property.propertyAddress}
                  </p>

                  {/* Stats row */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100 text-sm text-slate-600">
                    {property.propertyBeds != null && (
                      <span className="bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1 font-medium">
                        {property.propertyBeds} Beds
                      </span>
                    )}
                    {property.propertyBaths != null && (
                      <span className="bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1 font-medium">
                        {property.propertyBaths} Baths
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-extrabold text-indigo-600">
                      ${property.propertyPrice?.toLocaleString() || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Bookmark Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-1">Bookmark Property</h3>
              <p className="text-slate-500 text-sm mb-6">
                Enter the Property ID to save it to your favourites.
              </p>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Property ID *
                  </label>
                  <input
                    required
                    placeholder="e.g. prop-001 or 65f3a..."
                    value={propertyIdInput}
                    onChange={e => setPropertyIdInput(e.target.value)}
                    className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
                    autoFocus
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-indigo-200 text-sm"
                  >
                    Save Bookmark
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
