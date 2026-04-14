const API_URL = 'http://localhost:5000/api/projects';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getAllProjects = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch projects');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProjectById = async (projectId) => {
  try {
    const response = await fetch(`${API_URL}/${projectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch project');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const token = getToken();
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create project');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(projectData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update project');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete project');
    }
    return data;
  } catch (error) {
    throw error;
  }
};
