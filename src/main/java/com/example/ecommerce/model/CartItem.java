package com.example.ecommerce.model;
import jakarta.persistence.*;
@Entity
@Table(name = "cart")
public class CartItem {
    @Id
    private Long id;

    @OneToOne
    @JoinColumn(name = "product")
    private ProductItem productItem;

    @Column(name =  "quantity")
    private int quantity;

    public CartItem() {
    }

    public CartItem(Long id, ProductItem productItem) {
        this.id = id;
        this.productItem = productItem;
        this.quantity = 1;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}