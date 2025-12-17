package org.mah.gestionFactures.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.mah.gestionFactures.dto.AuthRequest;
import org.mah.gestionFactures.model.Enseignant;
import org.mah.gestionFactures.model.User;
import org.mah.gestionFactures.repository.UserRepo;
import org.mah.gestionFactures.services.EnseignantService;
import org.mah.gestionFactures.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.transaction.Transactional;

@RestController
public class UserController {

    private final UserRepo userRepo;
	
private UserService userService;
private EnseignantService enseignantService;
@Autowired
public UserController(UserService userService,EnseignantService enseignantService, UserRepo userRepo) {
	super();
	this.userService = userService;
	this.enseignantService = enseignantService;
	this.userRepo = userRepo;
}
@GetMapping("/user/{id}")
public User findById(@PathVariable long id) {
    return userService.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id " + id));
}
@CrossOrigin

@PostMapping("/user/{id}/auth")
public ResponseEntity<?> authenticate(@PathVariable Long id, @RequestBody AuthRequest authRequest) {
    Optional<User> userOpt = userService.authVerification(id, authRequest.getPwd());
    if (userOpt.isPresent()) {
        Enseignant e = userOpt.get().getEnseignant();
        Map<String, Object> resp = new HashMap<>();
        resp.put("id", e.getId());
        resp.put("enseignant", Map.of(
            "id", e.getId(),
            "nom", e.getNom(),
            "prenom", e.getPrenom(),
            "grade", Map.of("grade", e.getGrade().getGrade())
            // PAS DE MATIERES → PAS DE BOUCLE
        ));
        return ResponseEntity.ok(resp);
    }
    return ResponseEntity.status(401).body("Accès refusé");
}
@Transactional
public void insertUsers() {
    if (userRepo.count() > 0) {
        System.out.println("Users already exist. Skipping insert.");
        return;
    }

    // Fetch enseignants by their IDs (assuming IDs 1..9)
    Enseignant e1 = enseignantService.findById(1);
    Enseignant e2 = enseignantService.findById(2);
    Enseignant e3 = enseignantService.findById(3);
    Enseignant e4 = enseignantService.findById(4);
    Enseignant e5 = enseignantService.findById(5);
    Enseignant e6 = enseignantService.findById(6);
    Enseignant e7 = enseignantService.findById(7);
    Enseignant e8 = enseignantService.findById(8);
    Enseignant e9 = enseignantService.findById(9);

    // Create corresponding users
    List<User> users = List.of(
            new User(e1, "user1"),
            new User(e2, "user2"),
            new User(e3, "user3"),
            new User(e4, "user4"),
            new User(e5, "user5"),
            new User(e6, "user6"),
            new User(e7, "user7"),
            new User(e8, "user8"),
            new User(e9, "user9")
    );

    userRepo.saveAll(users);
    System.out.println("Inserted 9 users successfully!");
}

}
