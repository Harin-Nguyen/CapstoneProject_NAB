import AdminLogin from '../pageObjects/AdminLogin';
import AdminDashboardPage from '../pageObjects/AdminDashboard';
import ProductManagement from '../pageObjects/ProductManagement';
import OrderManagement from '../pageObjects/OrderManagement';

describe('E2E Tests for E-commerce Application', () => {
  const adminLogin = new AdminLogin();
  const dashboard = new AdminDashboardPage();
  //const product = new ProductManagement();
  const order = new OrderManagement();


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

    // const loginAdmin = () => {
    //   cy.fixture('userData').then((admin) => {
    //     const adminInfo = admin.adminInfo;
    //     adminLogin.visit();
    //     adminLogin.fillEmail(adminInfo.email);
    //     adminLogin.fillPassword(adminInfo.password);
    //     adminLogin.submit();
    //     adminLogin.validateLoginSuccess();
    //   });
    // };

      it('should find a paid order and click details', () => {
        dashboard.openAdminDropdown();
        dashboard.navigateToOrders();

        order.findAndClickRandomPaidOrder();
        order.markAsDelivered();
      });

      // it('Create and delete a product', () => {
      //   //cy.visit('http://localhost:3000/login')
      //   loginAdmin();
      //   dashboard.openAdminDropdown();
      //   dashboard.navigateToProducts();
    
      //   cy.fixture('userData').then((data) => {
      //     const newProduct = data.newProduct; // Lấy dữ liệu sản phẩm mới từ fixture
      //     const deleteProduct = data.deleteProduct; // Lấy dữ liệu sản phẩm để xóa từ fixture
    
      //     product.createProduct(newProduct); // Tạo sản phẩm mới
      //     product.deleteProduct(deleteProduct.name); // Xóa sản phẩm
      //     product.searchProduct(newProduct.name);
      //     product.visitProduct(newProduct.name);
      //   });
      //});
  });

});