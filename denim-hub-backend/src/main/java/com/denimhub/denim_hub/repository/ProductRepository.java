package com.denimhub.denim_hub.repository;

import com.denimhub.denim_hub.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

