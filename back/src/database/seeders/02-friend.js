module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Friendships',
      [
        {
          user_id_1: 100,
          user_id_2: 101,
          status: 'pending',
        },
        {
          user_id_1: 102,
          user_id_2: 101,
          status: 'pending',
        },
        {
          user_id_1: 103,
          user_id_2: 101,
          status: 'pending',
        },
        {
          user_id_1: 104,
          user_id_2: 101,
          status: 'pending',
        },
        {
          user_id_1: 105,
          user_id_2: 101,
          status: 'accepted',
        },
        {
          user_id_1: 101,
          user_id_2: 106,
          status: 'accepted',
        },
        {
          user_id_1: 101,
          user_id_2: 107,
          status: 'accepted',
        },
        {
          user_id_1: 101,
          user_id_2: 108,
          status: 'accepted',
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Friendships', null, {});
  },
};
