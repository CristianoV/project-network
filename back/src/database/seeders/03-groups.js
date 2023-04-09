module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Groups',
      [
        {
          id: 1,
          name: 'Odeio acordar cedo',
          description: 'Grupo para pessoas que odeiam acordar cedo',
          owner_id: 101,
        },
        {
          id: 2,
          name: 'Nescau ou Toddy',
          description: 'Grupo para pessoas que gostam de Nescau ou Toddy',
          owner_id: 100,
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Groups', null, {});
  },
};
