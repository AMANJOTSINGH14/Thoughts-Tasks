import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchThoughts, addThought, editThought, deleteThought, toggleThoughtPrivacy, fetchPublicThoughts, likeThought } from './thoughtsSlice';

const Thoughts = () => {
  const dispatch = useDispatch();
  const  user  = useSelector((state) => state.auth);
  const thoughts = useSelector((state) => state.thoughts.thoughts);
  const [newThought, setNewThought] = useState('');
  const [sortedThoughts, setSortedThoughts] = useState([]);
  const [sortOption, setSortOption] = useState('mostLiked');

  useEffect(() => {
    if (user.user == null) {
      dispatch(fetchPublicThoughts());
    } else {
      dispatch(fetchThoughts(user.user.userId));
    }
  }, [dispatch, user]);

  useEffect(() => {
    setSortedThoughts(sortThoughts(thoughts, sortOption));
  }, [thoughts, sortOption]);

  const sortThoughts = (thoughts, option) => {
    if (!thoughts) return [];
    switch (option) {
      case 'mostLiked':
        return [...thoughts].sort((a, b) => b.likes - a.likes);
      case 'newest':
        return [...thoughts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'older':
        return [...thoughts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      default:
        return thoughts;
    }
  };

  const handleAddThought = () => {
    if (newThought.trim()) {
      dispatch(addThought({ userId: user.user.userId, text: newThought }));
      setNewThought('');
    }
  };

  const handleEditThought = (thoughtId, newText) => {
    dispatch(editThought({ userId: user.user.userId, thoughtId, text: newText }));
  };

  const handleDeleteThought = (thoughtId) => {
    dispatch(deleteThought({ userId: user.user.userId, thoughtId }));
  };

  const handleTogglePrivacy = (thoughtId) => {
    dispatch(toggleThoughtPrivacy({ userId: user.user.userId, thoughtId }));
  };

  const handleLikeThought = (thoughtId) => {
    dispatch(likeThought(thoughtId));
  };

  return (
    <div className="container mt-5">
       {user.user != null ? (
        <>
          <h1>Your Thoughts</h1>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={newThought}
              onChange={(e) => setNewThought(e.target.value)}
              placeholder="Add a new thought"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={handleAddThought}>
                Add Thought
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h3>Everyone's Valuable Thoughts</h3>
        </>
      )}
      <div className="mb-3">
        <label htmlFor="sortOptions" className="form-label">Sort by:</label>
        <select
          id="sortOptions"
          className="form-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="mostLiked">Most Liked</option>
          <option value="newest">Newest</option>
          <option value="older">Older</option>
        </select>
      </div>
      <ul className="list-group mt-3">
        {sortedThoughts.map((thought) => (
          <li key={thought._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{thought.text}</span>
            <div>
              <span className="mr-2">Likes: {thought.likes}</span>
              {user.user == null ? (
                <button className="btn btn-outline-primary btn-sm" onClick={() => handleLikeThought(thought._id)}>
                  Like
                </button>
              ) : (
                <>
                  <button className="btn btn-secondary btn-sm mr-2" onClick={() => handleEditThought(thought._id, prompt('Edit your thought:', thought.text))}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm mr-2" onClick={() => handleDeleteThought(thought._id)}>
                    Delete
                  </button>
                  <button className="btn btn-info btn-sm" onClick={() => handleTogglePrivacy(thought._id)}>
                    {thought.isPublic ? 'Make Private' : 'Make Public'}
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Thoughts;
