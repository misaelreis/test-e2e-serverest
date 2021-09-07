/// <reference types = "Cypress" />

import{ visit, checkPlaceHolder, validaTexto, validaUrl, validaElementoVisivel, clicar, digitar }from "../actions/principal.action";
import login from '../page/login.page'

describe('testes de login', ()=>{
    beforeEach(()=>{
        visit()
    })

    it('valida página de login', ()=>{
        checkPlaceHolder(login.imputEmail,'Digite seu email')
        checkPlaceHolder(login.imputSenha, 'Digite sua senha')
        validaTexto(login.textLogin, 'Login')
        validaTexto(login.textCadastro, 'Não é cadastrado?Cadastre-se')
        validaElementoVisivel(login.btnEntrar)
        validaUrl('https://front.serverest.dev/login')
    })

    it('valida login sucesso', ()=>{
        digitar(login.imputEmail, 'misael@qa.com.br')
        digitar(login.imputSenha, 'teste')
        clicar(login.btnEntrar)
        validaUrl('https://front.serverest.dev/admin/home')
    })

    it('valida email incorreto', ()=>{
        digitar(login.imputEmail, 'misael@qc.com.br')
        digitar(login.imputSenha, 'teste')
        clicar(login.btnEntrar)
        validaTexto(login.textAlert, 'Email e/ou senha inválidos')
    })

    it('valida senha incorreta', ()=>{
        digitar(login.imputEmail, 'misael@qa.com.br')
        digitar(login.imputSenha, 'testeum')
        clicar(login.btnEntrar)
        validaTexto(login.textAlert, 'Email e/ou senha inválidos')
    })

    it('valida logout sucesso', ()=>{
        digitar(login.imputEmail, 'misael@qa.com.br')
        digitar(login.imputSenha, 'teste')
        clicar(login.btnEntrar)
        validaElementoVisivel(login.btnEntrar)
        validaUrl('https://front.serverest.dev/admin/home')
        clicar(login.btnSair)
        validaUrl('https://front.serverest.dev/login')
    })

    it('valida login sem senha', ()=>{
        digitar(login.imputEmail, 'misael.front@email.com')
        clicar(login.btnEntrar)
        validaTexto(login.textAlert, 'password não pode ficar em branco')
    })

    it('valida email invalido', ()=>{
        digitar(login.imputEmail, 'm@a')
        digitar(login.imputSenha, 'test')
        clicar(login.btnEntrar)
        validaTexto(login.textAlert, 'email deve ser um email válido')
    })

    it('valida login sem email', ()=>{
        digitar(login.imputSenha, 'teste')
        clicar(login.btnEntrar)
        validaTexto(login.textAlert, 'email não pode ficar em branco')
    })

    it('valida login sem email e senha', ()=>{
        clicar(login.btnEntrar)
        validaTexto(login.textAlertUm, 'email não pode ficar em branco')
        validaTexto(login.textAlertDois, 'password não pode ficar em branco')
    })
})