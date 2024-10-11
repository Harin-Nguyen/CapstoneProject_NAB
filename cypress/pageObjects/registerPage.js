class Register {
    visit() {
        cy.visit('http://localhost:3000/register?redirect=/');
        //Truy cập trang Đăng kí cho người dùng mới
    }
  
    fillName(name){
        cy.get("input[placeholder='Enter name']").type(name);
        //Điền tên người dùng, sau đăng kí thành công sẽ hiển thị trên Profile
    }
  
    fillEmail(email) {
        cy.get("input[placeholder='Enter email']").type(email);
        //Điền địa chỉ email
    }
  
    fillPassword(password) {
        cy.get("input[placeholder='Enter password']").type(password);
        //Điền mật khẩu đăng nhập
    }
  
    fillConfirmPassword(confirmPassword) {
        cy.get("input[placeholder='Confirm password']").type(confirmPassword);
        //Điền xác nhận lại mật khẩu đăng nhập
    }    
  
    submit() {
        cy.get(".btn.btn-primary").click();
        //Bấm submit để tạo tài khoản
    }
  
    validateRegistrationSuccess() {
        cy.url().should('include', 'http://localhost:3000/');
        //Xác nhận đăng kí thành công, kiểm tra URL có chứa đúng đường dẫn về homepage
    }
  //Trường hợp user đã có tài khoản
    // clickLoginLink() {
    //     cy.contains('Already have an account? Login').click();
    //     //Bấm vào hypelink Login để về Loginpage
    // }  
}
export default Register;  // Export the class with a capital 'R'
