package com.foodapp.repository;

import com.foodapp.model.FoodOrder;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodOrderRepository extends JpaRepository<FoodOrder, Long> {

    List<FoodOrder> findByUser_IdOrderByIdDesc(Long userId);
}
