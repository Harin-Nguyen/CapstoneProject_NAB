class CheckoutPage {
    // Return home:
    navigateToHome() {
        cy.visit('http://localhost:3000');
    }

    // Chọn button username:
    clickUser() {
        cy.get('#username').should('be.visible').click(); // Giả sử có một menu người dùng có class là 'user-menu'
    }

    // Mở trang profile user:
    selectProfile() {
        cy.get('.dropdown-item').contains('Profile').click(); // Tìm button profile và click vào
        cy.url().should('include', '/profile');
    }

    // Click nút 'details' cho đơn hàng mới nhất trong danh sách 'My Orders'
    viewLatestOrderDetails() {
        // Tìm danh sách đơn hàng và nhấn vào nút 'details' của đơn hàng đầu tiên
        cy.get('a.btn.btn-light').contains('Details').first().click(); // Chọn và click nút Details đầu tiên
    }
}
export default CheckoutPage;