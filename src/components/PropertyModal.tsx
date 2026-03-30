import { Property } from '../types/property.types.d';

interface PropertyModalProps {
  isOpen: boolean;
  editingPropertyId: string | null;
  formData: Partial<Property>;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isLoading?: boolean;
}

export default function PropertyModal({
  isOpen,
  editingPropertyId,
  formData,
  onClose,
  onSubmit,
  onChange,
  isLoading = false
}: PropertyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-slate-800 mb-1">
          {editingPropertyId ? "Edit Property" : "Add Property"}
        </h3>
        <p className="text-slate-500 text-sm mb-6">
          Fill in details below to{" "}
          {editingPropertyId ? "update" : "create"} property listing.
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Title *
            </label>
            <input
              required
              name="propertyTitle"
              placeholder="e.g. Modern Family Home"
              value={formData.propertyTitle || ''}
              onChange={onChange}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Address *
            </label>
            <input
              required
              name="propertyAddress"
              placeholder="e.g. 123 Main St, City, ST 12345"
              value={formData.propertyAddress || ''}
              onChange={onChange}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Price ($) *
              </label>
              <input
                required
                type="number"
                name="propertyPrice"
                min="0"
                value={formData.propertyPrice || ''}
                onChange={onChange}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Property Type
              </label>
              <select
                name="propertyType"
                value={formData.propertyType || ''}
                onChange={onChange}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
              >
                <option value="">Select a type...</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Beds
              </label>
              <input
                type="number"
                name="propertyBeds"
                min="0"
                value={formData.propertyBeds || ''}
                onChange={onChange}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Baths
              </label>
              <input
                type="number"
                name="propertyBaths"
                min="0"
                step="0.5"
                value={formData.propertyBaths || ''}
                onChange={onChange}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Image URL
            </label>
            <input
              name="propertyImage"
              placeholder="https://example.com/image.jpg"
              value={formData.propertyImage || ''}
              onChange={onChange}
              className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-indigo-200 text-sm"
            >
              {editingPropertyId ? "Save Changes" : "Create Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
