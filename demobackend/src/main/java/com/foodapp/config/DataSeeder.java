package com.foodapp.config;

import com.foodapp.model.Food;
import com.foodapp.repository.FoodRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final FoodRepository foodRepository;

    @Override
    public void run(String... args) {
        if (foodRepository.count() > 0) {
            return;
        }

        foodRepository.saveAll(List.of(
                new Food(null, "Pancakes", "image1.avif", 499, "veg", "breakfast"),
                new Food(null, "Chicken Soup", "image2.avif", 399, "non_veg", "soups"),
                new Food(null, "Minestrone Soup", "image3.avif", 349, "veg", "soups"),
                new Food(null, "Spaghetti Carbonara", "image4.avif", 999, "non_veg", "pasta"),
                new Food(null, "Veg Alfredo Pasta", "image5.avif", 899, "veg", "pasta"),
                new Food(null, "Chicken Alfredo Pasta", "image6.avif", 1099, "non_veg", "pasta"),
                new Food(null, "Paneer Butter Masala", "image7.avif", 799, "veg", "main_course"),
                new Food(null, "Chicken Biryani", "image8.avif", 1199, "non_veg", "main_course"),
                new Food(null, "Margherita Pizza", "image9.avif", 649, "veg", "pizza"),
                new Food(null, "Pepperoni Pizza", "image10.avif", 749, "non_veg", "pizza"),
                new Food(null, "Veggie Burger", "image11.avif", 499, "veg", "burger"),
                new Food(null, "Chicken Burger", "image12.avif", 599, "non_veg", "burger"),
                new Food(null, "Tomato Soup", "image13.avif", 299, "veg", "soups"),
                new Food(null, "Egg Sandwich", "image14.webp", 349, "non_veg", "breakfast"),
                new Food(null, "Mushroom Soup", "image15.avif", 349, "veg", "soups"),
                new Food(null, "Chicken Tikka Masala", "image16.avif", 1199, "non_veg", "main_course"),
                new Food(null, "Cheese Omelette", "image17.avif", 399, "non_veg", "breakfast"),
                new Food(null, "Fettuccine Alfredo", "image18.avif", 949, "veg", "pasta"),
                new Food(null, "Garlic Bread", "image19.avif", 299, "veg", "pizza"),
                new Food(null, "Fish and Chips", "image20.avif", 1099, "non_veg", "main_course"),
                new Food(null, "Hash Browns", "image21.avif", 249, "veg", "breakfast"),
                new Food(null, "Vegetable Soup", "image22.avif", 329, "veg", "soups"),
                new Food(null, "Egg Fried Rice", "image23.avif", 599, "non_veg", "main_course"),
                new Food(null, "Hawaiian Pizza", "image24.avif", 799, "non_veg", "pizza"),
                new Food(null, "Pasta Primavera", "image25.avif", 899, "veg", "pasta")
        ));
    }
}
