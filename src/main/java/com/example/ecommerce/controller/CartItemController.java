package com.example.ecommerce.controller;

import com.example.ecommerce.dto.Quantity;
import com.example.ecommerce.model.CartItem;
import com.example.ecommerce.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class CartItemController {
    private final CartItemService cartItemService;

    @Autowired
    public CartItemController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @GetMapping("/cart-items")
    public List<CartItem> getAllCartItems() {
        return cartItemService.getAllCartItems();
    }

    @PostMapping("/cart-item/{productId}")
    public CartItem createCartItem(@PathVariable Long productId) {
        return cartItemService.createCartItem(productId);
    }

    @PatchMapping("/cart-item/{id}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long id, @RequestBody Quantity quantity){
        return cartItemService.updateCartItem(id, quantity.getQuantity());
    }

    @DeleteMapping("/cart-item/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCartItem(@PathVariable Long id) {
        return cartItemService.deleteCartItem(id);
    }

    @DeleteMapping("/cart-items")
    public ResponseEntity<Map<String, Boolean>> deleteAllCartItems() {
        return cartItemService.deleteAllCartItems();
    }
}