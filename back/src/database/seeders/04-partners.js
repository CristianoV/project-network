module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Partners',
      [
        {
          id: 100,
          user_id: 100,
          group_id: 1,
        },
        {
          id: 101,
          user_id: 101,
          group_id: 1,
        },
        {
          id: 102,
          user_id: 101,
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
