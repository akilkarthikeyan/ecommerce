package com.example.ecommerce.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
@IdClass(OrderItemId.class)
public class OrderItem {
    @Id
    @ManyToOne
    @JoinColumn(name = "order_ref", referencedColumnName = "orderId")
    private Order order;

    @Id
    @ManyToOne
    @JoinColumn(name = "product", referencedColumnName = "id")
    private ProductItem productItem;

    private int quantity;

    public OrderItem(Order order, ProductItem productItem, int quantity) {
        this.order = order;
        this.productItem = productItem;
        this.quantity = quantity;
    }

    public OrderItem() {
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public ProductItem getProductItem() {
        return productItem;
    }

    public void setProductItem(ProductItem productItem) {
        this.productItem = productItem;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
