const { Industry } = require('../models');

const industryData = [
  {
    id: 1,
    Industry: 'Dance',
  },

  {
    id: 2,
    Industry: 'Construction',
  },

  {
    id: 3,
    Industry: 'IT',
  },

  {
    id: 4,
    Industry: 'Fitness',
  },

  {
    id: 5,
    Industry: 'Law',
  },
];

const seedIndustry = () => Industry.bulkCreate(industryData);

module.exports = seedIndustry;
