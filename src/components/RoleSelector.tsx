
interface RoleSelectorProps {
  value: 'buyer' | 'seller' | '';
  onChange: (role: 'buyer' | 'seller') => void;
}

export default function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
        Role
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as 'buyer' | 'seller')}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-600 placeholder-slate-400 transition-all"
        required
      >
        <option value="">Select a role</option>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>
      <p className="text-xs text-slate-500 mt-1">
        {value === 'seller' 
          ? 'Sellers can create, edit, and delete properties. Buyers can only view and favorite properties.'
          : 'Buyers can browse and favorite properties.'
        }
      </p>
    </div>
  );
}
