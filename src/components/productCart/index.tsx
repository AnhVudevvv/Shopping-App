import React from "react";
import type { Product } from "../../types/product.type";
import { formatCurrency } from "../../utils/formatCurrency";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({
  product,
  onAddToCart,
}: ProductCardProps) => {
  return (
    <div
      className="
        h-full
        w-full
        rounded-2xl
        overflow-hidden
        border
        border-[var(--border)]
        bg-[var(--surface)]
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
        flex
        flex-col
      "
    >
      <img
        src={product.image}
        alt={product.name}
        className="
          w-full
          h-[220px]
          object-cover
        "
        onError={(e) => {
          e.currentTarget.src =
            "https://placehold.co/300x300?text=No+Image";
        }}
      />

      <div className="p-4 text-start flex flex-col gap-1  flex-1">
        <h3
          className="
            text-lg
            font-semibold
            text-[var(--text-h)]
            line-clamp-1
          "
        >
          {product.name}
        </h3>

        <p
          className="
            text-sm
            text-[var(--text)]
          "
        >
          Category:  {product.category}
        </p>

        <p
          className="
            text-sm
            text-[var(--text)]
            line-clamp-3
            flex-1
          "
        >
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span
            className="
              text-xl
              font-bold
              text-[var(--danger)]
            "
          >
            {formatCurrency(product.price)}
          </span>

          <button
            onClick={() => onAddToCart(product)}
            className="
              px-4
              py-2
              rounded-lg
              bg-[var(--accent)]
              text-[var(--button-text)]
              text-sm
              font-medium
              hover:opacity-80
              active:scale-95
              transition-all
            "
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
