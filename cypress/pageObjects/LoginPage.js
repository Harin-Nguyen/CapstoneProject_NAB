// Tạo 1 class để loginPage:
class loginPage {
  visit() {
    // Sử dụng Cypress để mở url trang web:
    cy.visit('http://localhost:3000/login');
  }

  // Điền email vào trường email:
  fillEmail(email) {
    // Tìm trường nhập email bằng placeholder và nhập giá trị email
    cy.get("input[placeholder='Enter email']").type(email);
  }

  // Điền mật khẩu vào trường nhập password:
  fillPassword(password) {
    // Tìm trường nhập mật khẩu bằng placeholder và nhập giá trị mật khẩu:
    cy.get("input[placeholder='Enter password']").type(password);
  }

  // Click vào nút đăng nhập:
  submit() {
    // Tìm nút đăng nhập bằng class và click:
    cy.get(".btn.btn-primary").click();
  }

  // Xác nhận việc đăng nhập thành công:
  validateLoginSuccess() {
    // Kiểm tra URL hiện tại có chứa đường dẫn chính xác sau khi đăng nhập không:
    cy.url().should('eq', 'http://localhost:3000/');
  }
}

// Xuất class loginPage để có thể sử dụng:
export default loginPage;
