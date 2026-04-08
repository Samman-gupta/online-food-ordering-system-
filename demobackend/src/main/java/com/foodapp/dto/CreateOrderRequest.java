package com.foodapp.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderRequest {

    private List<OrderItemRequest> items;
    private Double subtotal;
    private Double deliveryFee;
    private Double taxes;
    private Double total;
}
