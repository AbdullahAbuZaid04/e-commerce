import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext.js";
import { useToast } from "../contexts/ToastContext.js";
import { useProducts } from "../contexts/ProductContext.js";

import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
  Alert,
  IconButton,
  Paper,
  Fade,
  Breadcrumbs,
  Link as MuiLink,
  Stack,
  Divider,
  Tooltip,
} from "@mui/material";

import {
  ShoppingCart as ShoppingCartIcon,
  Check as CheckIcon,
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Home as HomeIcon,
  Store as StoreIcon,
  LocalOffer as LocalOfferIcon,
  Inventory2 as InventoryIcon,
  Star as StarIcon,
} from "@mui/icons-material";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity, updateQuantity } = useCart();
  const { success, error } = useToast();
  const { getProductById } = useProducts();

  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 15, textAlign: "center" }}>
        <InventoryIcon sx={{ fontSize: 100, color: "divider", mb: 4 }} />
        <Alert
          severity="error"
          variant="filled"
          sx={{ mb: 4, borderRadius: "16px" }}
        >
          عذراً، لم يتم العثور على هذا المنتج.
        </Alert>
        <Button
          startIcon={<ArrowBackIcon sx={{ ml: 1, mr: 0 }} />}
          onClick={() => navigate("/products")}
          variant="contained"
          size="large"
          sx={{ borderRadius: "14px", px: 6, fontWeight: 900 }}
        >
          العودة للمنتجات
        </Button>
      </Container>
    );
  }

  // Derived values
  const cartQuantity = getItemQuantity(product.id);
  const availableStock = product.stockQuantity - cartQuantity;
  const isOutOfStock = availableStock <= 0;
  const itemInCart = isInCart(product.id);

  const handleCartAction = () => {
    const newQuantityNeeded = itemInCart ? cartQuantity + quantity : quantity;
    if (newQuantityNeeded > product.stockQuantity) {
      error(`لا يمكن تجاوز الكمية المتوفرة (${product.stockQuantity} قطعة)`);
      return;
    }
    if (itemInCart) {
      updateQuantity(product.id, newQuantityNeeded);
      success(`تم تحديث كمية "${product.name}" في السلة`);
    } else {
      addToCart(product, quantity);
      success(`تم إضافة "${product.name}" إلى سلة التسوق`);
    }
    setQuantity(1);
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }} dir="rtl">
      <Container
        maxWidth="xl"
        sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 } }}
      >
        {/* ---- BREADCRUMB ---- */}
        <Box sx={{ mb: 6 }}>
          <Breadcrumbs aria-label="مسار التنقل" separator="›">
            <MuiLink
              component={Link}
              to="/"
              color="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
              aria-label="الصفحة الرئيسية"
            >
              <HomeIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">الرئيسية</Typography>
            </MuiLink>
            <MuiLink
              component={Link}
              to="/products"
              color="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
              aria-label="صفحة المنتجات"
            >
              <StoreIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">المنتجات</Typography>
            </MuiLink>
            <Typography variant="body2" color="text.primary" fontWeight={700}>
              {product.name}
            </Typography>
          </Breadcrumbs>
        </Box>

        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          {/* ---- IMAGE COLUMN ---- */}
          <Grid item xs={12} md={5}>
            <Fade in={true} timeout={800}>
              <Box
                sx={{
                  borderRadius: "32px",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.10)",
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                  height: { xs: 320, md: 500 },
                  bgcolor: "#fcfcfc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 4,
                }}
              >
                <Box
                  component="img"
                  src={product.image || require("../assets/store.webp")}
                  alt={`صورة المنتج: ${product.name}`}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={420}
                  onError={(e) => {
                    e.currentTarget.src = require("../assets/store.webp");
                    e.currentTarget.onerror = null;
                  }}
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                    display: "block",
                    borderRadius: "16px",
                  }}
                />
              </Box>
            </Fade>
          </Grid>

          {/* ---- DETAILS COLUMN ---- */}
          <Grid item xs={12} md={7}>
            <Fade in={true} timeout={1000}>
              <Box>
                {/* Category Tag */}
                <Chip
                  icon={<LocalOfferIcon />}
                  label={product.categoryName}
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 3, fontWeight: 800, borderRadius: "12px", px: 1.5 }}
                />

                {/* Product Name */}
                <Typography
                  variant="h3"
                  fontWeight={900}
                  color="text.primary"
                  gutterBottom
                  sx={{
                    lineHeight: 1.2,
                    fontSize: { xs: "2rem", md: "2.8rem" },
                  }}
                >
                  {product.name}
                </Typography>

                {/* Rating */}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}
                >
                  <Rating
                    value={product.averageRating || 5}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={700}
                  >
                    ({product.averageRating || 5}/5 – تقييم ممتاز)
                  </Typography>
                </Box>

                {/* Price & Stock */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: "20px",
                    bgcolor: "#F8FAFC",
                    border: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={700}
                      display="block"
                      mb={0.5}
                    >
                      السعر الحالي
                    </Typography>
                    <Typography
                      variant="h2"
                      fontWeight={900}
                      color="primary.main"
                      sx={{ lineHeight: 1.1 }}
                    >
                      {product.price} $
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Stack
                      direction="row"
                      gap={1}
                      alignItems="center"
                      justifyContent="flex-end"
                      mb={1}
                    >
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          bgcolor:
                            availableStock > 0 ? "success.main" : "error.main",
                        }}
                      />
                      <Typography
                        variant="body2"
                        color={
                          availableStock > 0 ? "success.main" : "error.main"
                        }
                        fontWeight={900}
                      >
                        {availableStock > 0 ? "متوفر في المخزن" : "نفذ المخزون"}
                      </Typography>
                    </Stack>
                    {availableStock > 0 && (
                      <Typography
                        variant="h5"
                        fontWeight={800}
                        color="text.primary"
                      >
                        {availableStock}{" "}
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          قطعة متبقية
                        </Typography>
                      </Typography>
                    )}
                  </Box>
                </Paper>

                {/* Description */}
                <Box sx={{ mb: 5 }}>
                  <Typography
                    variant="h6"
                    fontWeight={900}
                    gutterBottom
                    color="text.primary"
                  >
                    وصف المنتج
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.9,
                      color: "text.secondary",
                      fontSize: "1.05rem",
                    }}
                  >
                    {product.description}
                  </Typography>
                </Box>

                {/* Quantity Picker + CTA */}
                <Box sx={{ mb: 4 }}>
                  <Grid container spacing={3} alignItems="center">
                    {/* Quantity Selector */}
                    <Grid item xs={12} sm={5}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.5,
                          borderRadius: "16px",
                          border: "1px solid",
                          borderColor: "divider",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          bgcolor: "background.paper",
                        }}
                      >
                        <Tooltip title="تقليل الكمية" arrow>
                          <span>
                            <IconButton
                              onClick={() =>
                                setQuantity((q) => Math.max(1, q - 1))
                              }
                              disabled={quantity <= 1 || isOutOfStock}
                              size="small"
                              aria-label="تقليل الكمية"
                              sx={{
                                bgcolor: "rgba(0,0,0,0.04)",
                                "&:hover": {
                                  bgcolor: "error.light",
                                  color: "white",
                                },
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Typography
                          variant="h5"
                          fontWeight={900}
                          sx={{ minWidth: 40, textAlign: "center" }}
                        >
                          {quantity}
                        </Typography>
                        <Tooltip title="زيادة الكمية" arrow>
                          <span>
                            <IconButton
                              onClick={() => setQuantity((q) => q + 1)}
                              disabled={
                                quantity >= availableStock || isOutOfStock
                              }
                              size="small"
                              aria-label="زيادة الكمية"
                              sx={{
                                bgcolor: "rgba(0,0,0,0.04)",
                                "&:hover": {
                                  bgcolor: "success.light",
                                  color: "white",
                                },
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Paper>
                    </Grid>

                    {/* Add to Cart Button */}
                    <Grid item xs={12} sm={7}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={
                          itemInCart ? (
                            <CheckIcon sx={{ ml: 1, mr: 0 }} />
                          ) : (
                            <ShoppingCartIcon sx={{ ml: 1, mr: 0 }} />
                          )
                        }
                        onClick={handleCartAction}
                        disabled={isOutOfStock}
                        aria-label={
                          isOutOfStock
                            ? "المنتج غير متوفر"
                            : itemInCart
                              ? "تحديث الكمية في السلة"
                              : "إضافة للسلة"
                        }
                        sx={{
                          py: 2.5,
                          borderRadius: "16px",
                          fontWeight: 900,
                          fontSize: "1.1rem",
                          boxShadow: isOutOfStock
                            ? "none"
                            : "0 10px 30px rgba(25, 118, 210, 0.3)",
                        }}
                      >
                        {isOutOfStock
                          ? "نفذ المخزون"
                          : itemInCart
                            ? "تحديث الكمية في السلة"
                            : "إضافة إلى السلة"}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

                {/* Already In Cart Notice */}
                {itemInCart && (
                  <Alert
                    severity="info"
                    variant="outlined"
                    sx={{ borderRadius: "14px", mb: 3 }}
                  >
                    لديك <strong>{cartQuantity}</strong> من هذا المنتج في سلتك
                    حالياً.
                  </Alert>
                )}
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetails;
