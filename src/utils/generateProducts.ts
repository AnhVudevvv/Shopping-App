import type { Product } from "../types/product.type";

const productNames = [
  "iPhone 15 Pro Max",
  "iPhone 14",
  "Samsung Galaxy S24 Ultra",
  "Samsung Galaxy A55",
  "Xiaomi Redmi Note 13",
  "OPPO Reno 11",
  "Vivo V30",
  "Realme C67",
  "MacBook Air M2",
  "MacBook Pro M3",
  "Dell XPS 13",
  "Dell Inspiron 15",
  "Asus ROG Strix G15",
  "Asus Vivobook 14",
  "Lenovo ThinkPad X1",
  "HP Pavilion 15",
  "iPad Air 5",
  "iPad Pro M2",
  "Samsung Galaxy Tab S9",
  "Xiaomi Pad 6",
  "Lenovo Tab M10",
  "Huawei MatePad",
  "Apple Watch Series 9",
  "Samsung Galaxy Watch 6",
  "Xiaomi Watch S3",
  "Huawei Watch GT 4",
  "AirPods Pro 2",
  "Sony WH-1000XM5",
  "Logitech MX Master 3S",
  "Keychron K2",
  "Anker PowerCore 20000",
  "Baseus Fast Charger 65W",
];

const descriptions = [
  "Modern design, stable performance, and suitable for everyday use.",
  "Strong configuration for study, office work, and multitasking.",
  "Long battery life, sharp display, and smooth user experience.",
  "A practical choice for students, office workers, and general users.",
  "Compact design, easy to carry, and reasonably priced.",
  "Premium product with strong performance and solid build quality.",
  "Great for entertainment, streaming, online learning, and work.",
  "Optimized for users who need durability, stability, and convenience.",
];

const imageIds = [
  101, 102, 103, 104, 105,
  201, 202, 203, 204, 205,
  301, 302, 303, 304, 305,
  401, 402, 403, 404, 405,
];

const getCategoryByName = (name: string): string => {
  const lowerName = name.toLowerCase();

  if (
    lowerName.includes("iphone") ||
    lowerName.includes("samsung galaxy s") ||
    lowerName.includes("galaxy a") ||
    lowerName.includes("xiaomi redmi") ||
    lowerName.includes("oppo") ||
    lowerName.includes("vivo") ||
    lowerName.includes("realme")
  ) {
    return "Phone";
  }

  if (
    lowerName.includes("macbook") ||
    lowerName.includes("dell") ||
    lowerName.includes("asus") ||
    lowerName.includes("lenovo thinkpad") ||
    lowerName.includes("hp")
  ) {
    return "Laptop";
  }

  if (
    lowerName.includes("ipad") ||
    lowerName.includes("tab") ||
    lowerName.includes("pad")
  ) {
    return "Tablet";
  }

  if (lowerName.includes("watch")) {
    return "Watch";
  }

  return "Accessory";
};

const getBasePriceByCategory = (category: string): number => {
  switch (category) {
    case "Phone":
      return 4000000;
    case "Laptop":
      return 10000000;
    case "Tablet":
      return 3000000;
    case "Watch":
      return 1500000;
    case "Accessory":
      return 300000;
    default:
      return 1000000;
  }
};

const getStablePrice = (category: string, index: number): number => {
  const basePrice = getBasePriceByCategory(category);
  const step = ((index * 7919) % 18) + 1;

  return basePrice + step * 500000;
};

export const generateProducts = (count: number = 1000): Product[] => {
  return Array.from({ length: count }, (_, index) => {
    const baseName = productNames[index % productNames.length];
    const category = getCategoryByName(baseName);
    const version = Math.floor(index / productNames.length) + 1;

    return {
      id: index + 1,
      name: `${baseName} Version ${version}`,
      price: getStablePrice(category, index),
      image: `https://picsum.photos/id/${
        imageIds[index % imageIds.length]
      }/300/300`,
      category,
      description: descriptions[index % descriptions.length],
    };
  });
};
