import { forwardRef } from 'react'

const Select = forwardRef(function Select(
  { label, error, options = [], className = '', ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <select
        ref={ref}
        className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? 'border-red-400' : 'border-gray-300'}
          ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
})

export default Select
