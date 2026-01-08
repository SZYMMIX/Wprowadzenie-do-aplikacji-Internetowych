package com.example.orders;

import feign.FeignException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderRepository orderRepository;
    private final BookClient bookClient;

    public OrderController(OrderRepository orderRepository, BookClient bookClient){
        this.orderRepository = orderRepository;
        this.bookClient = bookClient;
    }

    @GetMapping("/{userId}")
    public List<Order> getOrderByUser(@PathVariable int userId){
        return orderRepository.findAll().stream()
                .filter(order -> order.getUserId() == userId)
                .toList();
    }

    @PostMapping
    public ResponseEntity<?> addOrder(@RequestBody Order newOrder){
        try{
            bookClient.getBookById(newOrder.getBookId());
            Order savedOrder = orderRepository.save(newOrder);
            return ResponseEntity.ok(savedOrder);
        } catch (FeignException.NotFound e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Błąd: Książka o podanym ID nie istnieje!");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("Błąd: Nie można połączyć się z serwisem książek.");
        }
    }
}
