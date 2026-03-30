import { Image } from "lucide-react";
import { Property } from "../types/property.types.d";

interface DashboardPropertyCardProps {
  property: Property;
  variant: "properties" | "my-properties" | "favourites";
  onEdit?: (property: Property) => void;
  onDelete?: (propertyId: string) => void;
  onRemoveFavourite?: (propertyId: string) => void;
}

export default function DashboardPropertyCard({
  property,
  variant,
  onEdit,
  onDelete,
  onRemoveFavourite,
}: DashboardPropertyCardProps) {
  const showActions = variant === "my-properties";
  const showRemoveFavourite = variant === "favourites";

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:-translate-y-0.5 transition-all duration-300 group flex flex-col cursor-pointer">
      <div className="relative h-48 bg-gradient-to-br from-indigo-50 to-blue-100 overflow-hidden shrink-0">
        {property.propertyImage ? (
          <img
            src={property.propertyImage}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={property.propertyTitle}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Image className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow">
          {property.propertyType || "House"}
        </div>
        {showRemoveFavourite && onRemoveFavourite && (
          <button
            onClick={() => onRemoveFavourite(property._id)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-red-200 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow text-xs font-bold flex items-center justify-center"
            title="Remove from favourites"
          >
            ✕
          </button>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3
          className="text-base font-bold text-slate-800 mb-1 line-clamp-2 min-h-[48px]"
          title={property.propertyTitle}
        >
          {property.propertyTitle}
        </h3>
        <p
          className="text-sm text-slate-500 truncate mb-4"
          title={property.propertyAddress}
        >
          {property.propertyAddress}
        </p>
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100 text-sm text-slate-600">
          <span className="bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1 font-medium whitespace-nowrap">
            {property.propertyBeds || 0} Beds
          </span>
          <span className="bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1 font-medium whitespace-nowrap">
            {property.propertyBaths || 0} Baths
          </span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-xl font-extrabold text-indigo-600">
            ${property.propertyPrice?.toLocaleString() || "N/A"}
          </span>
          {showActions && (
            <div className="flex gap-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(property)}
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
                  title="Edit property"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(property._id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                  title="Delete property"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
