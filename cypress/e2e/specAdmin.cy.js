import AdminLogin from '../pageObjects/AdminLogin';
import AdminDashboardPage from '../pageObjects/AdminDashboard';
import ProductManagement from '../pageObjects/ProductManagement';

describe('E2E Tests for E-commerce Application', () => {
  const adminLogin = new AdminLogin();
  const dashboard = new AdminDashboardPage();
  const product = new ProductManagement();

  // ADMIN FLOW
  describe('Admin Flow', () => {
    before(() => {
      cy.fixture('userData').then((admin) => {
        const adminInfo = admin.adminInfo;

        // Đăng nhập Admin
        adminLogin.visit();
        adminLogin.fillEmail(adminInfo.email);
        adminLogin.fillPassword(adminInfo.password);
        adminLogin.submit();
        adminLogin.validateLoginSuccess();
      });
    });

      // it('Admin confirms order has been delivered', () => {
      //   // Điều hướng đến trang quản lý sản phẩm
      //   dashboard.openAdminDropdown();
      //   dashboard.navigateToOrders();
      //   order.viewOrderList();
      //   // order.viewOrderDetailsIfPaid();
      //   // order.markOrderAsDelivered();
      //   order.selectPaidOrderWithoutDelivery();
      // });

      it('Create and delete a product', () => {
        dashboard.openAdminDropdown();
        dashboard.navigateToProducts();
    
        cy.fixture('userData').then((data) => {
          const newProduct = data.newProduct; // Lấy dữ liệu sản phẩm mới từ fixture
          const deleteProduct = data.deleteProduct; // Lấy dữ liệu sản phẩm để xóa từ fixture
    
          product.createProduct(newProduct); // Tạo sản phẩm mới
          product.deleteProduct(deleteProduct.name); // Xóa sản phẩm
          product.searchProduct(newProduct.name);
          product.visitProduct(newProduct.name);
        });
    });
  });

});