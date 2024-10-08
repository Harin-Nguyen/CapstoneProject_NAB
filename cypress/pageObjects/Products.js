class Products {
    addToCart() {
      // Hàm thêm sản phẩm vào giỏ hàng 
      cy.get('button.btn-block.btn.btn-primary').contains('Add To Cart').click();  
    }
    validateCartUpdated() {
      // Hàm xác nhận giỏ hàng được cập nhật
      cy.get('a[href="/cart"] .badge').should('contain', '1');
    }
  }
  export default Products;
  