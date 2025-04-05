import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://dev.to/api/articles/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch article (Status: ${response.status})`);
        }

        const data = await response.json();
        setArticle({
          id: data.id,
          title: data.title,
          content: data.body_markdown || 'No content available',
          category: data.tag_list[0] || 'Technology',
          date: new Date(data.published_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          readTime: `${data.reading_time_minutes || 5} min read`,
          image: data.cover_image || data.social_image || 'https://via.placeholder.com/800x400?text=Dev.to',
          author: data.user.name || 'Unknown Author',
          source: 'Dev.to',
          url: data.url
        });
      } catch (error) {
        console.error('Error fetching article:', error);
        setArticle(getSampleArticle(id));
        setError(`Showing sample content: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const getSampleArticle = (id) => {
    const samples = [
      {
        id: 1,
        title: 'Getting Started with React Hooks',
        content: `React Hooks have revolutionized how we write React components. They allow you to use state and other React features without writing classes.

        ## Key Hooks to Know:
        - useState: For managing component state
        - useEffect: For side effects
        - useContext: For accessing context
        - useReducer: For complex state logic
        
        Hooks make your code more reusable and easier to understand.`,
        category: 'React',
        date: 'May 15, 2023',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        author: 'Jane Developer',
        source: 'Sample Articles',
        url: '#'
      },
      {
        id: 2,
        title: 'The Future of Web Development',
        content: `Web development continues to evolve at a rapid pace. Here are the key trends to watch:
        
        1. **WebAssembly**: Bringing near-native performance to the web
        2. **Progressive Web Apps**: Blurring the line between web and mobile
        3. **Serverless Architecture**: Changing how we deploy applications
        4. **AI Integration**: Making apps smarter
        
        Staying current with these trends will be crucial for developers.`,
        category: 'Web Development',
        date: 'June 20, 2023',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
        author: 'Tech Insights',
        source: 'Sample Articles',
        url: '#'
      }
    ];
    return samples[id % samples.length] || samples[0];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {error && (
        <div className="mb-8 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
          {error}
        </div>
      )}
      
      <article className="bg-white shadow-xl rounded-lg overflow-hidden">
        <img 
          className="w-full h-96 object-cover" 
          src={article.image} 
          alt={article.title}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/800x400';
          }}
        />
        
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {article.category}
            </span>
            <span className="text-sm text-gray-500">
              {article.date} · {article.readTime}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          
          <div className="flex items-center mb-8">
            <div className="mr-4">
              <span className="text-sm text-gray-600">By {article.author}</span>
            </div>
            <div>
              <span className="text-sm text-gray-600">Published on {article.source}</span>
            </div>
          </div>
          
          <div className="prose max-w-none">
            {article.content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4 text-gray-700">
                {paragraph || <br />}
              </p>
            ))}
          </div>
          
          <div className="mt-12 flex justify-between">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
            >
              Back to Articles
            </button>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Read Full Article
              <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;