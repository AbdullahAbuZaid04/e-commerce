import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Container,
  Fade,
  Stack,
} from "@mui/material";

// Icons
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StorefrontIcon from "@mui/icons-material/Storefront";

import ProductCard from "../components/products/ProductCard.jsx";
import { useProducts } from "../contexts/ProductContext.js";

const Home = () => {
  const { featuredProducts, loading, error } = useProducts();

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }} dir="rtl">
      {/* ---------- ELEGANT HERO SECTION ---------- */}
      <Box
        sx={{
          width: "100%",
          background: "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
          py: { xs: 6, md: 12 },
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction={{ xs: "column", md: "row-reverse" }}
            spacing={{ xs: 6, md: 8 }}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* IMAGE SIDE */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Fade in timeout={1200}>
                <Box
                  sx={{
                    position: "relative",
                    width: "fit-content",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: "10%",
                      left: "-5%",
                      width: "100%",
                      height: "100%",
                      bgcolor: "primary.light",
                      opacity: 0.08,
                      borderRadius: "40px",
                      zIndex: 0,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={require("../assets/store.webp")}
                    alt="التسوق الإلكتروني بذكاء من متجرنا"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    width={540}
                    height={360}
                    sx={{
                      width: "100%",
                      maxWidth: { xs: 320, md: 540 },
                      height: "auto",
                      borderRadius: "40px",
                      boxShadow: "0 40px 100px rgba(0,0,0,0.12)",
                      border: "12px solid white",
                      bgcolor: "white",
                      zIndex: 1,
                      position: "relative",
                    }}
                  />
                </Box>
              </Fade>
            </Box>

            {/* TEXT SIDE */}
            <Box
              sx={{
                flex: 1.2,
                textAlign: { xs: "center", md: "right" },
                width: "100%",
              }}
            >
              <Fade in timeout={800}>
                <Box>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      bgcolor: "rgba(25, 118, 210, 0.08)",
                      px: 2,
                      py: 0.8,
                      borderRadius: "10px",
                      mb: 3,
                      gap: 1,
                    }}
                  >
                    <LocalOfferIcon
                      sx={{ color: "primary.main", fontSize: 18 }}
                    />
                    <Typography
                      variant="overline"
                      sx={{
                        color: "primary.main",
                        fontWeight: 900,
                        letterSpacing: 1,
                        fontSize: "0.85rem",
                      }}
                    >
                      منتجات حصرية لعام {new Date().getFullYear()}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 900,
                      color: "text.primary",
                      mb: 3,
                      lineHeight: 1.4,
                      fontSize: { xs: "2.4rem", md: "4.5rem" },
                      letterSpacing: -1,
                    }}
                  >
                    ارتقِ بأسلوب <span style={{ color: "#1976d2" }}>حياتك</span>{" "}
                    <br />
                    مع أفضل المنتجات
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      color: "text.secondary",
                      mb: 6,
                      fontWeight: 400,
                      maxWidth: "620px",
                      mx: { xs: "auto", md: 0 },
                      lineHeight: 1.8,
                      fontSize: { xs: "1rem", md: "1.25rem" },
                    }}
                  >
                    نحن هنا لنقدم لك تشكيلة عالمية مختارة بعناية لتتناسب مع
                    تطلعاتك. جودة، أناقة، وتوصيل سريع في مكان واحد وبضغطة زر.
                  </Typography>

                  <Stack
                    direction="row"
                    gap={2}
                    justifyContent={{ xs: "center", md: "flex-start" }}
                  >
                    <Button
                      component={Link}
                      to="/products"
                      variant="contained"
                      size="large"
                      startIcon={<StorefrontIcon sx={{ ml: 1, mr: 0 }} />}
                      sx={{
                        px: { xs: 3, md: 6 },
                        py: { xs: 1.5, md: 2.2 },
                        borderRadius: "16px",
                        fontWeight: 800,
                        fontSize: { xs: "0.8rem", md: "1.1rem" },
                        boxShadow: "0 10px 25px rgba(25, 118, 210, 0.3)",
                      }}
                      aria-label="اذهب لصفحة المنتجات"
                    >
                      تصفح المنتجات
                    </Button>
                    <Button
                      component={Link}
                      to="/cart"
                      variant="outlined"
                      size="large"
                      startIcon={<ShoppingBagIcon sx={{ ml: 1, mr: 0 }} />}
                      sx={{
                        px: { xs: 3, md: 6 },
                        py: { xs: 1.5, md: 2.2 },
                        borderRadius: "16px",
                        fontWeight: 800,
                        fontSize: { xs: "0.8rem", md: "1.1rem" },
                        bgcolor: "white",
                        borderColor: "rgba(0,0,0,0.1)",
                        color: "text.primary",
                        "&:hover": {
                          borderColor: "primary.main",
                          bgcolor: "rgba(25, 118, 210, 0.03)",
                        },
                      }}
                      aria-label="عرض سلة التسوق الخاصة بك"
                    >
                      عرض السلة
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* ---------- FEATURED PRODUCTS ---------- */}
      <Container maxWidth="xl" sx={{ py: 12 }}>
        <Box sx={{ mb: 10, textAlign: "center" }}>
          <Typography
            variant="h2"
            fontWeight={900}
            color="text.primary"
            gutterBottom
            sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
          >
            أبرز المنتجات المختارة
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1.15rem", maxWidth: 650, mx: "auto" }}
          >
            استعرض قائمتنا المختارة من المنتجات الأكثر مبيعاً وتقييماً من قِبل
            عملائنا المتميزين.
          </Typography>
          <Box
            sx={{
              width: 80,
              height: 5,
              bgcolor: "primary.main",
              mx: "auto",
              mt: 4,
              borderRadius: "10px",
            }}
          />
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 15 }}>
            <CircularProgress size={60} thickness={4} />
          </Box>
        ) : error ? (
          <Alert
            severity="error"
            variant="filled"
            sx={{ borderRadius: "16px", py: 2, maxWidth: 600, mx: "auto" }}
          >
            {error}
          </Alert>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {featuredProducts.map((product) => (
              <Grid item key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ mt: 10, textAlign: "center" }}>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            size="large"
            sx={{
              px: 8,
              py: 2,
              borderRadius: "14px",
              fontWeight: 800,
              bgcolor: "text.primary",
              "&:hover": { bgcolor: "primary.main" },
            }}
            aria-label="تصفح كافة المنتجات المتوفرة"
          >
            تصفح كل المنتجات
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
