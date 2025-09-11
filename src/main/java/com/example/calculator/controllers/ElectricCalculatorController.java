package com.example.calculator.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/electric")
public class ElectricCalculatorController {

    @PostMapping("/calculate")
    public Map<String, Object> calculateCircuit(@RequestBody Map<String, Object> payload) {
        Map<String, Object> response = new HashMap<>();
        StringBuilder details = new StringBuilder();

        try {
            // Use default voltage if none provided
            double voltage = ((Number) payload.getOrDefault("voltage", 24)).doubleValue();

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> resistorList = (List<Map<String, Object>>) payload.getOrDefault("resistors", new ArrayList<>());

            // --- AUTO-ADD THE TASK IF RESISTORS EMPTY ---
            if (resistorList.isEmpty()) {
                resistorList.add(createResistor("R1", 24, "Rp1", "no"));
                resistorList.add(createResistor("R2", 48, "Rp1", "no"));
                resistorList.add(createResistor("Rp1", 0, "Rp2", "yes"));  // Will calculate automatically
                resistorList.add(createResistor("R3", 48, "Rp2", "no"));
                resistorList.add(createResistor("Rp2", 0, null, "yes"));   // Will calculate automatically
                resistorList.add(createResistor("R4", 12, null, "no"));
            }

            Map<String, Double> calculatedValues = new HashMap<>();
            Map<String, List<String>> parallelGroups = new HashMap<>();
            List<String> seriesResistors = new ArrayList<>();

            // Process resistors
            for (Map<String, Object> r : resistorList) {
                String name = (String) r.get("name");
                double value = ((Number) r.getOrDefault("value", 0)).doubleValue();
                String group = r.get("group") != null ? (String) r.get("group") : null;
                String useCalc = (String) r.getOrDefault("useCalculated", "no");

                // Use previously calculated value if requested
                if ("yes".equals(useCalc) && calculatedValues.containsKey(name)) {
                    value = calculatedValues.get(name);
                }

                calculatedValues.put(name, value);

                if (group != null) {
                    parallelGroups.computeIfAbsent(group, k -> new ArrayList<>()).add(name);
                } else {
                    seriesResistors.add(name);
                }
            }

            // Calculate parallel groups recursively
            Map<String, Double> parallelResults = new HashMap<>();
            for (String group : parallelGroups.keySet()) {
                parallelResults.put(group, calculateParallel(group, parallelGroups, calculatedValues, details));
            }

            // Total series resistance
            double totalSeries = 0;
            for (String s : seriesResistors) {
                totalSeries += calculatedValues.get(s);
                details.append(s).append(" (Series) = ").append(calculatedValues.get(s)).append(" Ω\n");
            }

            // Add parallel groups as series
            for (Map.Entry<String, Double> entry : parallelResults.entrySet()) {
                if (!seriesResistors.contains(entry.getKey())) {
                    totalSeries += entry.getValue();
                    details.append(entry.getKey()).append(" (Parallel) = ").append(entry.getValue()).append(" Ω\n");
                }
            }

            double totalCurrent = totalSeries != 0 ? voltage / totalSeries : 0;

            response.put("totalResistance", totalSeries);
            response.put("totalCurrent", totalCurrent);
            response.put("details", details.toString());
            response.put("calculatedValues", calculatedValues);

        } catch (Exception e) {
            response.put("error", e.getMessage());
        }

        return response;
    }

    private Map<String, Object> createResistor(String name, double value, String group, String useCalc) {
        Map<String, Object> r = new HashMap<>();
        r.put("name", name);
        r.put("value", value);
        r.put("group", group);
        r.put("useCalculated", useCalc);
        return r;
    }

    private double calculateParallel(String groupName, Map<String, List<String>> parallelGroups,
                                     Map<String, Double> values, StringBuilder details) {
        double reciprocalSum = 0;

        for (String r : parallelGroups.get(groupName)) {
            double val = values.get(r);

            // If resistor itself is a parallel group, calculate recursively
            if (parallelGroups.containsKey(r)) {
                val = calculateParallel(r, parallelGroups, values, details);
            }

            if (val != 0) {
                reciprocalSum += 1.0 / val;
            }
        }

        double total = reciprocalSum == 0 ? 0 : 1.0 / reciprocalSum;
        details.append("Calculated ").append(groupName).append(" = ").append(total).append(" Ω\n");
        values.put(groupName, total); // Store for later
        return total;
    }
}
