module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'cintia.sc.samara22@gmail.com',
          password:
            '$2a$10$jZEYJgXWOlpZHYj0Ek2dlOewoSbm.pz6coG4qjvRoojSh0FEKzcnK',
          firstName: 'Cíntia',
          lastName: 'Samara',
          bio: 'Olá! Eu sou uma garota de 23 anos, natural do Rio Grande do Sul, conhecida por sua bela paisagem e cultura rica. Meu cabelo azul é uma extensão da minha personalidade criativa e descolada. Estou atualmente em um relacionamento feliz e apaixonado. Gosto de música, filmes e viagens. Acredito na importância de ser autêntico e viver a vida ao máximo.',
          phrase: 'A vida é uma viagem, não um destino.',
          birthday: '1999-08-10',
          relationship: 'Namorando',
          country: 'Brasil',
          sex: 'Feminino',
          cep: '93180000',
          state: 'Rio Grande do Sul',
          language: 'Português',
        },
        {
          email: 'cristianoviieira@gmail.com',
          password:
            '$2a$10$0ec80axjF54kPvZW5KRmSuQjCGK8P7vqJdoTY7KmUJ8NRzcX2v7pS', // Abacaxi123
          firstName: 'Cristiano',
          lastName: 'Vieira',
          bio: 'I am a software developer',
          birthday: '1996-12-10',
          relationship: 'Namorando',
          country: 'Brasil',
          sex: 'Masculino',
          cep: '93530044',
          state: 'Rio Grande do Sul',
          language: 'Português',
        },
        {
          email: 'carolinasilva@gmail.com',
          password:
            '$2a$10$6ywuB6UqMa6HyIH.bSX.TORgsJZcRzKP67QXibjC4am4v4MwR0b7O',
          firstName: 'Carolina',
          lastName: 'Silva',
          bio: 'I am a graphic designer',
          phrase: 'A vida é uma viagem, não um destino.',
          birthday: '1992-05-21',
          relationship: 'Solteira',
          country: 'Brasil',
          sex: 'Feminino',
          cep: '06447160',
          state: 'São Paulo',
          language: 'Português',
        },
        {
          email: 'johndoe@gmail.com',
          password:
            '$2a$10$4GpmYsQ2fMwRrgyV.iYGgeaMN89knT7q3MKxASZV7vTk8BpWLEriS',
          firstName: 'John',
          lastName: 'Doe',
          bio: 'I am a writer',
          phrase: 'A vida é uma viagem, não um destino.',
          birthday: '1985-08-15',
          relationship: 'Solteiro',
          country: 'Estados Unidos',
          sex: 'Masculino',
          cep: '10001',
          state: 'Nova Iorque',
          language: 'Inglês',
        },
        {
          email: 'maria.silva@hotmail.com',
          password:
            '$2a$10$KWnc2hAiSYue5Wc1HeG5veEUPC7Fh/vLf8nC/ZQLXmtgMXZa6N25i',
          firstName: 'Maria',
          lastName: 'Silva',
          bio: 'I am a teacher',
          phrase: 'A vida é uma viagem, não um destino.',
          birthday: '1980-01-02',
          relationship: 'Casada',
          country: 'Brasil',
          sex: 'Feminino',
          cep: '30140132',
          state: 'Minas Gerais',
          language: 'Português',
        },
        {
          email: 'alexandre.costa@gmail.com',
          password:
            '$2a$10$zR/wvccj2dJ/Pn9hYnOOI.Bq3fM5JwH5pw5pWt8bs7VJLhD5/mC9K',
          firstName: 'Alexandre',
          lastName: 'Costa',
          bio: 'I am a doctor',
          birthday: '1978-11-23',
          relationship: 'Divorciado',
          country: 'Brasil',
          sex: 'Masculino',
          cep: '88095180',
          state: 'Santa Catarina',
          language: 'Português',
        },
        {
          email: 'davidthomas@yahoo.com',
          password:
            '$2a$10$OF5K9I4e4p4Bo/c4OOl1ruGgdSl8M3I6bl/Lj6eNY7HbtJ9R9F7ye',
          firstName: 'David',
          lastName: 'Thomas',
          bio: 'I am a UX designer',
        },
        {
          email: 'sarahlee@hotmail.com',
          password:
            '$2a$10$evJXZ2h0Z.19zOL0nxm/ieoghrRfM84eDJQ2Cr1gG/aaxDrZ9j3Hq',
          firstName: 'Sarah',
          lastName: 'Lee',
          bio: 'I am a software developer',
        },
        {
          email: 'michaelsmith@gmail.com',
          password:
            '$2a$10$v.wow9X4o4P/4RW.IaF7j.qB0m3w7kUOjjiUg7xdWl9P89v7VJKbu',
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
