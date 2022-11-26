const { Industry } = require('../models');

const industryData = [
  {
    industry: 'Dance',
  },

  {
    industry: 'Construction',
  },

  {
    industry: 'IT',
  },

  {
    industry: 'Fitness',
  },

  {
    industry: 'Law',
  },
];

const seedIndustry = () => Industry.bulkCreate(industryData);

module.exports = seedIndustry;
