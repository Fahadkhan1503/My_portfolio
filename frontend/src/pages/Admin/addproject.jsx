import { useState } from 'react';
import './addproject.css';

const AddProject = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login first');
        setLoading(false);
        return;
      }

      // Validate form
      if (!formData.title || !formData.description || !formData.image || !formData.link) {
        setError('Please fill all fields');
        setLoading(false);
        return;
      }

      // Make API call
      const response = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to create project');
        setLoading(false);
        return;
      }

      setSuccess('Project created successfully! ✅');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        image: '',
        link: ''
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        setShowModal(false);
        setSuccess('');
      }, 2000);

    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-project-container">
      <button 
        className="add-project-btn"
        onClick={() => setShowModal(true)}
      >
        ➕ Add Project
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Project</h2>
              <button 
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="add-project-form">
              <div className="form-group">
                <label htmlFor="title">Project Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your project"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="image">Image URL *</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="link">Project Link *</label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="https://github.com/project"
                  required
                />
              </div>

              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProject;
