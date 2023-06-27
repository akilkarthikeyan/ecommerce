package com.example.ecommerce.controller;

import com.example.ecommerce.model.ProductItem;
import com.example.ecommerce.service.ProductItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class ProductItemController {
    private final ProductItemService productItemService;

    @Autowired
    public ProductItemController(ProductItemService productItemService) {
        this.productItemService = productItemService;
    }

    @GetMapping("/product-items")
    public List<ProductItem> getAllProductItems() {
        return productItemService.getAllProductItems();
    }

    @PostMapping("/product-item")
    public ProductItem createProductItem(@RequestBody ProductItem productItem) {
        return productItemService.createProductItem(productItem);
    }
}
