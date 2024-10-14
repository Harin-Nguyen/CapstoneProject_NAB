// cypress/pages/OrderManagement.js

class OrderManagement {
    // Constructor
    constructor() {
        // Xác định các phần tử chung của trang order management
        this.orderTableRows = 'table tbody tr'; // Selector cho các hàng của bảng đơn hàng
        this.detailsButton = 'a.btn.btn-light'; // Selector cho nút "Details"
        this.markAsDeliveredButton = '.btn.btn-block.btn.btn-primary'; 
        this.orderListUrl = 'http://localhost:3000/admin/orderlist';
    }

    // Phương thức để tìm một đơn hàng đã thanh toán và bấm vào "Details"
    findAndClickRandomPaidOrder() {
        cy.visit('http://localhost:3000/admin/orderlist'); // Địa chỉ URL trang quản lý đơn hàng

    let paidOrders = []; // Mảng để lưu trữ các đơn hàng đã thanh toán

    // Lặp qua các hàng trong bảng và tìm hàng có trạng thái thanh toán
    cy.get(this.orderTableRows).then($rows => {
        // Kiểm tra mỗi hàng để tìm đơn hàng đã thanh toán
        $rows.each((index, row) => {
            const $row = Cypress.$(row);
            // Kiểm tra nếu trạng thái "PAID" có ngày ở cột thứ 5
            const paidColumnText = $row.find('td').eq(4).text();
            // Kiểm tra cột "Delivered" ở cột thứ 6 (giả sử cột Delivered là cột thứ 6)
            const deliveredColumnText = $row.find('td').eq(5).text(); 

            // Điều kiện: Có ngày thanh toán và cột Delivered không có ngày
            if (paidColumnText && paidColumnText.trim() !== '' && !deliveredColumnText.trim()) {
                const orderId = $row.find('td').eq(0).text(); // Lấy ID đơn hàng từ cột đầu tiên
                paidOrders.push({ orderId, row: $row }); // Lưu ID và hàng vào mảng
            }
        });

        // Sau khi đã lặp qua tất cả các hàng, chọn một đơn hàng ngẫu nhiên
        if (paidOrders.length > 0) {
            const randomIndex = Math.floor(Math.random() * paidOrders.length); // Chọn ngẫu nhiên chỉ số
            const randomOrder = paidOrders[randomIndex];

            // Bấm nút "Details" của đơn hàng ngẫu nhiên
            cy.wrap(randomOrder.row).find(this.detailsButton).click(); // Bấm vào nút "Details"
        }
    });
    }

    markAsDelivered() {
        // Bấm nút "Mark as Delivered"
        cy.get(this.markAsDeliveredButton).contains('Mark As Delivered').click();
    }
}

export default OrderManagement;
