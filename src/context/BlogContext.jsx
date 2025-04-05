import React, { createContext, useState, useContext } from 'react';

// Create the context
const BlogContext = createContext();

// Custom hook to use the Blog context
export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]); // State to store the list of blogs
  const [selectedBlog, setSelectedBlog] = useState(null); // State to store the selected blog

  // Set blogs from API or mock data
  const setAllBlogs = (blogsData) => {
    setBlogs(blogsData);
  };

  // Set the selected blog
  const setBlogDetails = (blogData) => {
    setSelectedBlog(blogData);
  };

  return (
    <BlogContext.Provider value={{ blogs, selectedBlog, setAllBlogs, setBlogDetails }}>
      {children}
    </BlogContext.Provider>
  );
};
