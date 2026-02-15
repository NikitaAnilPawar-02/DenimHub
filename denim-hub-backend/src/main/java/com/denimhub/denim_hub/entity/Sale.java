package com.denimhub.denim_hub.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "sales")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String saleNo;

    // Many bills can belong to one customer
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(name = "bill_date", updatable = false)
    private LocalDateTime billDate;

    @Column(name = "total_items")
    private Integer totalItems;

    @Column(nullable = false)
    private BigDecimal subtotal;

    @Column(name = "discount_percent")
    private BigDecimal discountPercent;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    @Column(name = "payment_method")
    private String paymentMethod;

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    private List<SaleItem> items;

    @PrePersist
    protected void onCreate() {
        this.billDate = LocalDateTime.now();
    }
}
