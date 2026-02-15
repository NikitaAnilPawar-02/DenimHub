package com.denimhub.denim_hub.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;   // Denim Shirt, Jeans etc.

    @Column(name = "category",nullable = false)
    private String category;   // Shirt / Pant

    @Column(nullable = false)
    private String size;   // S, M, L, XL

    @Column(nullable = false)
    private BigDecimal price;

    @Column(name = "stock_qty", nullable = false)
    private Integer stockQty;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "image_url")
    private String imageUrl;


    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
