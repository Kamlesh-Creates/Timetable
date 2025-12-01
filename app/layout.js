import "./globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8FAFC] text-slate-800 font-[system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',sans-serif]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

