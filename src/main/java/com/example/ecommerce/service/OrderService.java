package com.example.ecommerce.service;

import com.example.ecommerce.dto.OrderRequest;
import com.example.ecommerce.dto.Product;
import com.example.ecommerce.exception.MissingDataException;
import com.example.ecommerce.exception.ResourceNotFoundException;
import com.example.ecommerce.model.Order;
import com.example.ecommerce.model.OrderItem;
import com.example.ecommerce.model.ProductItem;
import com.example.ecommerce.repository.OrderItemRepository;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.ProductItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductItemRepository productItemRepository;
    private final OrderItemRepository orderItemRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, ProductItemRepository productItemRepository, OrderItemRepository orderItemRepository) {
        this.orderRepository = orderRepository;
        this.productItemRepository = productItemRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public List<OrderRequest> getAllOrders() {
        List <OrderRequest> allOrders = new ArrayList<>();
        List <Order> orders = orderRepository.findAll();
        for(Order order: orders) {
            Long orderId = order.getOrderId();
            List<Product> products = orderItemRepository.getOrderItemsWithId(orderId);
            allOrders.add(new OrderRequest(order.getName(), order.getAddress(), order.getPhone(), order.getTotal(), products));
        }
        return allOrders;
    }

    public Order createOrder(OrderRequest orderRequest) {
        Order order = new Order(orderRequest.getName(), orderRequest.getAddress(), orderRequest.getPhone(), orderRequest.getTotal());
        Order createdOrder = orderRepository.save(order);
        List<OrderItem> orderItems = new ArrayList<>();
        for(Product product: orderRequest.getProducts()) {
            ProductItem productItem = null;
            try {
                productItem = productItemRepository.findById(product.getProductId()).
                        orElseThrow(() -> new ResourceNotFoundException("ProductItem not available with id: " + product.getProductId()));
            }
            catch (ResourceNotFoundException e) {
                orderRepository.delete(createdOrder);
                throw e;
            }
            OrderItem orderItem = new OrderItem(createdOrder, productItem, product.getQuantity());
            orderItems.add(orderItem);
        }
        for(OrderItem item: orderItems) {
            orderItemRepository.save(item);
        }
        return createdOrder;
    }
}
