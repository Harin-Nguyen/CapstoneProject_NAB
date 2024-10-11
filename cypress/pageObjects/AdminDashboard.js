class AdminDashboardPage {
    // Mở dropdown Admin
    openAdminDropdown() {
        // Tìm dropdown admin
        cy.get('#adminmenu').should('be.visible').click(); 
    }

    // Điều hướng đến trang Orders
    // navigateToOrders() {
    //     //this.openAdminDropdown(); // Mở dropdown
    //     cy.get('.dropdown-item').contains('Orders').click(); // Nhấn vào mục "Orders"
    //     cy.url().should('include', '/admin/orderlist'); // Kiểm tra URL
    // }

    // Điều hướng đến trang Users
    // navigateToUsers() {
    //     this.openAdminDropdown(); // Mở dropdown
    //     cy.get('.dropdown-menu').contains('Users').click(); // Nhấn vào mục "Users"
    //     cy.url().should('include', '/admin/userlist'); // Kiểm tra URL
    // }

    // // Điều hướng đến trang Products
    navigateToProducts() {
        //this.openAdminDropdown(); // Mở dropdown
        cy.get('.dropdown-menu').contains('Products').click(); // Nhấn vào mục "Products"
        cy.url().should('include', '/admin/productlist'); // Kiểm tra URL
    }
}
export default AdminDashboardPage;
