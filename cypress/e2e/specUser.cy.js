import Register from '../pageObjects/registerPage';
import LoginPage from '../pageObjects/LoginPage';
import HomePage from '../pageObjects/HomePage';
import Products from '../pageObjects/Products';
import CheckOut from '../pageObjects/CheckOut';
import ProfilePage from '../pageObjects/profilePage';

describe('E2E Tests for E-commerce Application', () => {
  const register = new Register(); // Correct instantiation of the class
  const login = new LoginPage();
  const homePage = new HomePage();
  const products = new Products();
  const checkOut = new CheckOut();
  const profile = new ProfilePage();


  // USER PURCHASE FLOW
  describe('User Purchase Flow', () => {
    before(() => {
      cy.fixture('userData').then((user) => {
        const userInfo = user.userInfo;

        // Đăng ký người dùng
        register.visit();
        register.fillName(userInfo.name);
        register.fillEmail(userInfo.email);
        register.fillPassword(userInfo.password);
        register.fillConfirmPassword(userInfo.password);
        register.submit();
        register.validateRegistrationSuccess();

        // Đăng nhập ngay sau khi đăng ký
        login.visit();
        login.fillEmail(userInfo.email);
        login.fillPassword(userInfo.password);
        login.submit();
        login.validateLoginSuccess();
      });
    });

    //purchase flow
    it('Search for a product, add to cart, and complete checkout', () => {
      cy.fixture('userData').then((user) => {
        const shippingDetails = user.shippingDetails;
        const productName = user.productName;

        // Tìm kiếm sản phẩm với tên "Sony Playstation 5"
        homePage.searchProduct(productName.product);
        // Kiểm tra sản phẩm xuất hiện trong kết quả
        homePage.verifyProductInResults(productName.product);
        // Truy cập trang chi tiết sản phẩm
        homePage.visitProduct(productName.product);

        // Đảm bảo URL đã chuyển hướng tới trang chi tiết sản phẩm
        cy.url().should('include', '/product');
        // Thêm sản phẩm vào giỏ hàng
        products.addToCart();
        // Kiểm tra giỏ hàng đã được cập nhật
        products.validateCartUpdated();

        // Đi đến trang thanh toán
        checkOut.proceedToCheckout();
        // Nhập thông tin giao hàng, chọn phương thức và thanh toán (giả sử thanh toán thành công)
        checkOut.fillShippingDetails(shippingDetails.address, shippingDetails.city, shippingDetails.postalCode, shippingDetails.country);
        checkOut.submitOrder();
        checkOut.selectPayment();
        checkOut.verifyOrderDetailsPage();
        checkOut.updatePaymentStatus();
        checkOut.verifyOrderDetailsPageID(); // Lấy ID của đơn hàng

        cy.get('@orderId').then((orderId) => {
          // Điều hướng đến trang profile
          profile.navigateToHome();
          profile.clickUser();
          profile.selectProfile();

          // Giả lập cập nhật trạng thái thanh toán của đơn hàng bằng ID
          profile.updateOrderStatusById(orderId);

          // Xác minh trạng thái thanh toán đã được cập nhật
          profile.verifyPaymentDateById(orderId);
        });
      });
    });
  });
});