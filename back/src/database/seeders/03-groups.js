module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Groups',
      [
        {
          name: 'Odeio acordar cedo',
          description: 'Grupo para pessoas que odeiam acordar cedo',
          languages: 'Português',
          category: 'Esportes',
          country: 'Brasil',
          type: 'Público',
          owner_id: 2,
        },
        {
          name: 'Nescau ou Toddy',
          description: 'Grupo para pessoas que gostam de Nescau ou Toddy',
          languages: 'Português',
          category: 'Esportes',
          country: 'Brasil',
          type: 'Público',
          owner_id: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Groups', null, {});
  },
};
