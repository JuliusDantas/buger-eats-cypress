import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
// import { it } from 'faker/lib/locales'
// import { it } from 'faker/lib/locales'

describe('Cadastro', () => {
    
    beforeEach(function() {
        cy.fixture('deliver.json').then((d) => {
            this.deliver = d;
        })

        
    })

    it('Usuario deve se tornar um entregador', function() {

        var deliver = signupFactory.deliver()
        
        signup.go()
        // signup.fillForm(this.deliver.signup)
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
        signup.confirmModal()

    })
    it('CPF Incorreto', function() {

        var deliver = signupFactory.deliver()

        deliver.cpf = '000001852'
        
        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        signup.alertMessageSouldBe('Oops! CPF inválido')
       

    })

    it('Valida Nome', function() {

        signup.go()
        signup.fillForm2(this.deliver.nome_inv)
        signup.submit()

        signup.alertMessageSouldBe('É necessário informar o nome')
        
    })

    it('Invalid email', function() {

        var deliver = signupFactory.deliver()

        deliver.email = 'teste.com.br'
        
        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        signup.alertMessageSouldBe('Oops! Email com formato inválido.')
        
    })

    context('Required fields', function() {

        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'delivery_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]

        before(function(){
            signup.go()
            signup.submit()

        })

        messages.forEach(function(m){
            it(`${m.field} is riquired`, function(){
                signup.alertMessageSouldBe(m.output)
            })
        })
    })

    it('Message CNH', function() {

        const expectedMessageFormCNH = 'Atenção: CNH é obrigatória somente para veículos motorizados. Mesmo assim é importante enviar um documento com foto para aprovação do seu cadastro.'

        signup.go()
        signup.submit()

        
        signup.alertWarningSouldBe(expectedMessageFormCNH)
    })
    
})