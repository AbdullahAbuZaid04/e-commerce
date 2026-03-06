import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Box,
  Grid,
  TextField,
  CircularProgress,
  Typography,
  Button,
  Container,
  Alert,
  Stack,
  Paper,
  Grow,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import {
  Search as SearchIcon,
  ChevronRight,
  ChevronLeft,
  RestartAlt as RestartAltIcon,
} from "@mui/icons-material";
import { useProducts } from "../contexts/ProductContext.js";
import ProductCard from "../components/products/ProductCard.jsx";

const Products = () => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [page, setPage] = useState(1);

  const productsPerPage = 8;

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((p) => p.categoryName).filter(Boolean)),
    ];
    return ["الكل", ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (selectedCategory !== "الكل") {
      filtered = filtered.filter((p) => p.categoryName === selectedCategory);
    }
    return filtered;
  }, [searchTerm, selectedCategory, products]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory]);

  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const productsRef = useRef(null);

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      productsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const goToPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      productsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 15, textAlign: "center" }}>
        <CircularProgress size={70} thickness={5} />
        <Typography
          variant="h6"
          sx={{ mt: 3, color: "text.secondary", fontWeight: 700 }}
        >
          جاري تحميل المنتجات...
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        pb: 10,
      }}
      dir="rtl"
    >
      {/* ---------- HEADER SECTION ---------- */}
      <Box
        sx={{
          pt: 10,
          pb: 4,
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            fontWeight={900}
            color="text.primary"
            gutterBottom
            sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
          >
            استعرض <span style={{ color: "#1976d2" }}>تشكيلتنا</span>
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: "auto",
              mb: 6,
              fontWeight: 400,
              opacity: 0.8,
              fontSize: { xs: "1rem", md: "1.2rem" },
            }}
          >
            مجموعة مختارة بعناية من أفضل المنتجات العالمية بجودة استثنائية تصلك
            أينما كنت.
          </Typography>

          {/* ---------- SEARCH & FILTERS ---------- */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3.5 },
              borderRadius: "28px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              mb: 8,
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }} // البحث يمين والتصنيفات يسار في الكمبيوتر
              gap={4}
              alignItems="center"
              sx={{
                width: "100%",
                fontFamily: "'', sans-serif",
              }}
            >
              {/* قسم البحث - يأخذ مساحة أكبر */}
              <Box sx={{ flex: 1.5, width: "100%" }}>
                <TextField
                  fullWidth
                  placeholder="ابحث عن اسم المنتج، التصنيف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="primary" sx={{ ml: 1, mr: 0 }} />{" "}
                        {/* ml بدلاً من mr للـ RTL */}
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: "20px",
                      bgcolor: "white",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
                      "& fieldset": { border: "1px solid #E2E8F0" },
                      "&:hover fieldset": { borderColor: "primary.main" },
                      height: 60,
                    },
                  }}
                />
              </Box>

              {/* قسم التصنيفات - عرض أفقي مرن */}
              <Box sx={{ flex: 2, width: "100%", overflow: "hidden" }}>
                <Stack
                  direction="row"
                  gap={{ xs: 1, md: 1.5 }}
                  alignItems="center"
                  justifyContent={{ xs: "center", md: "flex-start" }}
                  sx={{
                    overflowX: "auto",
                  }}
                >
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      variant={selectedCategory === cat ? "contained" : "text"} // استخدام text يعطي مظهر أنظف
                    >
                      {cat}
                    </Button>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Container>
      </Box>

      {/* ---------- PRODUCTS CONTENT ---------- */}
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {error && (
          <Alert
            severity="error"
            variant="filled"
            sx={{ mb: 6, borderRadius: "20px", maxWidth: 600, mx: "auto" }}
          >
            {error}
          </Alert>
        )}

        {!error && currentProducts.length > 0 ? (
          <Box ref={productsRef}>
            <Box
              sx={{
                mb: 6,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: { xs: 2, md: 10 },
              }}
            >
              <Typography
                variant="h6"
                fontWeight={800}
                color="text.primary"
                sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                fontSize={{ xs: "1rem", md: "1.3rem" }}
              >
                قائمة المنتجات
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "20px",
                    fontWeight: 700,
                  }}
                  fontSize={"0.8rem"}
                >
                  {filteredProducts.length} منتج
                </Typography>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={700}
                fontSize={{ xs: "0.8rem", md: "1rem" }}
              >
                الصفحة {page} / {totalPages}
              </Typography>
            </Box>

            <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
              {currentProducts.map((product, index) => (
                <Grid item key={product.id}>
                  <Grow in={true} timeout={index * 100}>
                    <Box>
                      <ProductCard product={product} />
                    </Box>
                  </Grow>
                </Grid>
              ))}
            </Grid>

            {/* ---------- PAGINATION ---------- */}
            {totalPages > 1 && (
              <Stack
                direction="row"
                gap={2}
                justifyContent="center"
                sx={{ mt: 10 }}
              >
                <Tooltip title="الصفحة السابقة">
                  <span>
                    <Button
                      onClick={goToPrevPage}
                      disabled={page === 1}
                      variant="outlined"
                      startIcon={<ChevronRight />}
                      sx={{
                        borderRadius: "14px",
                        px: { xs: 2, md: 4 },
                        py: { xs: 1, md: 1.5 },
                        fontWeight: 900,
                        fontSize: { xs: "0.8rem", md: "1rem" },
                      }}
                      aria-label="الانتقال للصفحة السابقة"
                    >
                      السابقة
                    </Button>
                  </span>
                </Tooltip>

                <Paper
                  elevation={0}
                  sx={{
                    px: { xs: 2, md: 4 },
                    py: { xs: 1, md: 1.5 },
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "primary.main",
                    color: "#fff",
                    boxShadow: "0 6px 20px rgba(25, 118, 210, 0.3)",
                  }}
                >
                  <Typography variant="h6" fontWeight={900}>
                    {page}
                  </Typography>
                </Paper>

                <Tooltip title="الصفحة التالية">
                  <span>
                    <Button
                      onClick={goToNextPage}
                      disabled={page === totalPages}
                      variant="outlined"
                      endIcon={<ChevronLeft />}
                      sx={{
                        borderRadius: "14px",
                        px: { xs: 2, md: 4 },
                        py: { xs: 1, md: 1.5 },
                        fontWeight: 900,
                        fontSize: { xs: "0.8rem", md: "1rem" },
                      }}
                      aria-label="الانتقال للصفحة التالية"
                    >
                      التالية
                    </Button>
                  </span>
                </Tooltip>
              </Stack>
            )}
          </Box>
        ) : (
          !error && (
            <Box
              sx={{
                textAlign: "center",
                py: 15,
                bgcolor: "background.paper",
                borderRadius: "32px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
                border: "1px dashed",
                borderColor: "divider",
              }}
            >
              <SearchIcon sx={{ fontSize: 80, color: "divider", mb: 3 }} />
              <Typography
                variant="h5"
                color="text.secondary"
                fontWeight={900}
                mb={2}
              >
                لا يوجد نتائج تطابق بحثك
              </Typography>
              <Typography color="text.secondary" mb={4}>
                يرجى المحاولة باستخدام كلمات بحث أخرى أو تغيير التصنيف.
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("الكل");
                }}
                startIcon={<RestartAltIcon sx={{ ml: 1 }} />}
                sx={{ borderRadius: "12px", px: 6, fontWeight: 900 }}
              >
                إعادة تهيئة البحث
              </Button>
            </Box>
          )
        )}
      </Container>
    </Box>
  );
};
export default Products;
