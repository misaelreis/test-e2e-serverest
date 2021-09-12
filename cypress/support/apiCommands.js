Cypress.Commands.add('createUserFix', () => {
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
            "email": "misael@gmail.com",
            "password": "teste"
        }
    }).then(({body}) => {
        window.localStorage.setItem('serverest/userNome', 'Misael Reis')
        window.localStorage.setItem('serverest/userEmail','misael@qa.com.br')
        window.localStorage.setItem('serverest/userToken', JSON.stringify(body.authorization))
    })
})

Cypress.Commands.add('createLoginUser', () => {
    cy.createUserFix()
    cy.request({
        method: 'POST',
        Headers:{'accept':'/'},
        url: 'https://serverest.dev/login',
        body:{
            "email": "misael@email.com",
            "password": "teste"
        }
    }).then(({body}) => {
        window.localStorage.setItem('serverest/userNome', 'Misael Usuario')
        window.localStorage.setItem('serverest/userEmail','misael@qa.com.br')
        window.localStorage.setItem('serverest/userToken', JSON.stringify(body.authorization))
    })
})