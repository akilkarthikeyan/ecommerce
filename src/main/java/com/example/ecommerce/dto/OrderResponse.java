package com.example.ecommerce.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {

    private Long id;
    private String name;
    private String address;
    private String phone;

    private LocalDateTime orderedAt;
    private List<ProductDescription> productDescriptions;

    public OrderResponse(Long id, String name, String address, String phone, LocalDateTime orderedAt, List<ProductDescription> productDescriptions) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.orderedAt = orderedAt;
        this.productDescriptions = productDescriptions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<ProductDescription> getProductDescriptions() {
        return productDescriptions;
    }

    public void setProductDescriptions(List<ProductDescription> productDescriptions) {
        this.productDescriptions = productDescriptions;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDateTime getOrderedAt() {
        return orderedAt;
    }

    public void setOrderedAt(LocalDateTime orderedAt) {
        this.orderedAt = orderedAt;
    }
}
