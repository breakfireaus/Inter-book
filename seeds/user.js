const { User } = require('../models');

const userData = [
  {
    first_name: 'James',
    last_name: 'Johnson',
    email: 'john@test.com',
    password: 'likeCheese',
    description:
      'I am a dance Instructor with 20years experience, I teach all latin styles and a carpenter',
  },
  {
    first_name: 'Jenny',
    last_name: 'Howell',
    email: 'jenny@test.com',
    password: 'Ilikesalsa',
    description:
      'I am a dance Instructor with 5 years experience, I teach all latin styles',
  },

  {
    first_name: 'Klara',
    last_name: 'Thompson',
    email: 'klara@test.com',
    password: 'developthis',
    description: 'I am a dancer',
  },

  {
    first_name: 'Anthony',
    last_name: 'knowitall',
    email: 'akn@test.com',
    password: 'fitnessxxw1',
    description: 'I am a Fitness trainer with celebrities on my books',
  },

  {
    first_name: 'Zora',
    last_name: 'Clams',
    email: 'zora@test.com',
    password: 'developthis',
    description: 'I am a Fitness trainer with celebrities on my books',
  },

  {
    first_name: 'Noel',
    last_name: 'Samsonite',
    email: 'noel@test.com',
    password: 'sara65462',
    description: 'I am a Lawyer specialising in Law',
  },
  {
    first_name: 'Noel',
    last_name: 'Samsonite',
    email: 'noel@test.com',
    password: 'develop1',
    description: 'I am developer',
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
