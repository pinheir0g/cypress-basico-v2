/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function(){
    const form = {
        firstName: 'Gustavo', 
        lastName: 'Pinheiro',
        email: 'test@cypress.t2m',
        text: 'Estou estudando Cypress e vou conquistar uma vaga de trainee de QA na T2M, Amém? Obrigado Deuuuus'
    }
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function(){
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário',  function(){
        cy.get('#firstName').type('Gustavo')
        cy.get('#lastName').type('Pinheiro')
        cy.get('#email').type('test@cypress.t2m')
        cy.get('#open-text-area').type('Estou estudando Cypress e vou conquistar uma vaga de trainee de QA na T2M, Amém? Obrigado Deuuuus', {delay : 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Gustavo')
        cy.get('#lastName').type('Pinheiro')
        cy.get('#email').type('testcypress.t2m')
        cy.get('#open-text-area').type('Estou estudando Cypress e vou conquistar uma vaga de trainee de QA na T2M, Amém? Obrigado Deuuuus', {delay : 0})
        cy.contains('button[type="submit"]', 'Enviar').click()
        cy.get('.error strong')
            .should('be.visible')
            .and('have.text', 'Valide os campos obrigatórios!')
    })
    it('verificar se campo telefone continua vazio quando preenchido com valor não-numéricos', function(){
        cy.get('#phone').type('phone').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Gustavo')
        cy.get('#lastName').type('Pinheiro')
        cy.get('#email').type('test@cypress.t2m')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Estou estudando Cypress e vou conquistar uma vaga de trainee de QA na T2M, Amém? Obrigado Deuuuus', {delay : 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error strong')
            .should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Gustavo').should('have.value', 'Gustavo')
            .clear().should('have.value', '')
        cy.get('#lastName')
            .type('Pinheiro').should('have.value', 'Pinheiro')
            .clear().should('have.value', '')
        cy.get('#email')
            .type('test@cypress.t2m').should('have.value', 'test@cypress.t2m')
            .clear().should('have.value', '')
        cy.get('#phone')
            .type('21976555632').should('have.value', '21976555632')
            .clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error strong')
            .should('be.visible')
            .and('have.text', 'Valide os campos obrigatórios!')
    })

    it('envia o formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit(form)
        cy.get('.success').should('be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('[type="radio"]').check('feedback').should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('[type="radio"]')
        .should('have.length', 3)
        .each($radio => {
            cy.wrap($radio).check()
            .should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action : "drag-drop"})
        .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@sampleFile')
        .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })
})