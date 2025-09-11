package com.example.calculator;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CalculatorController {

    @PostMapping("/calculate")
    public Map<String, Object> calculate(@RequestBody Map<String, Object> payload) {
        double num1 = Double.parseDouble(payload.get("num1").toString());
        double num2 = Double.parseDouble(payload.get("num2").toString());
        String operation = payload.get("operation").toString();

        double result = 0;
        switch (operation) {
            case "add" -> result = num1 + num2;
            case "subtract" -> result = num1 - num2;
            case "multiply" -> result = num1 * num2;
            case "divide" -> { 
                if (num2 == 0) return Map.of("answer", "❌ Cannot divide by zero!");
                result = num1 / num2;
            }
        }

        return Map.of("answer", result);
    }
}
