import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
  },
  typography: {
    fontFamily:
      '"NumbersFont","Tajawal", "Cairo", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 900 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 700 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          padding: "10px 24px",
          fontSize: "1rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "& .MuiButton-startIcon, & .MuiButton-endIcon": {
            marginRight: "inherit", // Standard MUI RTL handling
            marginLeft: "inherit",
          },
        },
        contained: {
          boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
          "&:hover": {
            boxShadow: "0 8px 20px rgba(25, 118, 210, 0.3)",
            transform: "translateY(-2px)",
          },
        },
        outlined: {
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
            backgroundColor: "rgba(25, 118, 210, 0.04)",
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
          "&:hover": {
            boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#1e293b",
          fontSize: "0.8rem",
          borderRadius: "8px",
          padding: "8px 12px",
        },
        arrow: {
          color: "#1e293b",
        },
      },
    },
  },
});

export default theme;
