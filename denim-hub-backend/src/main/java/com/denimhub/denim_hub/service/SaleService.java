package com.denimhub.denim_hub.service;

import com.denimhub.denim_hub.DTO.*;
import com.denimhub.denim_hub.entity.*;
import com.denimhub.denim_hub.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SaleService {

    private final CustomerRepository customerRepo;
    private final ProductRepository productRepo;
    private final SaleRepository saleRepo;

    @Transactional
    public Sale createSale(SaleRequestDTO dto) {

        // CUSTOMER CHECK
        Customer customer = customerRepo.findByMobile(dto.getMobile())
                .orElseGet(() -> Customer.builder()
                        .name(dto.getName())
                        .mobile(dto.getMobile())
                        .email(dto.getEmail())
                        .totalOrders(0)
                        .build());

        customer.setTotalOrders(customer.getTotalOrders() + 1);
        customerRepo.save(customer);

        Sale sale = new Sale();
        sale.setSaleNo("DH-" + System.currentTimeMillis());
        sale.setCustomer(customer);
        sale.setPaymentMethod(dto.getPaymentMethod());

        List<SaleItem> items = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;
        int totalItems = 0;

        for (SaleItemDTO itemDTO : dto.getItems()) {

            Product product = productRepo.findById(itemDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (product.getStockQty() < itemDTO.getQuantity()) {
                throw new RuntimeException("Not enough stock");
            }

            product.setStockQty(product.getStockQty() - itemDTO.getQuantity());
            productRepo.save(product);

            BigDecimal itemTotal =
                    product.getPrice().multiply(BigDecimal.valueOf(itemDTO.getQuantity()));

            SaleItem saleItem = SaleItem.builder()
                    .sale(sale)
                    .product(product)
                    .quantity(itemDTO.getQuantity())
                    .price(product.getPrice())
                    .total(itemTotal)
                    .build();

            subtotal = subtotal.add(itemTotal);
            totalItems += itemDTO.getQuantity();
            items.add(saleItem);
        }

        BigDecimal discountAmount = subtotal
                .multiply(dto.getDiscountPercent())
                .divide(BigDecimal.valueOf(100));

        BigDecimal finalAmount = subtotal.subtract(discountAmount);

        sale.setSubtotal(subtotal);
        sale.setDiscountPercent(dto.getDiscountPercent());
        sale.setTotalAmount(finalAmount);
        sale.setTotalItems(totalItems);
        sale.setItems(items);

        return saleRepo.save(sale);
    }
}
