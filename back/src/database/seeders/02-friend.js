module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Friendships',
      [
        {
          id: 100,
          user_id_1: 100,
          user_id_2: 101,
        },
        {
          id: 101,
          user_id_1: 102,
          user_id_2: 101,
        },
        {
          id: 102,
          user_id_1: 103,
          user_id_2: 101,
        },
        {
          id: 103,
          user_id_1: 104,
          user_id_2: 101,
        },
        {
          id: 104,
          user_id_1: 105,
          user_id_2: 101,
        },
        {
          id: 105,
          user_id_1: 101,
          user_id_2: 106,
        },
        {
          id: 107,
          user_id_1: 101,
          user_id_2: 107,
        },
        {
          id: 108,
          user_id_1: 101,
          user_id_2: 108,
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Friendships', null, {});
  },
};
