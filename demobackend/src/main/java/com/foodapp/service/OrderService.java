package com.foodapp.service;

import com.foodapp.dto.CreateOrderRequest;
import com.foodapp.dto.OrderItemRequest;
import com.foodapp.model.AppUser;
import com.foodapp.model.FoodOrder;
import com.foodapp.model.FoodOrderItem;
import com.foodapp.repository.FoodOrderRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final FoodOrderRepository foodOrderRepository;
    private final AuthService authService;

    public FoodOrder createOrder(CreateOrderRequest request) {
        AppUser user = authService.getAuthenticatedUser();
        FoodOrder order = new FoodOrder();
        order.setUser(user);
        order.setSubtotal(valueOrZero(request.getSubtotal()));
        order.setDeliveryFee(valueOrZero(request.getDeliveryFee()));
        order.setTaxes(valueOrZero(request.getTaxes()));
        order.setTotal(valueOrZero(request.getTotal()));
        order.setStatus("PLACED");

        List<FoodOrderItem> orderItems = new ArrayList<>();
        if (request.getItems() != null) {
            for (OrderItemRequest itemRequest : request.getItems()) {
                FoodOrderItem orderItem = new FoodOrderItem();
                orderItem.setFoodId(itemRequest.getFoodId());
                orderItem.setName(itemRequest.getName());
                orderItem.setImage(itemRequest.getImage());
                orderItem.setPrice(valueOrZero(itemRequest.getPrice()));
                orderItem.setQuantity(itemRequest.getQuantity() == null ? 0 : itemRequest.getQuantity());
                orderItem.setOrder(order);
                orderItems.add(orderItem);
            }
        }

        order.setItems(orderItems);
        return foodOrderRepository.save(order);
    }

    public List<FoodOrder> getOrdersForCurrentUser() {
        AppUser user = authService.getAuthenticatedUser();
        return foodOrderRepository.findByUser_IdOrderByIdDesc(user.getId());
    }

    private double valueOrZero(Double value) {
        return value == null ? 0 : value;
    }
}
