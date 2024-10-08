import Register from '../pageObjects/registerPage';
import LoginPage from '../pageObjects/LoginPage';
import HomePage from '../pageObjects/HomePage';
import Products from '../pageObjects/Products';
import CheckOut from '../pageObjects/CheckOut';
import profilePage from '../pageObjects/profilePage';

describe('E2E Tests for E-commerce Application', () => {
  const register = new Register(); // Correct instantiation of the class
  const login = new LoginPage();
  const homePage = new HomePage();
  const products = new Products();
  const checkOut = new CheckOut();
  const profile = new profilePage();
  before(() => {
    // Đăng ký người dùng
    register.visit();
    register.fillName('Harry Potter');
    register.fillEmail('harryPotter@gmail.com');
    register.fillPassword('123456');
    register.fillConfirmPassword('123456');
    register.submit();
    register.validateRegistrationSuccess();
    // Đăng nhập ngay sau khi đăng ký
    login.visit();
    login.fillEmail('harryPotter@gmail.com');
    login.fillPassword('123456');
    login.submit();
    login.validateLoginSuccess();
  });
  


  it('Search for a product, add to cart, and complete checkout', () => {
    // Tìm kiếm sản phẩm với tên "Sony Playstation 5"
    homePage.searchProduct('Sony Playstation 5');
    // Kiểm tra sản phẩm xuất hiện trong kết quả
    homePage.verifyProductInResults('Sony Playstation 5');
    // Truy cập trang chi tiết sản phẩm
    homePage.visitProduct('Sony Playstation 5');
    
    // Đảm bảo URL đã chuyển hướng tới trang chi tiết sản phẩm
    cy.url().should('include', '/product');
    // Thêm sản phẩm vào giỏ hàng
    products.addToCart();
    // Kiểm tra giỏ hàng đã được cập nhật
    products.validateCartUpdated();
    // Đi đến trang thanh toán
    checkOut.proceedToCheckout();
    // Nhập thông tin giao hàng
    checkOut.fillShippingDetails('123 Main Street', 'New York', '10001', 'USA');
    checkOut.submitOrder();
    checkOut.selectPayment();

    checkOut.verifyOrderDetailsPage();
    // checkOut.verifyPaymentMethod();
    checkOut.updatePaymentStatus();
    checkOut.verifyOrderDetailsPageID(); // Lấy ID của đơn hàng

    cy.get('@orderId').then((orderId) => {
      // Điều hướng đến trang profile
      cy.visit('http://localhost:3000/profile');
      cy.url().should('include', '/profile');
  
      // Giả lập cập nhật trạng thái thanh toán của đơn hàng bằng ID
      profile.updateOrderStatusById(orderId);
  
      // Xác minh trạng thái thanh toán đã được cập nhật
      profile.verifyPaymentDateById(orderId);
    });
  });
});


 