// stores/productStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { immer } from "zustand/middleware/immer";

export interface Product {
  id: string;
  title: string;
  description?: string;
  rating: number;
  sizes: string;
  color: string;
  price: number;
  mrp: number;
  available: string;
  image: string;
}

interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (updatedProduct: Product) => void;
  getProductById: (id: string) => Product | undefined;
  deleteProduct: (id: string) => void;
}

const useProductStore = create<ProductStore>()(
  persist(
    immer((set, get) => ({
      products: [],
      addProduct: (product) => {
        set((state) => {
          state.products.push({ ...product, id: uuidv4() });
        });
      },
      updateProduct: (updatedProduct) => {
        set((state) => {
          const index = state.products.findIndex(
            (product: Product) => product.id === updatedProduct.id,
          );
          if (index !== -1) {
            state.products[index] = updatedProduct;
          }
        });
      },

      getProductById: (id: string) =>
        get().products.find((product) => product.id === id),
      deleteProduct: (id: string) =>
        set((state) => {
          state.products = state.products.filter(
            (product: Product) => product.id !== id,
          );
        }),
    })),
    {
      name: "product-store", // localStorage key
    },
  ),
);

export default useProductStore;
