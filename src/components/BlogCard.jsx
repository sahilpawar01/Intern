import '../styles/BlogCard.css';

function BlogCard({ post, onClick }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  return (
    <article className="blog-card" onClick={onClick}>
      {post.coverImage && (
        <div className="blog-card-image">
          <img src={post.coverImage} alt={post.title} />
          <div className="blog-card-overlay"></div>
        </div>
      )}
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="blog-card-category">{post.category}</span>
          <span className="blog-card-dot">•</span>
          <span className="blog-card-date">{formatDate(post.date)}</span>
        </div>

        <h2 className="blog-card-title">{post.title}</h2>
        <p className="blog-card-excerpt">{post.excerpt}</p>

        <div className="blog-card-footer">
          <div className="blog-card-author">
            <div className="author-avatar">{post.author.charAt(0).toUpperCase()}</div>
            <span className="author-name">{post.author}</span>
          </div>
          <div className="blog-card-stats">
            <span className="stat">
              <span className="stat-icon">📖</span>
              {getReadingTime(post.content)} min read
            </span>
            <span className="stat">
              <span className="stat-icon">❤️</span>
              {post.likes}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
