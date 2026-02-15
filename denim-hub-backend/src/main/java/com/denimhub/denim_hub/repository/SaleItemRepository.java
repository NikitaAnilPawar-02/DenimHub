package com.denimhub.denim_hub.repository;

import com.denimhub.denim_hub.entity.SaleItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleItemRepository extends JpaRepository<SaleItem, Long> {
}