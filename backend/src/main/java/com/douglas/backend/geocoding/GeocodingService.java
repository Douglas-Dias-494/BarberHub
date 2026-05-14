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

// 1. LIMPEZA DE SEGURANÇA: Remove espaços extras no início/fim e quebras de linha
            String sanitizedAddress = address.trim().replace("\n", "").replace("\r", "");

            // 2. ENCODE: Vamos usar o URLEncoder padrão do Java que é mais "agressivo"
            String encodedAddress = URLEncoder.encode(sanitizedAddress, StandardCharsets.UTF_8.toString());

            // 3. MONTAGEM DA URL
            String url = "https://us1.locationiq.com/v1/search?key=" + apiKey + "&q=" + encodedAddress + "&format=json";

            // --- O PULO DO GATO: IMPRIMA E TESTE ESTE LINK ---
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

                // Extraindo lat e lon (eles vêm como String no JSON)
                Double lat = Double.valueOf(firstMatch.get("lat").toString());
                Double lon = Double.valueOf(firstMatch.get("lon").toString());

                System.out.println("SUCESSO NO BACKEND: " + lat + ", " + lon);
                return new Coordinate(lat, lon);
            }

        } catch (Exception e) {
            // Se der 404 aqui, é porque a API realmente não achou a String enviada
            System.err.println("Erro na busca: " + e.getMessage());
        }
        return null;
    }
}