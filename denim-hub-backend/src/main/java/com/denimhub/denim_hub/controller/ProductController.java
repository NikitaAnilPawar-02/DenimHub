package com.denimhub.denim_hub.controller;

import com.denimhub.denim_hub.entity.Product;
import com.denimhub.denim_hub.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // 1. ADD PRODUCT (JSON only)
    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.addProduct(product));
    }

    // 2. ADD PRODUCT WITH IMAGE (POSTMAN)

    @PostMapping(value = "/with-image", consumes = "multipart/form-data")
    public ResponseEntity<Product> addProductWithImage(
            @RequestParam String name,
            @RequestParam String category
            ,
            @RequestParam String size,
            @RequestParam String price,
            @RequestParam Integer stockQty,
            @RequestParam("image") MultipartFile image
    ) throws Exception {

        if (image.isEmpty()) {
            throw new RuntimeException("Image is required");
        }

        String uploadDir = System.getProperty("user.dir") + "/uploads/products/";
        File folder = new File(uploadDir);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        String filePath = uploadDir + fileName;

        image.transferTo(new File(filePath));

        Product product = Product.builder()
                .name(name)
                .category(category)
                .size(size)
                .price(new BigDecimal(price))
                .stockQty(stockQty)
                .imageUrl("/uploads/products/" + fileName)
                .build();

        return ResponseEntity.ok(productService.addProduct(product));
    }
    // 3. VIEW ALL PRODUCTS
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // 4.  VIEW PRODUCT BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    // 5.  UPDATE PRODUCT
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    // 6. DELETE PRODUCT
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }
}