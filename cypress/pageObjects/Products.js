class Products {
    addToCart() {
      // Thêm sản phẩm vào giỏ hàng từ trang chi tiết sản phẩm
      cy.get('button.btn-block.btn.btn-primary').contains('Add To Cart').click();  // Đảm bảo chọn đúng nút
    }
    validateCartUpdated() {
      // Kiểm tra giỏ hàng đã được cập nhật
      cy.get('.form-control').should('contain', '1');  // Kiểm tra số lượng sản phẩm trong giỏ hàng
    }
  }
  export default Products;
  