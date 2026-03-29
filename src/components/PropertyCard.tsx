import { Bookmark, Image } from "lucide-react";
import { Property } from "../store/api/propertyApi";

interface PropertyCardProps {
  property: Property;
  isFavourited: boolean;
  onBookmark: (e: React.MouseEvent, propertyId: string) => void;
}

export default function PropertyCard({
  property,
  isFavourited,
  onBookmark,
}: PropertyCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300 group cursor-pointer">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        {property.propertyImage ? (
          <img
            src={property.propertyImage}
            className="w-full h-full object-cover group-hover:scale-105 duration-500"
            alt={property.propertyTitle}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-25">
              <Image />
            </span>
          </div>
        )}

        {/* Bookmark button */}
        <button
          onClick={(e) => onBookmark(e, property._id)}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all text-sm font-bold"
          title={isFavourited ? "Remove bookmark" : "Bookmark this property"}
        >
          <Bookmark
            color={isFavourited ? "#ef4444" : "white"}
            fill={isFavourited ? "#ef4444" : "none"}
            size={20}
          />
        </button>

        {/* Type badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-800/80 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider">
          {property.propertyType || "House"}
        </div>
      </div>

      {/* Details */}
      <div className="p-5">
        <h3
          className="text-base font-bold text-slate-800 mb-1 truncate"
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

        {/* Stats */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100 text-sm text-slate-600 flex-wrap">
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

        <h3 className="text-xl font-extrabold text-slate-800">
          ${property.propertyPrice?.toLocaleString() || "N/A"}
        </h3>
      </div>
    </div>
  );
}
