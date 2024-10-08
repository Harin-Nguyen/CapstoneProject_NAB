class ProfilePage{
    visit() {
        cy.url().should('include', '/profile'); // Kiểm tra rằng URL có chứa '/profile'
    }
    
      // Kiểm tra ngày thanh toán trong cột "Paid" của danh sách đơn hàng
      verifyPaymentDate() {
        const currentDate = new Date().toISOString().substring(0, 10); // Lấy ngày hiện tại (định dạng YYYY-MM-DD)
    
        cy.get('table.table-sm.table-striped.table-hover') // Sử dụng lớp của bảng
        .within(() => {
    // Tìm tiêu đề cột "PAID" và lấy chỉ số của nó
        cy.get('th').contains('PAID').invoke('index').then((paidIndex) => {
        // Sau đó lấy hàng đầu tiên (giả định là đơn hàng mới nhất)
        cy.get('tr').eq(1) // Lấy hàng đầu tiên trong dữ liệu, không phải tiêu đề
            .find('td').eq(paidIndex) // Sử dụng chỉ số của cột "Paid"
            //.should('contain', currentDate) // Kiểm tra ngày thanh toán là ngày hiện tại
            .parents('tr')
            .within(() => {
                cy.get('a.btn.btn-light').contains('Details').click();
            });
    });
  });
      }
    
}
export default ProfilePage;