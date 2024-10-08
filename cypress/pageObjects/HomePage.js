class HomePage{
    searchProduct(productName) {
      cy.get(".mr-sm-2.ml-sm-5.form-control").type(`${productName}{enter}`);
      cy.get(".p-2.mx-2.btn.btn-outline-success").click();  // Giả sử nút Search có kiểu submit
      }
      verifyProductInResults(productName) {
        cy.contains(productName).should('be.visible');  // Kiểm tra sản phẩm hiển thị trong kết quả
      }
      visitProduct(productName) {
        // Sau khi tìm kiếm, nhấn vào tên sản phẩm để truy cập trang chi tiết
        cy.contains(productName).click();  // Giả sử sản phẩm xuất hiện trong kết quả tìm kiếm
      }
}
export default HomePage;
