import Settings from '../models/settings.model.js';

export const getSettings = async (req, res) => {
  const settings = await Settings.findOne() || await Settings.create({});
  res.json(settings);
};

export const updateSettings = async (req, res) => {
  const settings = await Settings.findOne() || await Settings.create({});
  settings.cvUrl = req.body.cvUrl;
  await settings.save();
  res.json(settings);
};