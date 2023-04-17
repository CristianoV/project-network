module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Friendships',
      [
        {
          id: 100,
          user_id_1: 100,
          user_id_2: 101,
          status: 'accepted',
        },
        {
          id: 101,
          user_id_1: 102,
          user_id_2: 101,
          status: 'pending',
        },
        {
          id: 102,
          user_id_1: 103,
          user_id_2: 101,
          status: 'pending',
        },
        {
          id: 103,
          user_id_1: 104,
          user_id_2: 101,
          status: 'pending',
        },
        {
          id: 104,
          user_id_1: 105,
          user_id_2: 101,
          status: 'pending',
        },
        {
          id: 105,
          user_id_1: 101,
          user_id_2: 106,
          status: 'pending',
        },
        {
          id: 107,
          user_id_1: 101,
          user_id_2: 107,
          status: 'pending',
        },
        {
          id: 108,
          user_id_1: 101,
          user_id_2: 108,
          status: 'pending',
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Friendships', null, {});
  },
};
