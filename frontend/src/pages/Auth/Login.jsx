import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../../components/ThemeToggle';
import Button from '../../components/Button';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

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
      if (!formData.email || !formData.password) {
        setError('Please fill all fields');
        setLoading(false);
        return;
      }

      const response = await login(formData);
      console.log('Login successful:', response);
      
      // Redirect to admin panel
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: theme.colors.background, minHeight: '100vh' }} className="flex items-center justify-center relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <div style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }} className="border rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2" style={{ color: theme.colors.text }}>Admin Login</h1>
          <p className="text-center mb-8" style={{ color: theme.colors.secondary }}>Access your portfolio management panel</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                }}
                className="w-full px-4 py-2 border rounded-lg placeholder-opacity-50 focus:outline-none transition"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                }}
                className="w-full px-4 py-2 border rounded-lg placeholder-opacity-50 focus:outline-none transition"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div style={{ backgroundColor: '#ef4444', borderColor: '#dc2626' }} className="bg-opacity-20 border px-4 py-3 rounded-lg text-sm text-red-300">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              variant="primary"
              size="md"
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

