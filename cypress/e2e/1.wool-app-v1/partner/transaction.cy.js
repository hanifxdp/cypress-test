describe(`Transaction Feature`, ()=>{
    beforeEach(()=>{
        cy.login();
        cy.visit('/transaction');
    })
    it(`(+)Verify that user can view the list of transaction`, ()=>{

    })
    it(`(-)Verify that user still can see the transaction list even though user never made a transaction`, ()=>{

    })
    it(`(+)Verify that user can view the transaction detail`, ()=>{

    })
    it(`(-)Verify that user cannot see the transaction detail if they never make a transaction`,()=>{

    })
})