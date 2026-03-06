import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Fab,
  Fade,
  Stack,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socialLinks = [
    { name: "Facebook", icon: <FacebookIcon fontSize="small" />, path: "#" },
    { name: "Instagram", icon: <InstagramIcon fontSize="small" />, path: "#" },
    { name: "Twitter", icon: <XIcon fontSize="small" />, path: "#" },
    { name: "WhatsApp", icon: <WhatsAppIcon fontSize="small" />, path: "#" },
  ];

  const quickLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "المنتجات", path: "/products" },
    { name: "سلة التسوق", path: "/cart" },
  ];

  const categories = ["إلكترونيات", "ملابس ", "أحذية"];

  const titleSx = {
    position: "relative",
    fontWeight: 900,
    color: "white",
    mb: 3.5,
    width: "fit-content",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -10,
      right: 0,
      width: 40,
      height: 3,
      bgcolor: "primary.main",
      borderRadius: 1,
    },
  };

  const linkSx = {
    color: "#94a3b8",
    cursor: "pointer",
    transition: "0.3s",
    width: "fit-content",
    textDecoration: "none",
    "&:hover": { color: "primary.light", transform: "translateX(-10px)" },
  };

  return (
    <Box
      component="footer"
      dir="rtl"
      role="contentinfo"
      sx={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "#94a3b8",
        pt: 10,
        pb: 4,
        borderTop: "1px solid",
        borderColor: "rgba(255, 255, 255, 0.05)",
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: { xs: 6, md: 4 },
            flexWrap: { xs: "wrap", md: "nowrap" },
            mr: { xs: 2.5, md: 4 },
          }}
        >
          {/* BRAND */}
          <Box
            sx={{
              flex: { md: "0 0 520px" },
              width: { xs: "100%", sm: "calc(50% - 24px)", md: "auto" },
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "16px",
                    background:
                      "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    boxShadow: "0 8px 20px rgba(25, 118, 210, 0.35)",
                  }}
                >
                  <ShoppingBagIcon sx={{ fontSize: 30 }} />
                </Box>
                <Typography
                  variant="h5"
                  fontWeight={900}
                  color="white"
                  sx={{ letterSpacing: -0.5 }}
                >
                  متجرنا
                </Typography>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  color: "#94a3b8",
                  mb: 4,
                  fontSize: "0.95rem",
                  maxWidth: 520,
                }}
              >
                نحن وجهتك الموثوقة للتسوق الإلكتروني في فلسطين. نقدم لك أفضل
                العلامات التجارية العالمية بضمان وجودة لا تضاهى، مع خدمة توصيل
                سريعة تغطي كافة المناطق.
              </Typography>

              <Stack direction="row" gap={2} flexWrap="wrap">
                {socialLinks.map((social) => (
                  <Tooltip key={social.name} title={social.name}>
                    <IconButton
                      component="a"
                      href={social.path}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "14px",
                        bgcolor: "rgba(255, 255, 255, 0.04)",
                        color: "#cbd5e1",
                        transition: "all 0.4s",
                        "&:hover": {
                          bgcolor: "primary.main",
                          color: "white",
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 20px rgba(25, 118, 210, 0.4)",
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
            </Box>
          </Box>

          {/* QUICK LINKS */}
          <Box sx={{ minWidth: { xs: "50%", md: 220 } }}>
            <Typography variant="subtitle1" sx={titleSx}>
              روابط سريعة
            </Typography>

            <Stack spacing={2.2}>
              {quickLinks.map((link) => (
                <Typography
                  key={link.name}
                  component={Link}
                  to={link.path}
                  variant="body2"
                  sx={linkSx}
                >
                  {link.name}
                </Typography>
              ))}
            </Stack>
          </Box>

          <Box sx={{ minWidth: { xs: "50%", md: 220 } }}>
            <Typography variant="subtitle1" sx={titleSx}>
              أهم الأقسام
            </Typography>
            <Stack spacing={2.2}>
              {categories.map((cat) => (
                <Typography
                  key={cat}
                  component={Link}
                  variant="body2"
                  sx={linkSx}
                >
                  {cat}
                </Typography>
              ))}
            </Stack>
          </Box>
        </Box>

        <Divider
          sx={{
            mt: { xs: 5, md: 7 },
            mb: 3,
            borderColor: "rgba(255,255,255,0.08)",
          }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            textAlign: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body2" sx={{ color: "#94a3b8" }}>
            جميع الحقوق محفوظة © {new Date().getFullYear()}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "primary.light", fontWeight: 900 }}
          >
            متجرنا
          </Typography>
        </Box>
      </Container>

      <Fade in={showScrollButton}>
        <Tooltip title="للأعلى" placement="left">
          <Fab
            size="medium"
            onClick={scrollToTop}
            aria-label="العودة للأعلى"
            sx={{
              position: "fixed",
              bottom: 40,
              right: 20,
              zIndex: 1200,
              bgcolor: "primary.main",
              color: "white",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              transition: "transform 0.3s",
              "&:hover": {
                bgcolor: "primary.dark",
                transform: "translateY(-5px)",
              },
            }}
          >
            <ArrowUpwardIcon />
          </Fab>
        </Tooltip>
      </Fade>
    </Box>
  );
};

export default Footer;
