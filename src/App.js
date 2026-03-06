import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext.js";
import { ToastProvider } from "./contexts/ToastContext.js";
import { ProductProvider } from "./contexts/ProductContext.js";

import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import Home from "./pages/Home.js"; // keep Home eager for fastest LCP on / route
const Products = lazy(() => import("./pages/Products.js"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.js"));
const Cart = lazy(() => import("./pages/Cart.js"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess.js"));
const NotFound = lazy(() => import("./pages/NotFound.js"));

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <ToastProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/products"
                element={
                  <Suspense
                    fallback={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: 40,
                        }}
                      >
                        <div>Loading...</div>
                      </div>
                    }
                  >
                    <Products />
                  </Suspense>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <Suspense
                    fallback={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: 40,
                        }}
                      >
                        <div>Loading...</div>
                      </div>
                    }
                  >
                    <ProductDetails />
                  </Suspense>
                }
              />
              <Route
                path="/cart"
                element={
                  <Suspense
                    fallback={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: 40,
                        }}
                      >
                        <div>Loading...</div>
                      </div>
                    }
                  >
                    <Cart />
                  </Suspense>
                }
              />
              <Route
                path="/order-success"
                element={
                  <Suspense
                    fallback={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: 40,
                        }}
                      >
                        <div>Loading...</div>
                      </div>
                    }
                  >
                    <OrderSuccess />
                  </Suspense>
                }
              />
              <Route
                path="/404"
                element={
                  <Suspense
                    fallback={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: 40,
                        }}
                      >
                        <div>Loading...</div>
                      </div>
                    }
                  >
                    <NotFound />
                  </Suspense>
                }
              />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ToastProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
