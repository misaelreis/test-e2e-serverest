const faker = require('faker')
const user = {
    name: faker.name.firstName(),
    email : faker.internet.email(),
    password: 'teste'
}

Cypress.Commands.add('createUserFix', () => {
    cy.request({
        method: 'POST',
        failOnStatusCode: false,
        Headers:{'accept':'/'},
        url: 'https://serverest.dev/usuarios',
        body:{
            "nome": "Misael Adm",
            "email": "misael@gmail.com.br",
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
            "email": "misael@gmail.com",
            "password": "teste",
            "administrador": "false"
        }
    })
})

Cypress.Commands.add('createLoginAdm', () => {
    cy.createUserFix()
    cy.request({
        method: 'POST',
        Headers:{'accept':'/'},
        url: 'https://serverest.dev/login',
        body:{
            "email": "misael@gmail.com.br",
            "password": "teste"
        }
    }).then(({body}) => {
        window.localStorage.setItem('serverest/userNome', 'Misael Adm')
        window.localStorage.setItem('serverest/userEmail','misael@gmail.com.br')
        window.localStorage.setItem('serverest/userToken', (body.authorization))
    })
})

Cypress.Commands.add('createLoginUser', () => {
    cy.createUserFix()
    cy.request({
        method: 'POST',
        Headers:{'accept':'/'},
        url: 'https://serverest.dev/login',
        body:{
            "email": "misael@gmail.com",
            "password": "teste"
        }
    }).then(({body}) => {
        window.localStorage.setItem('serverest/userNome', 'Misael Usuario')
        window.localStorage.setItem('serverest/userEmail','misael@gmail.com')
        window.localStorage.setItem('serverest/userToken', (body.authorization))
    })
})