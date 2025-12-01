import { useState } from 'react';
import '../styles/BlogPost.css';

function BlogPost({ post, onBack, onLike }) {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const handleLike = () => {
    setLiked(!liked);
    onLike(post.id, !liked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        author: 'Guest User',
        content: comment,
        date: new Date().toISOString()
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  return (
    <div className="blog-post">
      <button className="back-btn" onClick={onBack}>
        <span className="back-icon">←</span>
        Back to Posts
      </button>

      <article className="post-content">
        <div className="post-header">
          <span className="post-category">{post.category}</span>
          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta">
            <div className="post-author-info">
              <div className="author-avatar-large">{post.author.charAt(0).toUpperCase()}</div>
              <div className="author-details">
                <span className="author-name-large">{post.author}</span>
                <span className="post-date">{formatDate(post.date)}</span>
              </div>
            </div>
            <div className="post-stats">
              <span className="post-stat">
                <span className="stat-icon">📖</span>
                {getReadingTime(post.content)} min read
              </span>
            </div>
          </div>
        </div>

        {post.coverImage && (
          <div className="post-cover-image">
            <img src={post.coverImage} alt={post.title} />
          </div>
        )}

        <div className="post-body">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="post-paragraph">{paragraph}</p>
          ))}
        </div>

        <div className="post-actions">
          <button
            className={`action-btn like-btn ${liked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <span className="action-icon">{liked ? '❤️' : '🤍'}</span>
            {post.likes + (liked ? 1 : 0)}
          </button>
          <button className="action-btn">
            <span className="action-icon">💬</span>
            {comments.length}
          </button>
          <button className="action-btn">
            <span className="action-icon">🔖</span>
            Save
          </button>
          <button className="action-btn">
            <span className="action-icon">📤</span>
            Share
          </button>
        </div>
      </article>

      <section className="comments-section">
        <h2 className="comments-title">Comments ({comments.length})</h2>

        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <textarea
            className="comment-input"
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
          />
          <button type="submit" className="comment-submit-btn">
            Post Comment
          </button>
        </form>

        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment-avatar">{comment.author.charAt(0).toUpperCase()}</div>
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">{formatDate(comment.date)}</span>
                </div>
                <p className="comment-text">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BlogPost;
