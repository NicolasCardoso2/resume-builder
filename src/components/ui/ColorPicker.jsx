const PRESET_COLORS = [
  '#2563eb', '#7c3aed', '#db2777', '#dc2626',
  '#d97706', '#059669', '#0891b2', '#475569',
  '#1d4ed8', '#6d28d9', '#be185d', '#b91c1c',
]

export default function ColorPicker({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <div className="flex items-center gap-3 flex-wrap">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            title={color}
            onClick={() => onChange(color)}
            className={`w-7 h-7 rounded-full transition-transform hover:scale-110 ring-offset-2
              ${value === color ? 'ring-2 ring-gray-600 scale-110' : ''}`}
            style={{ backgroundColor: color }}
          />
        ))}
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border border-gray-300"
          title="Cor personalizada"
        />
      </div>
    </div>
  )
}
