package com.example.ecommerce.service;

import com.example.ecommerce.exception.ResourceNotFoundException;
import com.example.ecommerce.model.CartItem;
import com.example.ecommerce.model.ProductItem;
import com.example.ecommerce.repository.CartItemRepository;
import com.example.ecommerce.repository.ProductItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CartItemService {
    private final CartItemRepository cartItemRepository;
    private final ProductItemRepository productItemRepository;

    @Autowired
    public CartItemService(CartItemRepository cartItemRepository, ProductItemRepository productItemRepository) {
        this.cartItemRepository = cartItemRepository;
        this.productItemRepository = productItemRepository;
    }

    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    public CartItem createCartItem(Long id) {
        ProductItem productItem = productItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProductItem does not exist with id: " + id));
        CartItem cartItem = new CartItem(productItem.getId(), productItem);
        return cartItemRepository.save(cartItem);
    }

    public ResponseEntity<CartItem> updateCartItem(Long id, int quantity) {
        CartItem cartItem = cartItemRepository.findById(id).
                orElseThrow(() -> new ResourceNotFoundException("CartItem does not exist with id: " + id));
        cartItem.setQuantity(quantity);
        CartItem updatedCartItem = cartItemRepository.save(cartItem);
        return ResponseEntity.ok(updatedCartItem);
    }

    public ResponseEntity<Map<String, Boolean>> deleteCartItem(Long id) {
        CartItem cartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CartItem does not exist with id: " + id));
        cartItemRepository.delete(cartItem);
        Map<String, Boolean> response = new HashMap<>();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
    }

    public ResponseEntity<Map<String, Boolean>> deleteAllCartItems() {
        cartItemRepository.deleteAll();
        Map<String, Boolean> response = new HashMap<>();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
    }
}