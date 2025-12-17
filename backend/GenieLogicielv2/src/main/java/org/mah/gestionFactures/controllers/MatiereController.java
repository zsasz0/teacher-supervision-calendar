package org.mah.gestionFactures.controllers;

import java.util.List;
import java.util.Optional;

import org.mah.gestionFactures.model.Matiere;
import org.mah.gestionFactures.model.Seance;
import org.mah.gestionFactures.services.MatiereService;
import org.mah.gestionFactures.services.SeanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import jakarta.transaction.Transactional;

@Controller
public class MatiereController {

    private final EnseignantController enseignantController;
private MatiereService matiereService;
private SeanceService seanceService;
@Autowired
public MatiereController(MatiereService matiereService, SeanceService seanceService, EnseignantController enseignantController) {
	super();
	this.matiereService = matiereService;
	this.seanceService = seanceService;
	this.enseignantController = enseignantController;
}
@Transactional
public void insertMatieres(List<Matiere> matieres) {
    if (matiereService.getMatiereRepo().count() > 0) {
        System.out.println("Matieres already exist. Skipping insert.");
        return;
    }

  


    matiereService.getMatiereRepo().saveAll(matieres);
    System.out.println("Inserted 5 matieres successfully!");
}
public Matiere findById(Long id) {
	// TODO Auto-generated method stub
	return matiereService.findById(id).orElseThrow(()->new RuntimeException("error"));
}

}
