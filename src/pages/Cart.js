import React from "react";
import { useCart } from "../contexts/CartContext.js";
import { useToast } from "../contexts/ToastContext.js";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Grid,
  Divider,
  Avatar,
  Container,
  Chip,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";

import {
  Delete as DeleteIcon,
  ShoppingBag as ShoppingBagIcon,
  Payment as PaymentIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ArrowBack as ArrowBackIcon,
  DeleteForever as DeleteForeverIcon,
} from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Cart = () => {
  const {
    items,
    totalItems,
    totalPrice,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const { success, error } = useToast();
  const navigate = useNavigate();

  const [openClearDialog, setOpenClearDialog] = React.useState(false);

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    success(`تم حذف "${productName}" من السلة`);
  };

  const handleIncreaseQuantity = (productId, currentQuantity, stockLimit) => {
    if (currentQuantity >= stockLimit) {
      error(`لا يمكن تجاوز الكمية المتوفرة (${stockLimit} قطعة)`);
      return;
    }
    updateQuantity(productId, currentQuantity + 1);
    success("تم زيادة الكمية");
  };

  const handleDecreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity <= 1) {
      removeFromCart(productId);
      success("تم إزالة المنتج من السلة");
    } else {
      updateQuantity(productId, currentQuantity - 1);
      success("تم تقليل الكمية");
    }
  };

  const handleClearCart = () => {
    clearCart();
    success("تم تفريغ السلة بنجاح");
    setOpenClearDialog(false);
  };

  const formatPrice = (value) =>
    (value || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // --- EMPTY STATE ---
  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 12 }} dir="rtl">
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: 3,
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 120, color: "divider" }} />
          <Typography variant="h4" fontWeight={900} color="text.primary">
            سلة التسوق فارغة
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 500, lineHeight: 1.8 }}
          >
            يبدو أنك لم تضف أي منتجات بعد. ابدأ رحلة تسوقك الآن واكتشف تشكيلتنا
            الرائعة.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/products"
            size="large"
            startIcon={<ShoppingBagIcon sx={{ ml: 1, mr: 0 }} />}
            sx={{
              borderRadius: "16px",
              px: 4,
              py: 2,
              fontSize: "1.1rem",
              fontWeight: 900,
            }}
            aria-label="الانتقال للتسوق"
          >
            ابدأ التسوق الآن
          </Button>
        </Box>
      </Container>
    );
  }

  // --- CART PAGE ---
  return (
    <>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }} dir="rtl">
        <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
          {/* ---- PAGE TITLE ---- */}
          <Box sx={{ mb: 6 }}>
            <Button
              startIcon={<ArrowBackIcon sx={{ ml: 1, mr: 0 }} />}
              onClick={() => navigate("/products")}
              variant="text"
              sx={{ mb: 3, fontWeight: 700, color: "text.secondary" }}
              aria-label="العودة للمنتجات"
            >
              متابعة التسوق
            </Button>
            <Typography
              variant="h3"
              fontWeight={900}
              color="text.primary"
              gutterBottom
              sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
            >
              🛒 سلة التسوق
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {items.length > 0
                ? `لديك ${items.length} منتج في سلتك (${totalItems} قطعة بالإجمالي)`
                : "سلتك فارغة"}
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 4, md: 5 }}>
            {/* ---- CART ITEMS ---- */}
            <Grid item xs={12} lg={8}>
              <Card
                sx={{
                  borderRadius: "24px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                }}
              >
                {/* Card Header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 4,
                    py: 3,
                    bgcolor: "background.default",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="h5" fontWeight={900}>
                    منتجاتك ({items.length})
                  </Typography>
                  <Tooltip title="حذف كل منتجات السلة" arrow>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<DeleteForeverIcon sx={{ ml: 1, mr: 0 }} />}
                      onClick={() => setOpenClearDialog(true)}
                      aria-label="تفريغ السلة بالكامل"
                      sx={{
                        borderRadius: "12px",
                        px: { xs: 1, md: 2.5 },
                        fontWeight: 800,
                      }}
                    >
                      تفريغ السلة
                    </Button>
                  </Tooltip>
                </Box>

                {/* Items List */}
                <CardContent sx={{ p: 0 }}>
                  {items.map((item, index) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: { xs: "wrap", sm: "nowrap" },
                        p: { xs: 3, md: 4 },
                        gap: 3,
                        borderBottom:
                          index < items.length - 1 ? "1px solid" : "none",
                        borderColor: "divider",
                        "&:hover": { bgcolor: "rgba(25, 118, 210, 0.02)" },
                      }}
                    >
                      {/* Image */}
                      <Avatar
                        src={item.image}
                        variant="rounded"
                        alt={item.name}
                        sx={{
                          width: { xs: 70, md: 90 },
                          height: { xs: 70, md: 90 },
                          cursor: "pointer",
                          borderRadius: "16px",
                          boxShadow: 2,
                          flexShrink: 0,
                        }}
                        onClick={() => navigate(`/product/${item.id}`)}
                      />

                      {/* Name & Category */}
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography
                          variant="h6"
                          fontWeight={800}
                          sx={{
                            cursor: "pointer",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            "&:hover": { color: "primary.main" },
                          }}
                          onClick={() => navigate(`/product/${item.id}`)}
                        >
                          {item.name}
                        </Typography>
                        <Chip
                          label={item.categoryName}
                          size="small"
                          variant="outlined"
                          sx={{ mt: 1, fontWeight: 700, borderRadius: "8px" }}
                        />
                      </Box>

                      {/* Controls */}
                      <Stack
                        direction={{ xs: "row", sm: "row" }}
                        gap={{ xs: 0, md: 2 }}
                        alignItems="center"
                        flexWrap={{ sm: "wrap", md: "wrap" }}
                        justifyContent="flex-start"
                      >
                        {/* Price per unit */}
                        <Box sx={{ textAlign: "center", minWidth: 80 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            سعر القطعة
                          </Typography>
                          <Typography
                            variant="body1"
                            color="primary.main"
                            fontWeight={900}
                            fontSize={{ xs: "0.8rem", md: "1rem" }}
                          >
                            {formatPrice(item.price)} $
                          </Typography>
                        </Box>

                        {/* Quantity */}
                        <Box sx={{ textAlign: "center" }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                            mb={0.5}
                          >
                            الكمية
                          </Typography>
                          <Paper
                            elevation={0}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: { xs: 0, md: 1 },
                              border: "1px solid",
                              borderColor: "divider",
                              borderRadius: "12px",
                              p: 0.5,
                            }}
                          >
                            <Tooltip title="تقليل الكمية">
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleDecreaseQuantity(item.id, item.quantity)
                                }
                                aria-label="تقليل كمية المنتج"
                                sx={{
                                  "&:hover": {
                                    bgcolor: "error.light",
                                    color: "white",
                                    transform: "scale(1)",
                                  },
                                }}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Typography
                              sx={{
                                minWidth: 28,
                                textAlign: "center",
                                fontWeight: 900,
                                fontSize: "1.1rem",
                              }}
                            >
                              {item.quantity}
                            </Typography>
                            <Tooltip title="زيادة الكمية">
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleIncreaseQuantity(
                                    item.id,
                                    item.quantity,
                                    item.stockQuantity,
                                  )
                                }
                                aria-label="زيادة كمية المنتج"
                                sx={{
                                  "&:hover": {
                                    bgcolor: "success.light",
                                    color: "white",
                                    transform: "scale(1)",
                                  },
                                }}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Paper>
                        </Box>

                        {/* Subtotal */}
                        <Box sx={{ textAlign: "center", minWidth: 90 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            الإجمالي
                          </Typography>
                          <Typography
                            variant="h6"
                            color="success.main"
                            fontWeight={900}
                            fontSize={{ xs: "0.8rem", md: "1rem" }}
                          >
                            {formatPrice(item.price * item.quantity)} $
                          </Typography>
                        </Box>

                        {/* Delete */}
                        <Tooltip title="حذف من السلة" arrow>
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveItem(item.id, item.name)}
                            aria-label={`حذف ${item.name} من السلة`}
                            sx={{
                              "&:hover": {
                                bgcolor: "error.main",
                                color: "white",
                                transform: "scale(1)",
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* ---- ORDER SUMMARY ---- */}
            <Grid item xs={12} lg={4}>
              <Card
                sx={{
                  borderRadius: "24px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.07)",
                  border: "1px solid",
                  borderColor: "divider",
                  position: { lg: "sticky" },
                  top: { lg: 100 },
                }}
              >
                <Box sx={{ px: 4, pt: 4, pb: 2 }}>
                  <Typography variant="h5" fontWeight={900} gutterBottom>
                    ملخص الطلب
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Stack spacing={2.5}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography color="text.secondary">
                        عدد المنتجات:
                      </Typography>
                      <Typography fontWeight={800}>
                        {items.length} منتج
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography color="text.secondary">
                        إجمالي القطع:
                      </Typography>
                      <Typography fontWeight={800}>
                        {totalItems} قطعة
                      </Typography>
                    </Box>
                    <Divider />
                    <Box
                      gap={1}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
                      >
                        المجموع الكلي:
                      </Typography>
                      <Typography
                        variant="h4"
                        fontWeight={900}
                        color="primary.main"
                        sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
                      >
                        {formatPrice(totalPrice)} $
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Box sx={{ px: 4, pb: 4, pt: 3 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<PaymentIcon sx={{ ml: 1, mr: 0 }} />}
                    aria-label="إتمام عملية الشراء"
                    sx={{
                      py: 2,
                      borderRadius: "16px",
                      fontSize: { xs: "1rem", md: "1.2rem" },
                      fontWeight: 900,
                    }}
                    onClick={() =>
                      navigate("/order-success", {
                        state: {
                          total: totalPrice,
                          items: items,
                        },
                      })
                    }
                  >
                    إتمام الشراء الآن
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ---- CLEAR CART DIALOG ---- */}
      <Dialog
        open={openClearDialog}
        onClose={() => setOpenClearDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "24px", p: 1 } }}
        aria-labelledby="clear-cart-dialog-title"
        aria-describedby="clear-cart-dialog-description"
      >
        <DialogTitle
          id="clear-cart-dialog-title"
          sx={{ fontWeight: 900, fontSize: "1.4rem" }}
        >
          تأكيد تفريغ السلة
        </DialogTitle>
        <DialogContent id="clear-cart-dialog-description">
          <Typography variant="body1" color="text.secondary">
            هل أنت متأكد من حذف جميع المنتجات من سلة التسوق؟ هذا الإجراء لا يمكن
            التراجع عنه.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 1, pt: 1, gap: 2 }}>
          <Button
            onClick={() => setOpenClearDialog(false)}
            variant="outlined"
            sx={{ borderRadius: "12px", px: 5, fontWeight: 800 }}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleClearCart}
            variant="contained"
            color="error"
            startIcon={<DeleteForeverIcon sx={{ ml: 1, mr: 0 }} />}
            sx={{ borderRadius: "12px", px: { xs: 1, md: 5 }, fontWeight: 900 }}
            aria-label="تأكيد تفريغ السلة"
          >
            أفرغ السلة
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cart;
