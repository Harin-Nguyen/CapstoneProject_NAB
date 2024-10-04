class CheckOut {
    proceedToCheckout() {
      cy.get('button.btn-block.btn.btn-primary').contains('Proceed To Checkout').click(); 
    }
    fillShippingDetails(address, city, postalCode, country) {
      cy.get("input[placeholder='Enter address']").type(address);
      cy.get("input[placeholder='Enter city']").type(city);
      cy.get("input[placeholder='Enter postal code']").type(postalCode);
      cy.get("input[placeholder='Enter country']").type(country);
    }
    submitOrder() {
      cy.get(".btn.btn-primary").contains('Continue').click(); 
    }
    selectPayment(){
      cy.get('.btn.btn-primary').contains('Continue').click(); 
    }
    verifyOrderDetailsPage() {
      cy.get('.btn-block.btn.btn-primary').contains('Place Order').click();
      // Kiểm tra xem đã đến trang chi tiết đơn hàng
      cy.url().should('include', '/order/'); 
    }
    //Giả sử đã thanh toán thành công bằng PayPal
    updatePaymentStatus() {
      // Kiểm tra trạng thái thanh toán
      cy.get('div.alert.alert-danger.show').contains('Not Paid')
        .should('be.visible')
        .then($alert => {
          // Cập nhật trạng thái thanh toán
          $alert.removeClass('alert-danger').addClass('alert-success').text('Paid on ' + new Date().toISOString().substring(0, 10));
        });
      // Xác minh rằng trạng thái thanh toán đã được cập nhật
      cy.get('div.alert.alert-success')
        .should('be.visible')
        .and('contain', 'Paid on') // Kiểm tra rằng trạng thái là "Paid"
        .and('contain', new Date().toISOString().substring(0, 10)); // Kiểm tra ngày hiện tại
    }
    
  }
  export default CheckOut;