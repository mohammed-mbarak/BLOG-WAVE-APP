// Updated App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import ArticleDetail from "./pages/ArticleDetail";
import FeaturedPostsPage from "./pages/FeaturedPostsPage";
import TrendingPage from "./pages/TrendingPage"; // Ensure this path is correct
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<ArticleDetail />} />
              <Route path="/featured" element={<FeaturedPostsPage />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="/articles/:slug" element={<ArticleDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;