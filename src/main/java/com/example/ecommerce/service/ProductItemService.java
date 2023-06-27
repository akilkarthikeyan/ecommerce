package com.example.ecommerce.service;

import com.example.ecommerce.exception.InvalidRequestException;
import com.example.ecommerce.exception.ResourceNotFoundException;
import com.example.ecommerce.model.ProductItem;
import com.example.ecommerce.repository.ProductItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
