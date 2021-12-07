package com.example.interview.service;

import com.example.interview.bean.Role;
import com.example.interview.bean.User;
import com.example.interview.dao.UserDao;
import com.example.interview.http.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService {
    @Autowired
    private UserDao userdao;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Response register (User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(new Role(2, "TRAINER"));
        userdao.save(user);
        return new Response(true);
    }

    public List<User> getAll() {
        return userdao.findAll();
    }
}
