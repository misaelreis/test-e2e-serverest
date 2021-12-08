Cypress.Commands.add('createUserFix', () => {
  cy.request({
    method: 'POST',
    failOnStatusCode: false,
    Headers: { accept: '/' },
    url: 'https://serverest.dev/usuarios',
    body: {
      nome: 'Misael Adm',
      email: Cypress.env('admUser'),
      password: Cypress.env('password'),
      administrador: 'true',
    },
  });

  cy.request({
    method: 'POST',
    failOnStatusCode: false,
    Headers: { accept: '/' },
    url: 'https://serverest.dev/usuarios',
    body: {
      nome: 'Misael Usuario',
      email: Cypress.env('user'),
      password: Cypress.env('password'),
      administrador: 'false',
    },
  });
});

Cypress.Commands.add('createLoginAdm', () => {
  cy.createUserFix();
  cy.request({
    method: 'POST',
    Headers: { accept: '/' },
    url: 'https://serverest.dev/login',
    body: {
      email: Cypress.env('admUser'),
      password: Cypress.env('password'),
    },
  }).then(({ body }) => {
    window.localStorage.setItem('serverest/userNome', 'Misael Adm');
    window.localStorage.setItem('serverest/userEmail', Cypress.env('admUser'));
    window.localStorage.setItem('serverest/userToken', (body.authorization));
  });
});

Cypress.Commands.add('createLoginUser', () => {
  cy.createUserFix();
  cy.request({
    method: 'POST',
    Headers: { accept: '/' },
    url: 'https://serverest.dev/login',
    body: {
      email: Cypress.env('user'),
      password: Cypress.env('password'),
    },
  }).then(({ body }) => {
    window.localStorage.setItem('serverest/userNome', 'Misael Usuario');
    window.localStorage.setItem('serverest/userEmail', Cypress.env('user'));
    window.localStorage.setItem('serverest/userToken', (body.authorization));
  });
});

Cypress.Commands.add('createProduct', () => {
  cy.createLoginAdm().then(({ body }) => {
    cy.request({
      failOnStatusCode: false,
      method: 'POST',
      headers: { Authorization: body.authorization },
      url: 'https://serverest.dev/produtos',
      body: {
        nome: 'Teste Zael Uai',
        preco: 470,
        descricao: 'Mouse',
        quantidade: 381,
      },
    });
  });
});
