package com.douglas.backend.geocoding;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@Service
public class GeocodingService {

    public Coordinate findCoordinates(String address) {
        RestTemplate restTemplate = new RestTemplate();
        try {
            String apiKey = "pk.33683b8a1592694eea527c5e428ee8dd";

            String sanitizedAddress = address.trim().replace("\n", "").replace("\r", "");

            String encodedAddress = URLEncoder.encode(sanitizedAddress, StandardCharsets.UTF_8.toString());

            String url = "https://us1.locationiq.com/v1/search?key=" + apiKey + "&q=" + encodedAddress + "&format=json";

            System.out.println("DEBUG URL: " + url);

            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );
            List<Map<String, Object>> results = response.getBody();

            if (results != null && !results.isEmpty()) {
                Map<String, Object> firstMatch = results.get(0);

                Double lat = Double.valueOf(firstMatch.get("lat").toString());
                Double lon = Double.valueOf(firstMatch.get("lon").toString());

                System.out.println("SUCESSO NO BACKEND: " + lat + ", " + lon);
                return new Coordinate(lat, lon);
            }

        } catch (Exception e) {
            System.err.println("Erro na busca: " + e.getMessage());
        }
        return null;
    }
}