module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 100,
          email: 'cintia.sc@gmail.com',
          password:
            '$2a$10$0ec80axjF54kPvZW5KRmSuQjCGK8P7vqJdoTY7KmUJ8NRzcX2v7pS', // Abacaxi123
          firstName: 'Cintia',
          lastName: 'Vieira',
          bio: 'I am a girlfriend of Cristiano',
        },
        {
          id: 101,
          email: 'cristianoviieira@gmail.com',
          password:
            '$2a$10$0ec80axjF54kPvZW5KRmSuQjCGK8P7vqJdoTY7KmUJ8NRzcX2v7pS', // Abacaxi123
          firstName: 'Cristiano',
          lastName: 'Vieira',
          bio: 'I am a software developer',
        },
        {
          id: 102,
          email: 'johndoe@gmail.com',
          password:
            '$2a$10$1gDf43E8HvLzTfddtRtdiOkNul/W8T/rT1GTs43s4AY2lYlYBbNfy', // Banana123
          firstName: 'John',
          lastName: 'Doe',
          bio: 'I am a web developer',
        },

        {
          id: 103,
          email: 'janedoe@yahoo.com',
          password:
            '$2a$10$YbLlDvZ2ysHEOwM.Hx0dQ.ZLO21yUM8iNoEdLX9KV.L/xDB.0WY8W', // Strawberry123
          firstName: 'Jane',
          lastName: 'Doe',
          bio: 'I am a graphic designer',
        },

        {
          id: 104,
          email: 'bobsmith@hotmail.com',
          password:
            '$2a$10$f1zFZnY05L1IwU6cNRNDCe5H6PhJ8ivV5/5TW5gs7LZ95YfC8Sn7i', // Pineapple123
          firstName: 'Bob',
          lastName: 'Smith',
          bio: 'I am a data analyst',
        },

        {
          id: 105,
          email: 'janesmith@gmail.com',
          password:
            '$2a$10$YUCydTrblPmJiCGtLd/cSeTkiMc.8Jn4B3XsMvOMCZll18mBh/l9W', // Blueberry123
          firstName: 'Jane',
          lastName: 'Smith',
          bio: 'I am a software engineer',
        },

        {
          id: 106,
          email: 'davidthomas@yahoo.com',
          password:
            '$2a$10$OF5K9I4e4p4Bo/c4OOl1ruGgdSl8M3I6bl/Lj6eNY7HbtJ9R9F7ye', // Watermelon123
          firstName: 'David',
          lastName: 'Thomas',
          bio: 'I am a UX designer',
        },

        {
          id: 107,
          email: 'sarahlee@hotmail.com',
          password:
            '$2a$10$evJXZ2h0Z.19zOL0nxm/ieoghrRfM84eDJQ2Cr1gG/aaxDrZ9j3Hq', // Mango123
          firstName: 'Sarah',
          lastName: 'Lee',
          bio: 'I am a software developer',
        },

        {
          id: 108,
          email: 'michaelsmith@gmail.com',
          password:
            '$2a$10$v.wow9X4o4P/4RW.IaF7j.qB0m3w7kUOjjiUg7xdWl9P89v7VJKbu', // Grape123
          firstName: 'Michael',
          lastName: 'Smith',
          bio: 'I am a web designer',
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
