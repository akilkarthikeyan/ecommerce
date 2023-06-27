package com.example.ecommerce.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.ecommerce.model.CartItem;
@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}