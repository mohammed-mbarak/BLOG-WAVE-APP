import React from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

function MainLayout({ children }) {  // Accept children prop
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </header>
      <main className="flex-grow pt-20 w-full">  {/* Changed to pt-20 */}
        {children}  {/* Render children instead of Outlet */}
      </main>
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;