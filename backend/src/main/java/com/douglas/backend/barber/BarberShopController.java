package com.douglas.backend.barber;

import com.douglas.backend.barber.dto.BarberShopRequestDTO;
import com.douglas.backend.barber.dto.BarberShopResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/barbershops")
@RequiredArgsConstructor
public class BarberShopController {

    private final BarberShopService barberShopService;

//    @GetMapping
//    public List<BarberShopResponseDTO> findAll() {
//        return
//    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BarberShopResponseDTO create(@RequestBody BarberShopRequestDTO barberShop) {
        return barberShopService.createMyBarberShop(barberShop);
    }

    @GetMapping("/mine")
    public ResponseEntity<BarberShopResponseDTO> getMyShop() {
        return ResponseEntity.ok(barberShopService.getMyShop());
    }

    @PutMapping("/{id}")
    public BarberShopResponseDTO update(@PathVariable Long id, @RequestBody BarberShopRequestDTO barberShop) {
        return barberShopService.updateMyShop(id, barberShop);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        barberShopService.deleteMyShop(id);
    }
}
