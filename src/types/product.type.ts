import type { CSSProperties } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}
export interface ProductCellProps extends ProductCellData {
  ariaAttributes: {
    "aria-colindex": number;
    role: "gridcell";
  };
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
}


export interface ProductCellData {
  columnCount: number;
  onAddToCart: (product: Product) => void;
  products: Product[];
}
