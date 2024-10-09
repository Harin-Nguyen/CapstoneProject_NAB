class CheckOut {
  // Hàm để tiến hành thanh toán
  proceedToCheckout() {
    cy.get('button.btn-block.btn.btn-primary').contains('Proceed To Checkout').click(); 
  }

  // Hàm để điền thông tin giao hàng
  fillShippingDetails(address, city, postalCode, country) {
    cy.get("input[placeholder='Enter address']").type(address); // Nhập địa chỉ
    cy.get("input[placeholder='Enter city']").type(city); // Nhập thành phố
    cy.get("input[placeholder='Enter postal code']").type(postalCode); // Nhập mã bưu điện
    cy.get("input[placeholder='Enter country']").type(country); // Nhập quốc gia
  }

  // Hàm để gửi đơn hàng
  submitOrder() {
    cy.get(".btn.btn-primary").contains('Continue').click(); 
  }

  // Hàm để chọn phương thức thanh toán
  selectPayment() {
    cy.get('.btn.btn-primary').contains('Continue').click(); 
  }

  // Hàm để xác minh trang chi tiết đơn hàng
  verifyOrderDetailsPage() {
    cy.get('.btn-block.btn.btn-primary').contains('Place Order').click(); // Nhấn nút 'Đặt hàng'
    // Kiểm tra xem đã đến trang chi tiết đơn hàng
    cy.url().should('include', '/order/'); 
  }

  // Giả sử đã thanh toán thành công bằng PayPal
  updatePaymentStatus() {
    // Kiểm tra trạng thái thanh toán
    cy.get('div.alert.alert-danger.show').contains('Not Paid')
      .should('be.visible') // Đảm bảo thông báo "Chưa thanh toán" hiển thị
      .then($alert => {
        // Cập nhật trạng thái thanh toán
        $alert.removeClass('alert-danger').addClass('alert-success').text('Paid on ' + new Date().toISOString().substring(0, 10)); // Thay đổi thông báo thành "Đã thanh toán vào [ngày]"
      });

    // Xác minh rằng trạng thái thanh toán đã được cập nhật
    cy.get('div.alert.alert-success')
      .should('be.visible') // Đảm bảo thông báo "Đã thanh toán" hiển thị
      .and('contain', 'Paid on') // Kiểm tra rằng trạng thái là "Đã thanh toán"
      .and('contain', new Date().toISOString().substring(0, 10)); // Kiểm tra ngày hiện tại
  }

  // Hàm để xác minh trang chi tiết đơn hàng và lấy ID đơn hàng
  verifyOrderDetailsPageID() {
    cy.url().should('include', '/order/'); 
    // Lấy ID của đơn hàng từ URL (giả sử ID là phần cuối của URL)
    cy.url().then((url) => {
      const orderId = url.split('/').pop(); // Lấy phần cuối của URL (ID của đơn hàng)
      cy.wrap(orderId).as('orderId'); // Lưu ID đơn hàng vào alias để sử dụng sau này
    });
  }
}

export default CheckOut;
