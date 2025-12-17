package org.mah.gestionFactures.config;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import org.mah.gestionFactures.controllers.*;
import org.mah.gestionFactures.model.Enseignant;
import org.mah.gestionFactures.model.Grade;
import org.mah.gestionFactures.model.Horaire;
import org.mah.gestionFactures.model.HoraireId;
import org.mah.gestionFactures.model.Matiere;
import org.mah.gestionFactures.model.Seance;
import org.mah.gestionFactures.repository.UserRepo;
import org.springframework.boot.CommandLineRunner;

import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final SeanceController seanceController;
    private final UserController userController;
    private final EnseignantController enseignantController;
    private final UserRepo userRepo;
    private final HoraireController horaireController;
    private final GradeController gradeController;
    private final MatiereController matiereController;

    public DataInitializer(GradeController gradeController, HoraireController horaireController, UserRepo userRepo,
            EnseignantController enseignantController, UserController userController,
            SeanceController seanceController, MatiereController matiereController) {
        this.gradeController = gradeController;
        this.horaireController = horaireController;
        this.userRepo = userRepo;
        this.enseignantController = enseignantController;
        this.userController = userController;
        this.seanceController = seanceController;
        this.matiereController = matiereController;
    }
    @Override
    public void run(String... args) throws Exception {
    	if (!seanceController.getSeanceService().findAll().isEmpty()) {
    		System.out.println("📌 Data already initialized — skipping.");
            return;
        }
        // === 1. Création des 18 séances (3 par jour, du lundi au samedi) ===
    	// === 1. Création des 18 séances (3 par jour, du lundi au samedi) ===
    	LocalDate today = LocalDate.now();
    	LocalDate nextMonday = today.with(DayOfWeek.MONDAY).plusWeeks(1);
    	
    	List<Seance> seances = List.of(
    	    // ===== LUNDI =====
    	    new Seance(nextMonday, null, new Horaire(new HoraireId(510, 630))),  // 08h30-10h30
    	    new Seance(nextMonday, null, new Horaire(new HoraireId(690, 810))),  // 11h30-13h30
    	    new Seance(nextMonday, null, new Horaire(new HoraireId(870, 990))),  // 14h30-16h30

    	    // ===== MARDI =====
    	    new Seance(nextMonday.plusDays(1), null, new Horaire(new HoraireId(510, 630))),
    	    new Seance(nextMonday.plusDays(1), null, new Horaire(new HoraireId(690, 810))),
    	    new Seance(nextMonday.plusDays(1), null, new Horaire(new HoraireId(870, 990))),

    	    // ===== MERCREDI =====
    	    new Seance(nextMonday.plusDays(2), null, new Horaire(new HoraireId(510, 630))),
    	    new Seance(nextMonday.plusDays(2), null, new Horaire(new HoraireId(690, 810))),
    	    new Seance(nextMonday.plusDays(2), null, new Horaire(new HoraireId(870, 990))),

    	    // ===== JEUDI =====
    	    new Seance(nextMonday.plusDays(3), null, new Horaire(new HoraireId(510, 630))),
    	    new Seance(nextMonday.plusDays(3), null, new Horaire(new HoraireId(690, 810))),
    	    new Seance(nextMonday.plusDays(3), null, new Horaire(new HoraireId(870, 990))),

    	    // ===== VENDREDI =====
    	    new Seance(nextMonday.plusDays(4), null, new Horaire(new HoraireId(510, 630))),
    	    new Seance(nextMonday.plusDays(4), null, new Horaire(new HoraireId(690, 810))),
    	    new Seance(nextMonday.plusDays(4), null, new Horaire(new HoraireId(870, 990))),

    	    // ===== SAMEDI =====
    	    new Seance(nextMonday.plusDays(5), null, new Horaire(new HoraireId(510, 630))),
    	    new Seance(nextMonday.plusDays(5), null, new Horaire(new HoraireId(690, 810))),
    	    new Seance(nextMonday.plusDays(5), null, new Horaire(new HoraireId(870, 990)))
    	);

        // Insertion des données de base
        gradeController.insertGrades();
        horaireController.insertHoraires();
        seanceController.insertSeances(seances);

        // Récupération des séances sauvegardées (dans l'ordre d'insertion)
        List<Seance> savedSeances = seanceController.getSeanceService().findAll();

        // On récupère les 18 séances dans l'ordre
        Seance s1  = savedSeances.get(0);
        Seance s2  = savedSeances.get(1);
        Seance s3  = savedSeances.get(2);
        Seance s4  = savedSeances.get(3);
        Seance s5  = savedSeances.get(4);
        Seance s6  = savedSeances.get(5);
        Seance s7  = savedSeances.get(6);
        Seance s8  = savedSeances.get(7);
        Seance s9  = savedSeances.get(8);
        Seance s10 = savedSeances.get(9);
        Seance s11 = savedSeances.get(10);
        Seance s12 = savedSeances.get(11);
        Seance s13 = savedSeances.get(12);
        Seance s14 = savedSeances.get(13);
        Seance s15 = savedSeances.get(14);
        Seance s16 = savedSeances.get(15);
        Seance s17 = savedSeances.get(16);
        Seance s18 = savedSeances.get(17);

        // === 2. Création des matières (une ou deux par séance) ===
        List<Matiere> matieres = List.of(
            // Lundi
            new Matiere("Mathématiques Avancées", 4, null, s1),
            new Matiere("Algorithmique", 3, null, s2),
            new Matiere("Physique Quantique", 3, null, s3),

            // Mardi
            new Matiere("Base de données", 3, null, s4),
            new Matiere("Chimie Organique", 3, null, s5),
            new Matiere("Anglais Technique", 2, null, s6),

            // Mercredi
            new Matiere("Réseaux Informatiques", 4, null, s7),
            new Matiere("Statistiques", 3, null, s8),
            new Matiere("Thermodynamique", 3, null, s9),

            // Jeudi
            new Matiere("Intelligence Artificielle", 4, null, s10),
            new Matiere("Génie Logiciel", 3, null, s11),
            new Matiere("Électronique Numérique", 3, null, s12),

            // Vendredi
            new Matiere("Machine Learning", 4, null, s13),
            new Matiere("Sécurité Informatique", 3, null, s14),
            new Matiere("Probabilités", 3, null, s15),

            // Samedi
            new Matiere("Projet de Fin d'Études", 5, null, s16),
            new Matiere("Cloud Computing", 3, null, s17),
            new Matiere("Big Data", 4, null, s18)
        );

        matiereController.insertMatieres(matieres);

        // === 3. Association enseignants ↔ matières et séances ===
        List<Enseignant> enseignants = List.of(
            new Enseignant("Jmal", "Amel", 123456789, new Grade("Professeur", 10),
                Set.of(matiereController.findById(1L), matiereController.findById(10L)), Set.of(s1, s10)),

            new Enseignant("Bouaziz", "Sondes", 987654321, new Grade("Maître Assistant", 6),
                Set.of(matiereController.findById(2L), matiereController.findById(4L)), Set.of(s2, s4)),

            new Enseignant("Kacem", "Rania", 55123456, new Grade("Maître de Conférences", 8),
                Set.of(matiereController.findById(3L), matiereController.findById(7L)), Set.of(s3, s9)),

            new Enseignant("Ben Salah", "Hatem", 55443322, new Grade("Chargé de Cours", 4),
                Set.of(matiereController.findById(5L), matiereController.findById(8L)), Set.of(s5, s8)),

            new Enseignant("Trabelsi", "Mouna", 99887766, new Grade("Vacataire", 2),
                Set.of(matiereController.findById(6L), matiereController.findById(14L)), Set.of(s6, s14)),

            new Enseignant("Garcia", "Marco", 77445566, new Grade("Maître Assistant", 6),
                Set.of(matiereController.findById(11L), matiereController.findById(17L)), Set.of(s11, s17)),

            new Enseignant("Lopez", "Sara", 66554433, new Grade("Docteur Contractuel", 3),
                Set.of(matiereController.findById(12L), matiereController.findById(15L)), Set.of(s12, s15)),

            new Enseignant("Smith", "Emma", 112233445, new Grade("Professeur", 10),
                Set.of(matiereController.findById(13L), matiereController.findById(16L)), Set.of(s13, s16)),

            new Enseignant("Dupont", "Luc", 998877665, new Grade("Maître Assistant", 6),
                Set.of(matiereController.findById(18L)), Set.of(s18))
        );

        enseignantController.insertEnseignants(enseignants);

        // === 4. Users par défaut ===
        userController.insertUsers();

        System.out.println("✅ Initialisation terminée : 18 séances (3 par jour), matières et enseignants associés.");
        System.out.println("Nombre total de séances : " + seanceController.getSeanceService().findAll().size());
    }
}