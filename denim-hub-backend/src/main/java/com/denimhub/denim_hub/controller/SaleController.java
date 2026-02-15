package com.denimhub.denim_hub.controller;


import com.denimhub.denim_hub.DTO.SaleRequestDTO;
import com.denimhub.denim_hub.entity.Sale;
import com.denimhub.denim_hub.repository.SaleRepository;
import com.denimhub.denim_hub.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
@CrossOrigin
public class SaleController {

    private final SaleService saleService;
    private final SaleRepository saleRepository;

    @PostMapping
    public ResponseEntity<Sale> createSale(@RequestBody SaleRequestDTO dto) {
        return ResponseEntity.ok(saleService.createSale(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sale> getSale(@PathVariable Long id) {
        return ResponseEntity.ok(
                saleRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Sale not found"))
        );
    }
}
