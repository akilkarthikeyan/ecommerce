package com.example.ecommerce.dto;

import java.util.List;

public class OrderRequest {
    private String name;
    private String address;
    private String phone;
    private List<Product> products;

    public OrderRequest(String name, String address, String phone, List<Product> products) {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.products = products;
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

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}