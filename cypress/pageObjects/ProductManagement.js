class ProductManagement {
    // Tạo sản phẩm mới
    createProduct(product) {
        cy.get('.my-3.btn.btn-primary').click(); // Giả sử có nút để thêm sản phẩm
        cy.on('window:confirm', () => true);

        cy.get('table.table-sm.table-striped.table-hover tbody tr').last().within(() => {
            // Nhấn vào nút "Edit" của sản phẩm vừa tạo
            cy.get('.btn-sm.mx-2.btn.btn-light').click(); // Nhấn vào nút "Edit"
        });

        cy.get("input[placeholder='Enter name']").type(product.name) // Nhập tên sản phẩm
            .clear() // Xóa nội dung có trong trường nhập tên sản phẩm
            .type(product.name);
         cy.get("input[placeholder='Enter price']").type(product.price) // Nhập giá sản phẩm
            .clear() 
            .type(product.price);   
        cy.get("input[type='file']").attachFile(product.imagePath);
        cy.get("input[placeholder='Enter brand']").type(product.brand)
            .clear() 
            .type(product.brand);
        cy.get("input[placeholder='Enter countInStock']").type(product.inStock)
            .clear() 
            .type(product.inStock);
        cy.get("input[placeholder='Enter category']").type(product.category)
            .clear() 
            .type(product.category);
        cy.get("input[placeholder='Enter description']").type(product.description) // Nhập mô tả sản phẩm
            .clear() 
            .type(product.description);
        cy.get('.btn.btn-primary').contains('Update').click(); // Nhấn nút lưu sản phẩm
        
        // // Xác minh rằng sản phẩm đã được thêm thành công
        cy.contains(product.name).should('exist'); // Kiểm tra rằng tên sản phẩm đã xuất hiện trong danh sách
    }

    // Xóa sản phẩm
    deleteProduct(productName) {
        // Tìm hàng sản phẩm theo tên và nhấn nút xóa
        cy.get('table.table-sm.table-striped.table-hover tbody tr').filter((index, row) => {
            return Cypress.$(row).find('td').eq(1).text().trim() === productName; // Kiểm tra ô đầu tiên chứa tên sản phẩm
        }).within(() => {
            cy.get('.btn-sm.btn.btn-danger').click(); // Nhấn nút xóa
        });
    
        cy.on('window:confirm', () => true); // Xác nhận xóa trong hộp thoại xác nhận
    
        // Xác minh rằng sản phẩm đã bị xóa
        cy.contains(productName).should('not.exist'); 
    }

    searchProduct(productName) {
        cy.get("input[placeholder='Search Products...']").type(productName); // Giả sử có trường tìm kiếm
        cy.get('.p-2.mx-2.btn.btn-outline-success').contains('Search').click(); // Nhấn nút tìm kiếm (nếu có)

        // Xác minh rằng sản phẩm đã được tìm thấy
        cy.contains(productName).should('exist'); // Kiểm tra rằng tên sản phẩm đã xuất hiện trong danh sách
    }

    visitProduct(productName) {
        cy.get('.card-body').contains(productName).click();
    }
}

export default ProductManagement;
