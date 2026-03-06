import React, { createContext, useContext, useState } from "react";
import { initialProducts, initialCategories } from "../data/mockData";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // جلب البيانات مباشرة من ملف mockData دون الحاجة لـ productService
  const [products] = useState(initialProducts);
  const [categories] = useState(initialCategories);

  // دالة بسيطة لجلب منتج واحد بالمعرف (بدون async)
  const getProductById = (id) => {
    return products.find(p => p.id === parseInt(id));
  };

  const value = {
    products,
    categories,
    loading: false, // دائماً false لأن البيانات جاهزة فوراً
    error: null,
    getProductById,
    featuredProducts: products.filter(p => p.isFeatured).slice(0, 8)
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
};
