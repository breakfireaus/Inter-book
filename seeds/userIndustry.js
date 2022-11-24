const { UserIndustry } = require('../models');

const userIndustryData = [
    {
        
        user_id: 1,
        industry_id: 1
    },

    {
        user_id: 1,
        industry_id: 2
    },

    {
        
        user_id: 2,
        industry_id: 2
    },

    {
        
        user_id: 2,
        industry_id: 4
    },

    {
        user_id: 3,
        industry_id: 3
    },

    {
        user_id: 3,
        industry_id: 1
    },

    {
        
        user_id: 4,
        industry_id: 6
    },

    {
        
        user_id: 5,
        industry_id: 2
    },

    {
        user_id: 6,
        industry_id: 5
    },

    {
        user_id: 6,
        industry_id: 3
    },

    {
        user_id: 7,
        industry_id: 5
    }
]

const seeduserIndustry = () => UserIndustry.bulkCreate(userIndustryData);

module.exports = seeduserIndustry;
