class Register {
  visit() {
      cy.visit('http://localhost:3000/register?redirect=/');
  }

  fillName(name){
      cy.get("input[placeholder='Enter name']").type(name);
  }

  fillEmail(email) {
      cy.get("input[placeholder='Enter email']").type(email);
  }

  fillPassword(password) {
      cy.get("input[placeholder='Enter password']").type(password);
  }

  fillConfirmPassword(confirmPassword) {
      cy.get("input[placeholder='Confirm password']").type(confirmPassword);
  }    

  submit() {
      cy.get(".btn.btn-primary").click(); 
  }

  validateRegistrationSuccess() {
      cy.url().should('include', 'http://localhost:3000/');
  }

  clickLoginLink() {
      cy.contains('Already have an account? Login').click();
  }
}
export default Register;  // Export the class with a capital 'R'
