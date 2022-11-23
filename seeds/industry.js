const { Industry } = require('../models');

const industryData = [
  {
    id: 1,
    Industry: 'Entertainment',
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

  {
    id: 6,
    Industry: 'Accounting',
  },

  {
    id: 7,
    Industry: 'Accounting',
  },

  {
    id: 8,
    Industry: 'Accounting',
  },

  {
    id: 9,
    Industry: 'Real Estate',
  },

  {
    id: 10,
    Industry: 'Agriculture',
  },

  {
    id: 11,
    Industry: 'Tourism',
  },

  {
    id: 12,
    Industry: 'Transport',
  },

  {
    id: 13,
    Industry: 'Food Service',
  },

  {
    id: 14,
    Industry: 'Engineering',
  },

  {
    id: 15,
    Industry: 'Engineering',
  },

  {
    id: 16,
    Industry: 'Service',
  },

  {
    id: 17,
    Industry: 'Accommodation',
  },

  {
    id: 18,
    Industry: 'Business Administration',
  },


  {
    id: 19,
    Industry: 'Forestry',
  },

  {
    id: 20,
    Industry: 'Advertisement',
  },
];

const seedIndustry = () => Industry.bulkCreate(industryData);

module.exports = seedIndustry;
