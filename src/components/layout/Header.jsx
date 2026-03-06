import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext.js";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
  Box,
  Tooltip,
  Container,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import { 
  List, 
  ListItem, 
  Drawer, 
  Divider 
} from "@mui/material";

const Header = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { text: "الرئيسية", path: "/", icon: <HomeIcon fontSize="small" sx={{ ml: 0.5}} /> },
    { text: "المنتجات", path: "/products", icon: <StoreIcon fontSize="small" sx={{ ml: 0.5}} /> },
  ];

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        bgcolor: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
        zIndex: 1100,
        height: { xs: 64, md: 80 },
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 0, sm: 2 } }}>
          {/* --- LOGO --- */}
          <Box 
            component={Link} 
            to="/" 
            aria-label="الرئيسية - متجرنا"
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              textDecoration: "none", 
              color: "primary.main",
              transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              "&:hover": { transform: "scale(1.05)" }
            }}
          >
            <Box
              sx={{
                width: { xs: 36, md: 44 },
                height: { xs: 36, md: 44 },
                bgcolor: "primary.main",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                boxShadow: "0 6px 15px rgba(25, 118, 210, 0.35)",
                m: 1.5
              }}
            >
              <StoreIcon sx={{ fontSize: { xs: 22, md: 28 } }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                letterSpacing: -0.5,
                fontSize: { xs: "1.2rem", md: "1.6rem" },
                background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              متجرنا
            </Typography>
          </Box>

          {/* --- NAV LINKS (Desktop) --- */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
            role="navigation"
            aria-label="القائمة الرئيسية"
          >
            {navLinks.map((link) => (
               <Button
                key={link.path}
                component={Link}
                to={link.path}
                startIcon={link.icon}
                sx={{
                  color: "text.secondary",
                  borderRadius: "10px",
                  px: 2.5,
                  fontSize: "0.95rem",
                  "&:hover": { color: "primary.main", bgcolor: "rgba(25, 118, 210, 0.05)" }
                }}
              >
                {link.text}
              </Button>
            ))}
          </Box>

          {/* --- ACTIONS --- */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
            <Tooltip title="سلة التسوق">
              <IconButton
                onClick={() => navigate("/cart")}
                aria-label="عرض سلة التسوق"
                sx={{ 
                  bgcolor: "rgba(0,0,0,0.03)",
                  "&:hover": { bgcolor: "primary.main", color: "white" }
                }}
              >
                <Badge
                  badgeContent={totalItems}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.75rem",
                      height: 20,
                      minWidth: 20,
                      fontWeight: 700,
                      border: "2px solid white",
                    },
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              sx={{
                display: { xs: "none", sm: "flex" },
                borderRadius: "12px",
                px: 3.5,
                py: 1.2,
                fontWeight: 800,
                fontSize: "0.9rem"
              }}
              onClick={() => navigate("/products")}
              aria-label="بدء التسوق"
            >
              تسوق الآن
            </Button>

            <IconButton 
               onClick={handleDrawerToggle}
               aria-label="فتح القائمة الجانبية"
               sx={{ display: { xs: "flex", md: "none" }, bgcolor: "rgba(0,0,0,0.03)" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* --- SIDE DRAWER --- */}
      <Drawer
      anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: { 
            width: 300, 
            p: 2, 
            display: "flex", 
            flexDirection: "column",
            gap: 2
          }
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
           <Typography variant="h6" fontWeight={900} color="primary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
             <StoreIcon /> متجرنا
           </Typography>
           <IconButton onClick={handleDrawerToggle} size="small" aria-label="أغلق القائمة">
             <CloseIcon />
           </IconButton>
        </Box>
        <Divider sx={{ mb: 1, opacity: 0.5 }} />
        <List>
          {navLinks.map((link) => (
            <ListItem 
             key={link.text} 
             component={Link} 
             to={link.path} 
             onClick={handleDrawerToggle}
             disablePadding
             sx={{ mb: 1 }}
            >
              <Button
                fullWidth
                startIcon={link.icon}
                sx={{ 
                  justifyContent: "flex-start", 
                  textAlign: "right", 
                  color: "text.primary",
                  py: 1.5,
                  borderRadius: 3,
                  bgcolor: "rgba(0,0,0,0.02)",
                  "&:hover": { bgcolor: "rgba(25, 118, 210, 0.08)", color: "primary.main" }
                }}
              >
                {link.text}
              </Button>
            </ListItem>
          ))}
          <Divider sx={{ my: 2, opacity: 0.5 }} />
          <ListItem disablePadding>
            <Button
              fullWidth
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              onClick={() => { navigate("/cart"); handleDrawerToggle(); }}
              sx={{ py: 2, borderRadius: 3, fontWeight: 900 }}
            >
              سلة التسوق ({totalItems})
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
