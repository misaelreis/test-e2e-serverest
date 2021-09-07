export function visit(){
    cy.visit('')
}

export function validaUrl(ok){
    cy.url()
    .should('be.equal', ok)
}

export function checkPlaceHolder(element,text){
    cy.get(element).should('have.attr', 'placeholder', text)
}

export function validaTexto(element,text){
    cy.get(element).should('have.text', text)
}

export function validaElementoVisivel(element){
    cy.get(element).should('be.visible')
}

export function clicar(element){
    cy.get(element).click()
}

export function digitar(element,text){
    cy.get(element).type(text)
}