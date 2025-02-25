interface Props {
  onSelect: (category: string) => void;
  availableCategories: string[]
}

export function ExpenseFilter({ onSelect, availableCategories }: Props) {
  // te opcje nie powinny być zahardcodowane
  return (
    <select
      id="mySelect"
      className="form-select mb-3"
      onChange={(event) => onSelect(event.target.value)}
    >
      <option value="">All Categories</option>
      {availableCategories.map((category) => <option key={category} value={category}>{category}</option>)}
    </select>
  );
}
