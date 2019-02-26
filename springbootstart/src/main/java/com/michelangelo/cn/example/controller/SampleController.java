package com.michelangelo.cn.example.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SampleController {



    @RequestMapping("/")
    String home() {
        System.out.println("into home");


        return "Hello World!";
    }
}