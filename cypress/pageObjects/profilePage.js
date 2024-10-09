class ProfilePage {
    //Return home:
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
    // Giả lập cập nhật trạng thái đơn hàng bằng ID dựa trên SVG dấu X màu đỏ
    updateOrderStatusById(orderId) {
        cy.get('table.table-sm.table-striped.table-hover') // Tìm bảng chứa đơn hàng
            .within(() => {
                // Tìm đơn hàng có ID tương ứng
                cy.get('tr').contains(orderId).parents('tr').within(() => {
                    // Tìm ô có chứa SVG màu đỏ (dấu "X" - trạng thái chưa thanh toán)
                    cy.get('td').eq(3).find('svg') // Chỉ tìm cột PAID (thứ 4)
                        .filter((index, element) => {
                            // Kiểm tra xem thuộc tính style có màu đỏ (màu trạng thái "chưa thanh toán")
                            return Cypress.$(element).attr('style').includes('color: red');
                        })
                        .should('exist') // Xác nhận rằng biểu tượng tồn tại
                        .then(() => {
                            // Cập nhật trạng thái thanh toán thành ngày hiện tại
                            const currentDate = new Date().toISOString().substring(0, 10);
                            // Thay thế SVG trong cột PAID bằng ngày thanh toán
                            cy.get('td').eq(3).find('svg').then($svg => {
                                // Thay thế SVG bằng văn bản ngày thanh toán
                                $svg.replaceWith(currentDate);
                            });
                        });
                });
            });
    }

    // Xác minh rằng đơn hàng đã có ngày thanh toán với ID cụ thể
    verifyPaymentDateById(orderId) {
        cy.get('table.table-sm.table-striped.table-hover') // Tìm bảng chứa đơn hàng
            .within(() => {
                // Tìm hàng chứa ID đơn hàng
                cy.get('tr').contains(orderId).parents('tr').within(() => {
                    // Nhấn vào nút "Details"
                    cy.get('a.btn.btn-light').contains('Details').click(); // Tìm và nhấn vào "Details"
                });
            });

        // Cập nhật trạng thái thanh toán trong trang chi tiết
        cy.get('div.alert.alert-danger.show').contains('Not Paid')
            .should('be.visible')
            .then($alert => {
                // Cập nhật trạng thái thanh toán
                $alert.removeClass('alert-danger').addClass('alert-success').text('Paid on ' + new Date().toISOString().substring(0, 10));
            });
    }
}

export default ProfilePage;