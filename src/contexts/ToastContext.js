import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar } from "@mui/material";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });

  const showToast = useCallback((message, type = "success") => {
    setToast({ open: true, message, type });
  }, []);

  const hideToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToast(prev => ({ ...prev, open: false }));
  };

  const success = (msg) => showToast(msg, "success");
  const error = (msg) => showToast(msg, "error");

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={hideToast}
        message={toast.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: 7 }}
        ContentProps={{
          sx: {
            bgcolor: '#1e293b',
            color: 'white',
            borderRadius: '12px',
            justifyContent: 'center',
            fontWeight: 900
          }
        }}
      />

    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};