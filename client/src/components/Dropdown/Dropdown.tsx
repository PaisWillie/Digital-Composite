type DropdownProps = {
  options: string[]
  selectedValue: string
  onSelect: (value: string) => void
}

const Dropdown = ({ options, selectedValue, onSelect }: DropdownProps) => {
  return (
    <select
      value={selectedValue}
      onChange={(e) => onSelect(e.target.value)}
      className="rounded border p-2"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
