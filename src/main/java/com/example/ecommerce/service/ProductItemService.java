package com.example.ecommerce.service;

import com.example.ecommerce.exception.InvalidRequestException;
import com.example.ecommerce.model.ProductItem;
import com.example.ecommerce.repository.ProductItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
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

    public List<ProductItem> searchProductItems(String title, Float floorPrice, Float ceilPrice) {
        Specification<ProductItem> productItemSpecification = Specification.where(null);

        if(floorPrice == null)
            floorPrice = 0.0F;

        if(ceilPrice == null)
            ceilPrice = Float.MAX_VALUE;

        //title
        if(title != null) {
            productItemSpecification = productItemSpecification.and(ProductItemSpecifications.hasTitleLike(title));
        }

        if(floorPrice <= ceilPrice) {
            productItemSpecification = productItemSpecification.and(ProductItemSpecifications.hasPriceGreaterThanOrEqualTo(floorPrice));
            productItemSpecification = productItemSpecification.and(ProductItemSpecifications.hasPriceLessThanOrEqualTo(ceilPrice));
        }
        else {
            throw new InvalidRequestException("floorPrice " + floorPrice + " has to be lesser than or equal to ceilPrice " + ceilPrice);
        }

        return productItemRepository.findAll(productItemSpecification);
    }

    public ProductItem createProductItem(ProductItem productItem) {
        return productItemRepository.save(productItem);
    }

    public List<ProductItem> createProductItems(List<ProductItem> productItems) {
        return productItemRepository.saveAll(productItems);
    }

}
class ProductItemSpecifications {
    public static Specification<ProductItem> hasTitleLike(String title) {
        return (root, query, criteriaBuilder) -> {
            String lowerCaseTitle = "%" + title.toLowerCase() + "%";
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), lowerCaseTitle);
        };
    }

    public static Specification<ProductItem> hasPriceLessThanOrEqualTo(Float ceilPrice) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.lessThanOrEqualTo(root.get("price"), ceilPrice);
    }

    public static Specification<ProductItem> hasPriceGreaterThanOrEqualTo(Float floorPrice) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(root.get("price"), floorPrice);
    }

}

