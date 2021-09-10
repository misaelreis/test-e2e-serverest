Cypress.Commands.add('CreateUserFix', () => {
    cy.request({
        method: 'POST',
        failOnStatusCode: false,
        Headers:{'accept':'/'},
        url: 'https://serverest.dev/usuarios',
        body:{
            "nome": "Misael Reis",
            "email": "misael@qa.com.br",
            "password": "teste",
            "administrador": "true"
        }
    })

    cy.request({
        method: 'POST',
        failOnStatusCode: false,
        Headers:{'accept':'/'},
        url: 'https://serverest.dev/usuarios',
        body:{
            "nome": "Misael Usuario",
            "email": "misael@qamisael@email.com",
            "password": "teste",
            "administrador": "true"
        }
    })
})