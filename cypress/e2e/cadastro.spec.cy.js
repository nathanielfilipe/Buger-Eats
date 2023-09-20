describe('Cadastro', ()=>{
    it('Usuário deve se tornar um entregador', ()=>{
        cy.viewport(1440, 900)
        cy.visit('https://buger-eats.vercel.app')

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

        var entregador = {
            nome: 'Lince Da Silva',
            cpf: '15463569865',
            email: 'lincedasilva@gmail.com',
            whatsapp: '31998965526',
            endereco: {
                cep: '30140125',
                rua: 'Praça Júlio Garcia',
                numero: '1500',
                complemento: 'Ap 904',
                bairro: 'Savassi',
                cidade_uf: 'Belo Horizonte/MG'
            },
            metodo_entrega: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        cy.get('input[name="name"]').type(entregador.nome)
        cy.get('input[name="cpf"]').type(entregador.cpf)
        cy.get('input[name="email"]').type(entregador.email)
        cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

        cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
        cy.get('input[type=button][value="Buscar CEP"]').click()

        cy.get('input[name="address-number"]').type(entregador.endereco.numero)
        cy.get('input[name="address-details"]').type(entregador.endereco.complemento)
        
        cy.get('input[name="address"]').should('have.value', entregador.endereco.rua)
        cy.get('input[name="district"]').should('have.value', entregador.endereco.bairro)
        cy.get('input[name="city-uf"]').should('have.value', entregador.endereco.cidade_uf)


        cy.contains('.delivery-method li', entregador.metodo_entrega).click()
        
        cy.get('input[accept^="image"]').attachFile('/images/' + entregador.cnh)
        cy.get('button[type][class="button-success"]').click()
        cy.get('#swal2-html-container').should('have.text', 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.')

    })  
})