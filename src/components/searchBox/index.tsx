interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  return (
    <div className="w-full max-w-xl">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="
          w-full
          rounded-xl
          border
          border-[var(--border)]
          bg-[var(--surface)]
          px-4
          py-3
          text-[var(--text-h)]
          outline-none
          transition
          placeholder:text-[var(--text)]
          focus:border-[var(--accent)]
          focus:ring-2
          focus:ring-[var(--accent-bg)]
        "
      />
    </div>
  );
};

export default SearchBox;
