package com.denimhub.denim_hub.service;

import com.denimhub.denim_hub.entity.Product;

import java.util.List;

public interface ProductService {

    // Add new product
    Product addProduct(Product product);

    // Get all products
    List<Product> getAllProducts();

    // Get product by ID
    Product getProductById(Long id);

    // Update existing product
    Product updateProduct(Long id, Product product);

    // Delete product
    void deleteProduct(Long id);
}