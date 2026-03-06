import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const NotFound = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 10,
      }}
      dir="rtl"
    >
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        {/* Big 404 */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "7rem", md: "12rem" },
            fontWeight: 900,
            lineHeight: 1,
            mb: 2,
            background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            userSelect: "none",
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          fontWeight={900}
          color="text.primary"
          gutterBottom
          sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
        >
          عذراً، الصفحة غير موجودة!
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          fontWeight={400}
          sx={{ maxWidth: 500, mx: "auto", lineHeight: 1.8, mb: 6 }}
        >
          يبدو أن الصفحة التي تبحث عنها قد تم نقلها أو حذفها أو أن الرابط غير صحيح.
        </Typography>

        <Stack
          direction="row"
          gap={3}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            startIcon={<HomeIcon sx={{ ml: 1, mr: 0 }} />}
            aria-label="العودة للصفحة الرئيسية"
            sx={{
              px: { xs: 3, md: 6 }, py: { xs: 1, md: 2 }, borderRadius: "16px",
              fontWeight: 900, fontSize: { xs: "0.9rem", md: "1.05rem" },
            }}
          >
            الصفحة الرئيسية
          </Button>
          <Button
            component={Link}
            to="/products"
            variant="outlined"
            size="large"
            startIcon={<ShoppingBagIcon sx={{ ml: 1, mr: 0 }} />}
            aria-label="العودة لصفحة المنتجات"
            sx={{
              px: { xs: 3, md: 6 }, py: { xs: 1, md: 2 }, borderRadius: "16px",
              fontWeight: 900, fontSize: { xs: "0.9rem", md: "1.05rem" },
              borderWidth: "2px",
              "&:hover": { borderWidth: "2px" }
            }}
          >
            تصفح المنتجات
          </Button>
        </Stack>
      </Container>
    </Box >
  );
};

export default NotFound;
