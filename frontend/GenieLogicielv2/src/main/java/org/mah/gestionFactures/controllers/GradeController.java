package org.mah.gestionFactures.controllers;




import java.util.List;

import org.mah.gestionFactures.model.Grade;
import org.mah.gestionFactures.repository.GradeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import jakarta.transaction.Transactional;

@Controller
public class GradeController {
private GradeRepo gradeRepo;

@Autowired
public GradeController(GradeRepo gradeRepo) {
	super();
	this.gradeRepo = gradeRepo;
}
@Transactional
public void insertGrades() {
    if (gradeRepo.count() == 0) {  
        List<Grade> grades = List.of(
                new Grade("Professeur", 4),
                new Grade("Maître de Conférences", 3),
                new Grade("Maître Assistant", 2),
                new Grade("Assistant", 3),
                new Grade("Chargé de Cours", 3),
                new Grade("Vacataire", 5),
                new Grade("Docteur Contractuel", 4)
        );
        gradeRepo.saveAll(grades);
        System.out.println("Inserted grades successfully!");
    }
}


}
