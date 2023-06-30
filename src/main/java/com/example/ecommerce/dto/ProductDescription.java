package com.example.ecommerce.dto;

import com.example.ecommerce.model.ProductItem;

public class ProductDescription {
    private Long id;
    private int quantity;
    private ProductItem productItem;

    public ProductDescription(Long id, int quantity, ProductItem productItem) {
        this.id = id;
        this.quantity = quantity;
        this.productItem = productItem;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
