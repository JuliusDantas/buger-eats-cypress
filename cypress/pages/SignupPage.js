class SignupPage {
    go(){
        
        cy.visit('/')
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(entregador){
        cy.get('input[name="fullName"]').type(entregador.nome)
        // cy.get('input[name="name"]').clear()
        cy.get('input[name="cpf"]').type(entregador.cpf)
        cy.get('input[name="email"]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

        // Preenchendo o endereço
        cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        // cy.get('input[name="address-details"]').type(entregador.endereco.complemento)
        cy.get('input[name="address-number"]').type(entregador.endereco.numero)
        cy.get('input[name="address-details"]').type(entregador.endereco.complemento)
        

        cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
        cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade_uf)

        //Marcando Métodos
        cy.contains('.delivery-method li span', entregador.metodo_entrega.metodo1).click()
        cy.contains('.delivery-method li span', entregador.metodo_entrega.metodo2).click()
        cy.contains('.delivery-method li span', entregador.metodo_entrega.metodo3).click()

        //Desmarcando Métodos
        cy.contains('.delivery-method li span', entregador.metodo_entrega.metodo1).click()
        cy.contains('.delivery-method li span', entregador.metodo_entrega.metodo2).click()

        //upload arquivo       
        cy.get('input[accept^="image"][type=file]').attachFile('/images/' + entregador.cnh)
    }
    fillForm2(entregador){
        // cy.get('input[name="fullName"]').type(entregador.nome).screenshot()
        // cy.get('input[name="fullName"]').clear()
        cy.get('input[name="cpf"]').type(entregador.cpf)
        cy.get('input[name="email"]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

        // Preenchendo o endereço
        cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"]').type(entregador.endereco.numero)
        cy.get('input[name="address-details"]').type(entregador.endereco.complemento)

        cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
        cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade_uf)

        //Marcando Métodos
        cy.contains('.delivery-method li span', entregador.metodo_entrega.metodo1).click()
        cy.contains('.delivery-method li span', entregador.metodo_entrega.metodo2).click()
        cy.contains('.delivery-method li span', entregador.metodo_entrega.metodo3).click()

        //Desmarcando Métodos
        cy.contains('.delivery-method li span', entregador.metodo_entrega.metodo1).click()
        cy.contains('.delivery-method li span', entregador.metodo_entrega.metodo2).click()

        //upload arquivo       
        cy.get('input[accept^="image"][type=file]').attachFile('/images/' + entregador.cnh)
    }

    submit(){
        //Confirmar cadastros
        cy.get('form button[type=submit]').click()
    }

    modalContentShouldBe(expectedMessage){
        //validando cadastramento        
        cy.get('.swal2-container div[class="swal2-html-container"]').should('have.text', expectedMessage)       
    }

    confirmModal(){
        //Mensagem validada clica em fechar
        cy.get('.swal2-actions button[class^=swal2-confirm]').click()
    }

    alertMessageSouldBe(expectedMessage){
        // cy.get('.alert-error').should('have.text', expectedMessage)
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }

    alertWarningSouldBe(expectedMessage){
        // cy.get('.alert-warning').should('have.text', expectedMessage)
        cy.contains('.alert-warning', expectedMessage).should('be.visible')
    }


}

export default new SignupPage;