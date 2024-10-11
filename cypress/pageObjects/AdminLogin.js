class AdminLogin{
    visit(){
        cy.visit('http://localhost:3000/login');
    }

    fillEmail(adEmail) {
        // Tìm trường nhập email bằng placeholder và nhập giá trị email
        cy.get("input[placeholder='Enter email']").type(adEmail);
    }
    
      // Điền mật khẩu vào trường nhập password:
      fillPassword(adPass) {
        // Tìm trường nhập mật khẩu bằng placeholder và nhập giá trị mật khẩu:
        cy.get("input[placeholder='Enter password']").type(adPass);
    }
    
      // Click vào nút đăng nhập:
      submit() {
        // Tìm nút đăng nhập bằng class và click:
        cy.get(".btn.btn-primary").click();
    }

    validateLoginSuccess() {
        // Kiểm tra URL hiện tại có chứa đường dẫn chính xác sau khi đăng nhập không:
        cy.url().should('eq', 'http://localhost:3000/');
    }
}

export default AdminLogin;