class HomePage {
  txtSearchProduct = '.mr-sm-2.ml-sm-5.form-control';
  btnSearch = '.p-2.mx-2.btn.btn-outline-success';
  // Tìm kiếm sản phẩm
  searchProduct(productName) {
    cy.get(this.txtSearchProduct).type(productName).type('{enter}');
    cy.get(this.btnSearch).click();
  }
  // Kiểm tra sản phẩm xuất hiện hiển thị trong kết quả
  verifyProductInResults(productName) {
    cy.get('.card-body').contains(productName).should('be.visible');
  }
  // Truy cập vào trang chi tiết sản phẩm
  visitProduct(productName) {
    cy.get('.card-body').contains(productName).click();
  }
}
export default HomePage;
