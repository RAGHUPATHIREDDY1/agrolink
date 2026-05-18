import { createContext, useContext, useEffect, useState } from 'react';
import { loadFromStorage, saveToStorage, createId } from '../services/storage.js';
import { getProducts } from '../services/api.js';

const ProductContext = createContext(null);

function normalizeProduct(raw) {
  if (!raw) return null;

  return {
    id: raw.id || createId('prod_agro_'),
    title: raw.title || raw.productName || '',
    category: raw.category || 'Fruits',
    price: raw.price ?? 0,
    currency: raw.currency || 'USD',
    quantity: raw.quantity ?? raw.stock ?? 0,
    image: raw.image || raw.imageUrl || raw.images?.[0] || '',
    description: raw.description || '',
    condition: raw.condition || 'New',
    status: raw.status || 'Available',
    seller: raw.seller || {
      id: raw.seller?.id || `sel_${createId('')}`,
      name: raw.sellerName || '',
      email: raw.sellerEmail || ''
    },
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString()
  };
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const stored = loadFromStorage('agrolink-products');
      if (stored && stored.length > 0) {
        setProducts(stored);
        setLoading(false);
        return;
      }

      const apiData = await getProducts();
      if (apiData) {
        const list = Array.isArray(apiData) ? apiData.map(normalizeProduct) : [normalizeProduct(apiData)];
        setProducts(list.filter(Boolean));
        saveToStorage('agrolink-products', list.filter(Boolean));
      } else {
        setProducts([]);
      }
      setLoading(false);
    }

    loadProducts();
  }, []);

  const saveProducts = (items) => {
    setProducts(items);
    saveToStorage('agrolink-products', items);
  };

  const addProduct = (product) => {
    const createdAt = new Date().toISOString();
    const newProduct = {
      ...normalizeProduct(product),
      id: product.id || createId('prod_agro_'),
      createdAt,
      updatedAt: createdAt
    };
    const next = [newProduct, ...products];
    saveProducts(next);
    return newProduct;
  };

  const editProduct = (updatedProduct) => {
    const next = products.map((item) =>
      item.id === updatedProduct.id
        ? { ...normalizeProduct(updatedProduct), updatedAt: new Date().toISOString() }
        : item
    );
    saveProducts(next);
  };

  const deleteProduct = (id) => {
    const next = products.filter((item) => item.id !== id);
    saveProducts(next);
  };

  const getProductById = (id) => products.find((item) => item.id === id);

  const filterByCategory = (category) =>
    products.filter((item) => item.category.toLowerCase() === category.toLowerCase());

  return (
    <ProductContext.Provider value={{ products, loading, addProduct, editProduct, deleteProduct, getProductById, filterByCategory }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
