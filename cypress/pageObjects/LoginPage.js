class loginPage{
    visit() {
        cy.visit('http://localhost:3000/login');
      }
    
      fillEmail(email) {
        cy.get("input[placeholder='Enter email']").type(email);
      }
    
      fillPassword(password) {
        cy.get("input[placeholder='Enter password']").type(password);
      }
    
      submit() {
        cy.get(".btn.btn-primary").click(); 
      }
    
      validateLoginSuccess() {
        cy.url().should('include', 'http://localhost:3000/');
      }
}
export default loginPage;
