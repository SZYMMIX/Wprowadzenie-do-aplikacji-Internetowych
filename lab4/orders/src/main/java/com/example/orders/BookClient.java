package com.example.orders;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "boke-service", url = "http://localhost:8080")
public interface BookClient {

    @GetMapping("/api/books/{id}")
    String getBookById(@PathVariable int id);

}
