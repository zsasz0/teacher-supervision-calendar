package org.mah.gestionFactures.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.mah.gestionFactures.model.Enseignant;
import org.mah.gestionFactures.model.Grade;
import org.mah.gestionFactures.repository.EnseignantRepo;
import org.mah.gestionFactures.services.EnseignantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import jakarta.transaction.Transactional;

@RestController
@CrossOrigin
public class EnseignantController {
	
	EnseignantService enseignantService;

	@Autowired
	public EnseignantController(EnseignantService enseignantService) {
		super();
		this.enseignantService = enseignantService;
	}
	public Enseignant findById(long id )
	{
		return enseignantService.findById(id);
	}
	@GetMapping("/enseignant/{id}/charge")
	public ResponseEntity<Object> getChargeSurveillance(@PathVariable Long id) {
	    Enseignant enseignant = enseignantService.findById(id);
	    if (enseignant == null) {
	        return ResponseEntity.notFound().build();
	    }

	    // Multiply by 1.5
	    double chargeTotal = enseignant.getGrade().getChargeDeSurveillance() * 1.5;

	    var result = new Object() {
	        public final String nom = enseignant.getNom();
	        public final String prenom = enseignant.getPrenom();
	        public final String grade = enseignant.getGrade().getGrade();
	        public final double chargeSurveillance = chargeTotal;
	    };

	    return ResponseEntity.ok(result);
	}


	@Transactional
    public void insertEnseignants(List<Enseignant> enseignants) {
		if(enseignantService.getEnseignantRepo().count()==0)
		{

			enseignantService.getEnseignantRepo().saveAll(enseignants);
	            System.out.println("Inserted 5 seances successfully!");
		}
	}
	   @GetMapping("/enseignant/{id}")
	    public ResponseEntity<Enseignant> getEnseignant(@PathVariable Long id) {
	        Enseignant enseignant = enseignantService.findById(id);
	        if (enseignant == null) {
	            return ResponseEntity.notFound().build();
	        }
	        return ResponseEntity.ok(enseignant);
	    }
	// --- récupère les matières d'un enseignant ---
	    @GetMapping("/enseignant/{id}/matieres")
	    public ResponseEntity<List<Object>> getMatieres(@PathVariable Long id) {
	        Enseignant enseignant = enseignantService.findById(id);
	        if (enseignant == null) {
	            return ResponseEntity.notFound().build();
	        }

	        // On renvoie seulement id, nom et éventuellement nbHeures
	        List<Object> matieres = enseignant.getMatieres().stream()
	                .map(m -> {
	                    return new Object() {
	                        public final Long id = m.getId();
	                        public final String nom = m.getNom();
	                        //public final int nbHeures = m.getNbHeures(); // si champ existe
	                    };
	                })
	                .collect(Collectors.toList());

	        return ResponseEntity.ok(matieres);
	    }
	}
	


