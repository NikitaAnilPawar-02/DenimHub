package com.denimhub.denim_hub.service.impl;

import com.denimhub.denim_hub.entity.Product;
import com.denimhub.denim_hub.repository.ProductRepository;
import com.denimhub.denim_hub.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    // Constructor Injection
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Add new product
    @Override
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // View all products
    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // View product by ID
    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    // Update product
    @Override
    public Product updateProduct(Long id, Product updatedProduct) {

        Product existingProduct = getProductById(id);

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setSize(updatedProduct.getSize());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setStockQty(updatedProduct.getStockQty());

        return productRepository.save(existingProduct);
    }

    // Delete product
    @Override
    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}
