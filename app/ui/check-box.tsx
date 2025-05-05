interface CheckboxProps {
  id: string
  name: string
  label: string
  className?: string
}

export function Checkbox({ id, name, label, className = "" }: CheckboxProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={id}
        name={name}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-600 bg-[#1d1d21] text-[#6b61d2] focus:ring-[#6b61d2]"
      />
      <label htmlFor={id} className="ml-2 text-sm text-gray-300">
        {label}
      </label>
    </div>
  )
}
