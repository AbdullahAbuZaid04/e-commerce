import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext.js";
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  Paper,
  Divider,
  Chip,
  Avatar,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  ShoppingBag as ShoppingBagIcon,
} from "@mui/icons-material";

const OrderSuccess = () => {
  const { clearCart } = useCart();
  const location = useLocation();

  const orderData = location.state || {
    total: 0,
    items: [],
  };

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatPrice = (price) => {
    if (typeof price !== "number" || isNaN(price)) return "0.00";
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: { xs: 6, md: 12 } }} dir="rtl">
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: "center",
            borderRadius: "32px",
            boxShadow: "0 30px 80px rgba(0,0,0,0.06)",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          {/* SUCCESS ICON */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                bgcolor: "rgba(16, 185, 129, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 60, color: "#10B981" }} />
            </Box>
            <Typography variant="h4" fontWeight={900} color="text.primary" gutterBottom sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
              شكراً لثقتكم بنا🎉
            </Typography>
          </Box>

          <Divider sx={{ mb: 4, opacity: 0.5 }} />

          {/* ITEMS LIST */}
          {orderData.items?.length > 0 && (
            <Box sx={{ textAlign: { xs: "center", md: "right" }, mb: 4 }}>
              <Typography variant="h6" fontWeight={900} color="text.primary" sx={{ mb: 3, fontSize: { xs: "1rem", md: "1.5rem" } }}>
                ملخص المشتريات:
              </Typography>
              <Stack spacing={2}>
                {orderData.items.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1,
                      bgcolor: "rgba(0,0,0,0.02)",
                      borderRadius: "16px",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        src={item.image}
                        variant="rounded"
                        sx={{ width: 50, height: 50, borderRadius: "10px" }}
                        alt={item.name}
                      />
                      <Box>
                        <Typography variant="body2" fontWeight={800} color="text.primary" sx={{ fontSize: { xs: "0.8rem", md: "1.2rem" } }}>
                          {item.name}
                        </Typography>
                        <Chip label={`الكمية: ${item.quantity}`} size="small" sx={{ mt: 0.5, fontWeight: 700, borderRadius: "8px", fontSize: { xs: "0.6rem", md: "1rem" } }} />
                      </Box>
                    </Box>
                    <Typography fontWeight={900} color="primary.main" variant="h6" sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}>
                      {formatPrice(item.price * item.quantity)} $
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {/* TOTAL */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
              mb: 5,
              bgcolor: "text.primary",
              color: "white",
              borderRadius: "20px",
              boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}>المبلغ الإجمالي:</Typography>
            <Typography variant="h4" fontWeight={900} sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}>
              {formatPrice(orderData.total)} $
            </Typography>
          </Box>

          {/* CTA BUTTON */}
          <Button
            variant="contained"
            fullWidth
            component={Link}
            to="/products"
            size="large"
            startIcon={<ShoppingBagIcon sx={{ ml: 1, mr: 0 }} />}
            aria-label="العودة للتسوق"
            sx={{
              py: 2.2,
              borderRadius: "16px",
              fontWeight: 900,
              fontSize: "1.1rem",
            }}
          >
            التسوق من جديد
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default OrderSuccess;
