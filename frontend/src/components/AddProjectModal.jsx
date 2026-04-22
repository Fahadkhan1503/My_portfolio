import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';
import { createProject, updateProject } from '../services/projectService';

export default function AddProjectModal({ isOpen, onClose, onProjectAdded, project = null }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    githubUrl: '',
    tags: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  // Pre-fill form when editing
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        image: project.image || '',
        link: project.link || '',
        githubUrl: project.githubUrl || '',
        tags: (project.tags && Array.isArray(project.tags)) ? project.tags.join(', ') : '',
      });
    } else {
      // Reset form for add mode
      setFormData({
        title: '',
        description: '',
        image: '',
        link: '',
        githubUrl: '',
        tags: '',
      });
    }
    setError('');
  }, [project, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validation
      if (!formData.title || !formData.description || !formData.image || !formData.link) {
        setError('Please fill all required fields');
        setLoading(false);
        return;
      }

      // Convert tags string to array
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '');

      const projectData = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        link: formData.link,
        githubUrl: formData.githubUrl,
        tags: tagsArray,
      };

      let response;
      if (project) {
        // Edit mode
        response = await updateProject(project._id, projectData);
        console.log('Project updated:', response);
      } else {
        // Add mode
        response = await createProject(projectData);
        console.log('Project created:', response);
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        image: '',
        link: '',
        githubUrl: '',
        tags: '',
      });

      // Callback to refresh projects list
      if (onProjectAdded) {
        onProjectAdded();
      }

      // Close modal
      onClose();
    } catch (err) {
      setError(err.message || 'An error occurred');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const isEditMode = !!project;
  const modalTitle = isEditMode ? 'Edit Project' : 'Add New Project';
  const buttonText = loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Project' : 'Create Project');

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
        className="border rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sticky top-0" style={{ backgroundColor: theme.colors.surface }}>
          <h2 style={{ color: theme.colors.text }} className="text-2xl font-bold">
            {modalTitle}
          </h2>
          <button
            onClick={onClose}
            style={{ color: theme.colors.secondary }}
            className="text-2xl hover:opacity-70 transition"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label style={{ color: theme.colors.text }} className="block text-sm font-medium mb-2">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none transition"
              placeholder="Enter project title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label style={{ color: theme.colors.text }} className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none transition resize-none"
              placeholder="Enter project description"
              rows="4"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label style={{ color: theme.colors.text }} className="block text-sm font-medium mb-2">
              Image URL *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none transition"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {/* Deploy Link */}
          <div>
            <label style={{ color: theme.colors.text }} className="block text-sm font-medium mb-2">
              Deploy Link *
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none transition"
              placeholder="https://deployed-site.com"
              required
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label style={{ color: theme.colors.text }} className="block text-sm font-medium mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none transition"
              placeholder="https://github.com/user/repo"
            />
          </div>

          {/* Tags */}
          <div>
            <label style={{ color: theme.colors.text }} className="block text-sm font-medium mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none transition"
              placeholder="React, Node.js, MongoDB"
            />
            <p style={{ color: theme.colors.secondary }} className="text-xs mt-1">
              Enter tags separated by commas
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{ backgroundColor: '#ef4444', borderColor: '#dc2626' }} className="bg-opacity-20 border px-4 py-3 rounded-lg text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              variant="secondary"
              size="md"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {buttonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
