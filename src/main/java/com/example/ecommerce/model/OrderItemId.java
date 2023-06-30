package com.example.ecommerce.model;
import java.io.Serializable;
import java.util.Objects;

public class OrderItemId implements Serializable {
    private Long order;
    private Long productItem;

    public OrderItemId() {
    }

    public OrderItemId(Long order, Long productItem) {
        this.order = order;
        this.productItem = productItem;
    }

    public Long getOrder() {
        return order;
    }

    public void setOrder(Long order) {
        this.order = order;
    }

    public Long getProductItem() {
        return productItem;
    }

    public void setProductItem(Long productItem) {
        this.productItem = productItem;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItemId that = (OrderItemId) o;
        return Objects.equals(order, that.order) && Objects.equals(productItem, that.productItem);
    }

    @Override
    public int hashCode() {
        return Objects.hash(order, productItem);
    }
}
