package com.example.ecommerce.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.ecommerce.model.ProductItem;
@Repository
public interface ProductItemRepository extends JpaRepository<ProductItem, Long> {
}