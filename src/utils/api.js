// api.js - Utility functions for making API calls

// Example of a GET request
export const fetchBlogs = async () => {
  try {
    const response = await fetch('/api/blogs'); // Adjust URL based on your API
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

// Example of a POST request (to create a new blog)
export const createBlog = async (blogData) => {
  try {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });
    if (!response.ok) {
      throw new Error('Failed to create blog');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};
