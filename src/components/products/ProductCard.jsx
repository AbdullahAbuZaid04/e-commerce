import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext.js";
import { useToast } from "../../contexts/ToastContext.js";

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Skeleton,
  IconButton,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ProductCard = ({ product }) => {
  const {
    addToCart,
    isInCart,
    getItemQuantity,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const itemInCartQuantity = getItemQuantity(product?.id) || 0;
  const availableStock = (product?.stockQuantity || 0) - itemInCartQuantity;
  const isProductInCart = isInCart(product?.id);

  const handleProductClick = (e) => {
    if (e) e.stopPropagation();
    if (product?.id !== undefined) {
      navigate(`/product/${product.id}`);
    } else {
      error("المنتج غير صالح");
    }
  };

  const handleAddToCart = (e) => {
    if (e) e.stopPropagation();
    if (availableStock <= 0) {
      error("عذراً، لقد نفدت الكمية المتاحة");
      return;
    }
    addToCart(product, 1);
    success(`تم إضافة "${product.name}" إلى السلة`);
  };

  const handleIncreaseQuantity = (e) => {
    if (e) e.stopPropagation();
    if (availableStock <= 0) {
      error("لا يمكن إضافة المزيد");
      return;
    }
    updateQuantity(product.id, itemInCartQuantity + 1);
  };

  const handleDecreaseQuantity = (e) => {
    if (e) e.stopPropagation();
    if (itemInCartQuantity <= 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, itemInCartQuantity - 1);
    }
  };

  return (
    <Card
      sx={{
        width: { xs: 280, sm: 260, md: 280 },
        height: 480,
        display: "flex",
        flexDirection: "column",
        borderRadius: "24px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        transition: "all 0.4s ease-in-out",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
      }}
      dir="rtl"
      onClick={handleProductClick}
    >
      {/* IMAGE CONTAINER */}
      <Box
        sx={{
          height: 240,
          bgcolor: "#fcfcfc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid rgba(0,0,0,0.03)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {!imageLoaded && !imageError && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ position: "absolute", inset: 0 }}
          />
        )}

        <CardMedia
          component="img"
          image={product.image || require("../../assets/store.webp")}
          width={280}
          height={204}
          decoding="async"
          alt={product?.name || "صورة المنتج"}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            if (!imageError) {
              setImageError(true);
              e.currentTarget.src = require("../../assets/store.webp");
            }
          }}
          loading="lazy"
          sx={{
            objectFit: "contain",
            height: "85%",
            width: "85%",
            opacity: imageLoaded || imageError ? 1 : 0,
            transition: "all 0.4s ease",
            // الصورة تصبح شفافة عند لمس أي جزء من الكارت
            ".MuiCard-root:hover &": {
              opacity: 0.2,
            },
          }}
        />

        {/* VIEW OVERLAY - يظهر عند لمس الكارت */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(25, 118, 210, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "0.4s ease",
            ".MuiCard-root:hover &": { opacity: 1 },
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              p: 1.5,
              borderRadius: "50%",
              boxShadow: 3,
              display: "flex",
              transform: "translateY(20px)",
              transition: "0.4s ease",
              ".MuiCard-root:hover &": { transform: "translateY(0)" },
            }}
          >
            <VisibilityIcon color="primary" />
          </Box>
        </Box>

        {isProductInCart && (
          <Chip
            label={`في السلة: ${itemInCartQuantity}`}
            color="primary"
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              fontWeight: 700,
              zIndex: 3,
            }}
          />
        )}
      </Box>

      {/* CARD CONTENT */}
      <CardContent
        sx={{
          flexGrow: 1,
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            height: "2.4em",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            fontSize: "1rem",
            color: "text.primary",
            ".MuiCard-root:hover &": { color: "primary.main" },
          }}
        >
          {product?.name || "اسم المنتج"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            color="primary"
            sx={{
              fontWeight: 600,
              bgcolor: "rgba(59, 130, 246, 0.05)",
              px: 1.2,
              py: 0.4,
              borderRadius: "8px",
            }}
          >
            {product?.categoryName || "تصنيف"}
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            sx={{
              fontWeight: 800,
              fontSize: "1.2rem",
            }}
          >
            {product?.price} $
          </Typography>
        </Box>

        <Box sx={{ mt: "auto" }}>
          <Typography
            variant="caption"
            color={availableStock > 0 ? "success.main" : "error.main"}
            sx={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Box
              component="span"
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: availableStock > 0 ? "success.main" : "error.main",
              }}
            />
            {availableStock > 0 ? `المخزون: ${availableStock}` : "نفذ المخزون"}
          </Typography>
        </Box>
      </CardContent>

      {/* CARD ACTIONS */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        {isProductInCart ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              bgcolor: "#f8f9fa",
              borderRadius: "14px",
              p: 0.5,
              border: "1px solid #eee",
            }}
          >
            <IconButton
              size="small"
              onClick={handleDecreaseQuantity}
              sx={{
                bgcolor: "white",
                boxShadow: 1,
                "&:hover": { bgcolor: "#fee", transform: "scale(1)" },
              }}
            >
              <RemoveIcon fontSize="small" color="error" />
            </IconButton>
            <Typography fontWeight={700}>{itemInCartQuantity}</Typography>
            <IconButton
              size="small"
              onClick={handleIncreaseQuantity}
              sx={{
                bgcolor: "white",
                boxShadow: 1,
                "&:hover": { bgcolor: "#efe", transform: "scale(1)" },
              }}
            >
              <AddIcon fontSize="small" color="success" />
            </IconButton>
          </Box>
        ) : (
          <Button
            fullWidth
            variant="contained"
            disabled={availableStock <= 0}
            onClick={handleAddToCart}
            startIcon={<ShoppingCartIcon />}
            sx={{
              py: 1.2,
              borderRadius: "14px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 8px 20px rgba(59, 130, 246, 0.2)",
            }}
          >
            {availableStock > 0 ? "إضافة للسلة" : "غير متوفر"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
