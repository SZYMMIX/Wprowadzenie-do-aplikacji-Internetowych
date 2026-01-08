package com.example.orders;

import feign.FeignException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable int id, @RequestBody Map<String, Object> updates) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) return ResponseEntity.notFound().build();

        if (updates.containsKey("quantity")) {
            order.setQuantity((Integer) updates.get("quantity"));
        }

        orderRepository.save(order);
        return ResponseEntity.ok(order);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable int id){
        if (orderRepository.existsById(id)){
            orderRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
}
