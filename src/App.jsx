import { useState, useEffect } from 'react';
import Header from './components/Header';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import BlogEditor from './components/BlogEditor';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'The Future of Web Development in 2025',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development, from AI integration to edge computing.',
      content: `The landscape of web development is rapidly evolving, bringing exciting new possibilities for developers and users alike. As we move through 2025, several key trends are emerging that will define how we build and interact with web applications.\n\nArtificial intelligence is no longer a futuristic concept but a practical tool that's being integrated into everyday development workflows. From intelligent code completion to automated testing, AI is helping developers work more efficiently than ever before.\n\nEdge computing is revolutionizing how we think about performance and latency. By processing data closer to the user, we can create faster, more responsive applications that provide a seamless experience regardless of location.\n\nThe rise of serverless architectures continues to simplify deployment and scaling, allowing developers to focus on writing code rather than managing infrastructure. This shift is democratizing web development, making it more accessible to developers of all skill levels.`,
      author: 'Sarah Chen',
      date: '2025-11-28',
      category: 'Technology',
      likes: 234,
      coverImage: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200',
      comments: []
    },
    {
      id: 2,
      title: 'Hidden Gems: Discovering Southeast Asia',
      excerpt: 'A journey through the most beautiful and undiscovered places in Southeast Asia that will take your breath away.',
      content: `Southeast Asia is a treasure trove of incredible destinations, each offering its own unique blend of culture, nature, and adventure. Beyond the well-trodden tourist paths lie hidden gems waiting to be discovered.\n\nFrom the pristine beaches of lesser-known islands to ancient temples hidden in dense jungles, this region never fails to surprise and delight travelers seeking authentic experiences. The warmth of the local people and the richness of their traditions add layers of depth to every journey.\n\nFood enthusiasts will find paradise in the bustling street markets, where generations-old recipes are prepared with love and skill. Each dish tells a story, connecting you to the land and its people in the most delicious way possible.`,
      author: 'Michael Rodriguez',
      date: '2025-11-27',
      category: 'Travel',
      likes: 189,
      coverImage: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
      comments: []
    },
    {
      id: 3,
      title: 'Mastering the Art of Sourdough Bread',
      excerpt: 'Learn the secrets to creating perfect sourdough bread at home with this comprehensive guide for beginners.',
      content: `Baking sourdough bread is both an art and a science, requiring patience, practice, and a deep understanding of the fermentation process. But don't let that intimidate you - with the right guidance, anyone can master this ancient craft.\n\nThe journey begins with creating your starter, a living culture of wild yeast and bacteria that will give your bread its characteristic tangy flavor and chewy texture. Nurturing this starter is like caring for a pet - it needs regular feeding and attention.\n\nOnce your starter is active and bubbly, the real magic begins. Mixing, folding, and shaping the dough becomes a meditative practice, connecting you to bakers throughout history who have followed these same steps. The reward? The most delicious, aromatic bread you've ever tasted.`,
      author: 'Emma Williams',
      date: '2025-11-26',
      category: 'Food',
      likes: 312,
      coverImage: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1200',
      comments: []
    },
    {
      id: 4,
      title: 'Minimalist Living: Less is More',
      excerpt: 'Discover how embracing minimalism can lead to a more fulfilling and stress-free lifestyle.',
      content: `In a world that constantly tells us we need more, minimalism offers a refreshing alternative: what if less could actually give us more? More time, more space, more peace of mind.\n\nThe minimalist lifestyle isn't about deprivation - it's about intentionality. It's about surrounding yourself only with things that add value to your life and letting go of the rest. This applies not just to physical possessions, but to commitments, relationships, and even thoughts.\n\nMany people who embrace minimalism report feeling lighter, freer, and more focused on what truly matters. By reducing the noise and clutter in our lives, we create space for the things and experiences that bring us genuine joy and fulfillment.`,
      author: 'David Park',
      date: '2025-11-25',
      category: 'Lifestyle',
      likes: 267,
      coverImage: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      comments: []
    },
    {
      id: 5,
      title: 'Building a Successful Startup in 2025',
      excerpt: 'Essential strategies and insights for entrepreneurs looking to launch and grow their startups in today\'s competitive market.',
      content: `Starting a business has never been easier, yet succeeding has never been harder. The startup landscape in 2025 is more competitive and dynamic than ever, requiring founders to be adaptable, resilient, and strategic.\n\nThe most successful startups today share common traits: they solve real problems, focus obsessively on their customers, and aren't afraid to pivot when necessary. Speed and execution matter more than perfect planning.\n\nFunding options have also evolved. While traditional venture capital remains important, alternative funding sources like revenue-based financing and crowdfunding give founders more choices and control. The key is finding the right fit for your specific situation and goals.`,
      author: 'Jennifer Lee',
      date: '2025-11-24',
      category: 'Business',
      likes: 198,
      coverImage: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1200',
      comments: []
    }
  ]);

  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    if (searchQuery) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchQuery, posts]);

  const handleCreatePost = () => {
    setIsCreating(true);
    setSelectedPost(null);
  };

  const handleSavePost = (newPost) => {
    setPosts([newPost, ...posts]);
    setIsCreating(false);
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsCreating(false);
  };

  const handleBack = () => {
    setSelectedPost(null);
  };

  const handleLike = (postId, isLiked) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: isLiked ? post.likes + 1 : post.likes - 1 }
        : post
    ));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app">
      <Header
        onCreatePost={handleCreatePost}
        onSearch={handleSearch}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <main className="main-content">
        {isCreating ? (
          <BlogEditor onSave={handleSavePost} onCancel={handleCancelCreate} />
        ) : selectedPost ? (
          <BlogPost post={selectedPost} onBack={handleBack} onLike={handleLike} />
        ) : (
          <BlogList
            posts={filteredPosts}
            onPostClick={handlePostClick}
            currentView={currentView}
          />
        )}
      </main>
    </div>
  );
}

export default App;
