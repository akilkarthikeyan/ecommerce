package com.example.ecommerce.service;

import com.example.ecommerce.model.ProductItem;
import com.example.ecommerce.repository.ProductItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductItemService {
    private final ProductItemRepository productItemRepository;

    @Autowired
    public ProductItemService(ProductItemRepository productItemRepository) {
        this.productItemRepository = productItemRepository;
    }

    public List<ProductItem> getAllProductItems() {
        return productItemRepository.findAll();
    }

    public ProductItem createProductItem(ProductItem productItem) {
        return productItemRepository.save(productItem);
    }
}
