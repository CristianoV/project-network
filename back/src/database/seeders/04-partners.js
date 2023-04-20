module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Partners',
      [
        {
          user_id: 1,
          group_id: 1,
        },
        {
          user_id: 2,
          group_id: 1,
        },
        {
          user_id: 2,
          group_id: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Partners', null, {});
  },
};
