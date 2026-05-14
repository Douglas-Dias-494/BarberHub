package com.douglas.backend.barber;

import com.douglas.backend.barber.dto.BarberServiceRequestDTO;
import com.douglas.backend.barber.dto.BarberServiceResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
public class BarberServiceController {

    private final BarberServiceService barberServiceService;

    @PostMapping("/{shopId}")
    @ResponseStatus(HttpStatus.CREATED)
    public BarberServiceResponseDTO createService(@PathVariable Long shopId, @RequestBody BarberServiceRequestDTO requestDTO) {
       return barberServiceService.createService(shopId, requestDTO);
    }

    @GetMapping("/{shopId}")
    public List<BarberServiceResponseDTO> getServices(@PathVariable Long shopId) {
        return barberServiceService.findAllServicesByShopId(shopId);
    }

    @PutMapping("/{shopId}/{id}")
    public BarberServiceResponseDTO updateService(@PathVariable Long shopId, @PathVariable Long id, @RequestBody BarberServiceRequestDTO requestDTO) {
        return barberServiceService.updateService(shopId, id, requestDTO);
    }

    @DeleteMapping("/{shopId}/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteService(@PathVariable Long shopId, @PathVariable Long id) {
        barberServiceService.deleteService(shopId, id);
    }



}
