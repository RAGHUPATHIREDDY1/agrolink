import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Market from './pages/Market.jsx';
import Products from './pages/Products.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';
import SellerDashboard from './pages/SellerDashboard.jsx';
import AddProduct from './pages/AddProduct.jsx';
import MyProducts from './pages/MyProducts.jsx';
import NotFound from './pages/NotFound.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-white">
                <Navbar />
                <main className="px-4 py-6 md:px-8 lg:px-12">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/market" element={<Market />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/category/:name" element={<CategoryPage />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<ProtectedRoute />}>
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/orders" element={<Orders />} />
                    </Route>

                    <Route element={<ProtectedRoute requiredRole="seller" />}>
                      <Route path="/seller/dashboard" element={<SellerDashboard />} />
                      <Route path="/seller/add-product" element={<AddProduct />} />
                      <Route path="/seller/products" element={<MyProducts />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
