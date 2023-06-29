package com.example.ecommerce.repository;
import com.example.ecommerce.dto.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.ecommerce.model.OrderItem;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    @Query(value = "SELECT new com.example.ecommerce.dto.Product(oi.productItem.productId, oi.quantity) " +
            "FROM OrderItem oi " +
            "WHERE oi.order.orderId = :orderId")
    public List<Product> getOrderItemsWithId(@Param("orderId") Long orderId);
}
