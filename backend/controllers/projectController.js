import Project from '../models/projects.model.js';

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('createdBy', 'name email');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Looking for project with ID:', id);
    
    const project = await Project.findById(id).populate('createdBy', 'name email');
    
    console.log('Project found:', project);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found', id });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, description, image, link, tags, githubUrl } = req.body;
    const userId = req.user.id; // From auth middleware

    // Validation
    if (!title || !description || !image || !link) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const project = new Project({
      title,
      description,
      image,
      link,
      tags: tags || [],
      githubUrl: githubUrl || '',
      createdBy: userId
    });

    await project.save();
    await project.populate('createdBy', 'name email');

    res.status(201).json({ 
      message: 'Project created successfully',
      project 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, link, tags, githubUrl } = req.body;
    const userId = req.user.id;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is the creator (admin check)
    if (project.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (image) project.image = image;
    if (link) project.link = link;
    if (tags) project.tags = tags;
    if (githubUrl) project.githubUrl = githubUrl;
    project.updatedAt = Date.now();

    await project.save();
    await project.populate('createdBy', 'name email');

    res.status(200).json({ 
      message: 'Project updated successfully',
      project 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is the creator (admin check)
    if (project.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
