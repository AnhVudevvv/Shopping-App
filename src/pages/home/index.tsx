import { useCallback, useMemo, useState } from "react";
import ProductCard from "../../components/productCart";
import { generateProducts } from "../../utils/generateProducts";
import type { Product, ProductCellData, ProductCellProps } from "../../types/product.type";
import { useDebounce } from "../../hooks/useDebounce";
import SearchBox from "../../components/searchBox";
import { Grid } from "react-window";
import { useResponsiveColumns } from "../../hooks/useResponsiveColumns";
import { sizeList } from "../../constants/grid";
import { useCart } from "../../hooks/useCart";
import { useUser } from "../../hooks/useUser";

const ProductCell = ({
  ariaAttributes,
  columnCount,
  columnIndex,
  onAddToCart,
  products,
  rowIndex,
  style,
}: ProductCellProps) => {
  const productIndex = rowIndex * columnCount + columnIndex;
  const product = products[productIndex];

  if (!product) return null;

  return (
    <div {...ariaAttributes} style={{ ...style, padding: sizeList[2] / 2 }}>
      <ProductCard product={product} onAddToCart={onAddToCart} />
    </div>
  );
};

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { wrapperRef, columnCount } = useResponsiveColumns();
  const products = useMemo(() => generateProducts(1000), []);
  const debouncedSearch = useDebounce(search, 500);
  const { addProduct } = useCart();
  const { user } = useUser();

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((product) => product.category)))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch);
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearch, products, selectedCategory]);

  const handleAddToCart = useCallback((product: Product) => {

    if (!user) {
      alert("Please log in to add products to the cart.");
      return;
    }
    addProduct(product);
    alert(`${product.name} has been added to the cart!`);
  }, [addProduct, user]);

  const rowCount = Math.ceil(filteredProducts.length / columnCount);

  const rowProps = useMemo(
    () => ({
      columnCount,
      onAddToCart: handleAddToCart,
      products: filteredProducts,
    }),
    [columnCount, filteredProducts, handleAddToCart]
  );


  return (
    <div className="max-w-7xl mx-auto p-6 bg-[var(--bg)]">
      <div className="mb-6 flex justify-center">
        <SearchBox
          value={search}
          onChange={setSearch}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <div ref={wrapperRef}>
        {filteredProducts.length > 0 ? (
          <Grid<ProductCellData>
            cellComponent={ProductCell}
            cellProps={rowProps}
            columnCount={columnCount}
            columnWidth={`${100 / columnCount}%`}
            rowCount={rowCount}
            rowHeight={sizeList[1]}
            style={{ height: sizeList[0], width: "100%" }}
          />
        ) : (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-12 text-center text-[var(--text)]">
            No products match your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
