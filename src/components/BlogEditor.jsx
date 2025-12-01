import { useState } from 'react';
import '../styles/BlogEditor.css';

function BlogEditor({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Technology',
    author: 'Guest Writer',
    coverImage: ''
  });

  const [preview, setPreview] = useState(false);

  const categories = ['Technology', 'Travel', 'Food', 'Lifestyle', 'Business', 'Health', 'Design', 'Science'];

  const sampleImages = [
    'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.content) {
      const newPost = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString(),
        likes: 0,
        comments: []
      };
      onSave(newPost);
    }
  };

  const insertFormatting = (type) => {
    const textarea = document.querySelector('.editor-textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    let newText = '';

    switch (type) {
      case 'bold':
        newText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        newText = `*${selectedText || 'italic text'}*`;
        break;
      case 'heading':
        newText = `## ${selectedText || 'Heading'}`;
        break;
      case 'quote':
        newText = `> ${selectedText || 'Quote'}`;
        break;
      case 'list':
        newText = `- ${selectedText || 'List item'}`;
        break;
      default:
        return;
    }

    const newContent = formData.content.substring(0, start) + newText + formData.content.substring(end);
    setFormData(prev => ({ ...prev, content: newContent }));
  };

  return (
    <div className="blog-editor">
      <div className="editor-header">
        <h2 className="editor-title">Create New Post</h2>
        <div className="editor-actions">
          <button className="editor-btn secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="editor-btn preview-btn"
            onClick={() => setPreview(!preview)}
          >
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button className="editor-btn primary" onClick={handleSubmit}>
            Publish
          </button>
        </div>
      </div>

      {!preview ? (
        <form className="editor-form">
          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Post Title"
              value={formData.title}
              onChange={handleChange}
              className="editor-input title-input"
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="excerpt"
              placeholder="Write a brief excerpt..."
              value={formData.excerpt}
              onChange={handleChange}
              className="editor-input excerpt-input"
              rows="2"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="editor-select"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Author Name</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="editor-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Cover Image</label>
            <div className="image-selector">
              {sampleImages.map((img, index) => (
                <div
                  key={index}
                  className={`image-option ${formData.coverImage === img ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, coverImage: img }))}
                >
                  <img src={img} alt={`Option ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <div className="editor-toolbar">
              <button type="button" className="toolbar-btn" onClick={() => insertFormatting('bold')} title="Bold">
                <strong>B</strong>
              </button>
              <button type="button" className="toolbar-btn" onClick={() => insertFormatting('italic')} title="Italic">
                <em>I</em>
              </button>
              <button type="button" className="toolbar-btn" onClick={() => insertFormatting('heading')} title="Heading">
                H
              </button>
              <button type="button" className="toolbar-btn" onClick={() => insertFormatting('quote')} title="Quote">
                "
              </button>
              <button type="button" className="toolbar-btn" onClick={() => insertFormatting('list')} title="List">
                ≡
              </button>
            </div>
            <textarea
              name="content"
              placeholder="Write your story..."
              value={formData.content}
              onChange={handleChange}
              className="editor-textarea"
              rows="15"
              required
            />
          </div>
        </form>
      ) : (
        <div className="editor-preview">
          <div className="preview-header">
            <span className="preview-category">{formData.category}</span>
            <h1 className="preview-title">{formData.title || 'Untitled Post'}</h1>
            <div className="preview-meta">
              <span className="preview-author">{formData.author}</span>
              <span className="preview-date">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          {formData.coverImage && (
            <img src={formData.coverImage} alt="Cover" className="preview-cover" />
          )}
          {formData.excerpt && (
            <p className="preview-excerpt"><em>{formData.excerpt}</em></p>
          )}
          <div className="preview-content">
            {formData.content.split('\n\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogEditor;
