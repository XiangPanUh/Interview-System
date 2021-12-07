package com.example.interview.controller;

import com.example.interview.bean.User;
import com.example.interview.http.Response;
import com.example.interview.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public Response register(@RequestBody User user) {
        return userService.register(user);
    }

    @GetMapping
    public List<User> getAll() {
        return userService.getAll();
    }
}
