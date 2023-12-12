"use client";
import { ThemeProvider } from "next-themes";
const ThemeProviderComponent = ({ children }) => {
  return (
    <ThemeProvider enableSystem={false} attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderComponent;
