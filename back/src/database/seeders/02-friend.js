module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Friendships',
      [
        {
          user_id_1: 1,
          user_id_2: 2,
          status: 'pending',
        },
        {
          user_id_1: 3,
          user_id_2: 2,
          status: 'pending',
        },
        {
          user_id_1: 4,
          user_id_2: 2,
          status: 'pending',
        },
        {
          user_id_1: 5,
          user_id_2: 2,
          status: 'pending',
        },
        {
          user_id_1: 6,
          user_id_2: 2,
          status: 'accepted',
        },
        {
          user_id_1: 2,
          user_id_2: 7,
          status: 'accepted',
        },
        {
          user_id_1: 2,
          user_id_2: 8,
          status: 'accepted',
        },
        {
          user_id_1: 2,
          user_id_2: 9,
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
