interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const SearchBox = ({
  value,
  onChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: SearchBoxProps) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-sm sm:max-w-4xl sm:p-4">
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
          bg-[var(--bg)]
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

      <fieldset className="min-w-0">
        <legend className="mb-2 px-1 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text)]">
          Category
        </legend>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onCategoryChange(category)}
                className={`
                  shrink-0
                  rounded-full
                  border
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[var(--accent-bg)]
                  ${
                    isSelected
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--button-text)] shadow-sm"
                      : "border-[var(--border)] bg-[var(--bg)] text-[var(--text-h)] hover:border-[var(--accent-border)] hover:bg-[var(--accent-bg)]"
                  }
                `}
              >
                {category === "All" ? "All categories" : category}
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
};

export default SearchBox;
