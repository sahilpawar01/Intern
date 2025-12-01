import { useState } from 'react';
import BlogCard from './BlogCard';
import '../styles/BlogList.css';

function BlogList({ posts, onPostClick, currentView }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(posts.map(post => post.category))];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  const sortedPosts = currentView === 'trending'
    ? [...filteredPosts].sort((a, b) => b.likes - a.likes)
    : filteredPosts;

  return (
    <div className="blog-list-container">
      {currentView === 'categories' && (
        <div className="category-filter">
          <h2 className="filter-title">Browse by Category</h2>
          <div className="category-chips">
            {categories.map(category => (
              <button
                key={category}
                className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="blog-list">
        {sortedPosts.length > 0 ? (
          sortedPosts.map(post => (
            <BlogCard
              key={post.id}
              post={post}
              onClick={() => onPostClick(post)}
            />
          ))
        ) : (
          <div className="empty-state">
            <span className="empty-icon">📝</span>
            <h3>No posts found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogList;
