var faker = require('faker')
var cpf = require('gerador-validador-cpf')


export default {

    deliver: function() {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()
        
        
        var data = {
                nome: `${firstName} ${lastName}`,
                cpf: cpf.generate(),
                email: faker.internet.email(firstName),
                whatsapp: '71999999999',
                endereco: {
                    cep: '42706100',
                    rua: 'Rua Milena Ramone Alencar Ramos',
                    numero: '123',
                    complemento: 'casa',
                    cidade_uf: 'Lauro de Freitas/BA'
                },
                metodo_entrega: {
                    metodo1: 'Moto',
                    metodo2: 'Bike Elétrica',
                    metodo3: 'Van/Carro'
                },
                cnh: 'cnh-digital.jpg'
        }

        return data
    }
}