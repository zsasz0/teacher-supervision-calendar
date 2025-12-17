package org.mah.gestionFactures.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.mah.gestionFactures.model.Enseignant;
import org.mah.gestionFactures.model.Horaire;
import org.mah.gestionFactures.model.HoraireId;
import org.mah.gestionFactures.model.Matiere;
import org.mah.gestionFactures.model.Seance;
import org.mah.gestionFactures.repository.HoraireRepo;
import org.mah.gestionFactures.repository.SeanceRepo;
import org.mah.gestionFactures.services.EnseignantService;
import org.mah.gestionFactures.services.MatiereService;
import org.mah.gestionFactures.services.SeanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.transaction.Transactional;
import lombok.Getter;

@RestController
@CrossOrigin
public class SeanceController {
	
	@Getter private  SeanceService seanceService;
	private MatiereService matiereService;
	@Autowired
	private EnseignantService enseignantService;
	
	@Autowired
	public SeanceController(SeanceService seanceService,MatiereService matiereService) {
		super();
		this.seanceService = seanceService;
		this.matiereService=matiereService;
		
	}
	public int calculerSurveillantsRequis(long seanceId) {
	    double d= matiereService.findAll().stream()
	        .filter(m -> m.getSeance() != null && 
	                     m.getSeance().getId()==seanceId)
	        .mapToInt(Matiere::getNbPaquet).sum()*1.5;
	    return (int )Math.ceil(d);
//	    return 3;
	}
	@CrossOrigin
	@GetMapping("/surveillance/seance/{id}/requis")
   
    public ResponseEntity<Integer> getSurveillantsRequis(@PathVariable Long id) {
        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().body(0);
        }

        int requis = calculerSurveillantsRequis(id);
        return ResponseEntity.ok(requis);
    }

	/*old*/
	/*******************************************/
	/*
	@GetMapping("/seances-with-voeux/{enseignantId}")
	public ResponseEntity<Map<String, Object>> getSeancesWithVoeux(@PathVariable Long enseignantId) {
	    // 1. Toutes les séances

	    List<Seance> allSeances = seanceService.findAll();
	    
	    // 2. Les séances déjà choisies par cet enseignant
	    Set<Long> chosenIds = enseignantService.findById(enseignantId)
	        .getSeances()  // ta relation ManyToMany
	        .stream()
	        .map(Seance::getId)
	        .collect(Collectors.toSet());

	    // 3. Construire la grille + marquer les choisies
	    Map<String, List<List<Map<String, Object>>>> examSessions = buildSessionGrid(allSeances, chosenIds);

	    return ResponseEntity.ok(Map.of(
	        "examSessions", examSessions,
	        "chosenSeanceIds", new ArrayList<>(chosenIds)  // ← pour debug ou bonus
	    ));
	}
	
	*/
	/*new*/
	/*******************************************/
//	/*
	@GetMapping("/seances-with-voeux/{enseignantId}")
	public ResponseEntity<Map<String, Object>> getSeancesWithVoeux(@PathVariable Long enseignantId) {
		
		
		
		Enseignant enseignant = enseignantService.findById(enseignantId);
		// Get all seance IDs that this teacher teaches through their matieres
		Set<Long> seancesOfTeacher = enseignant.getMatieres().stream()
		        .map(m -> m.getSeance().getId())
		        .collect(Collectors.toSet());

		// Filter seances that are NOT in this list
		List<Seance> seancesNonEnseignees = seanceService.findAll().stream()
		        .filter(s -> !seancesOfTeacher.contains(s.getId()))
		        .toList();
		
		
		
	    
	    // 2. Les séances déjà choisies par cet enseignant
	    Set<Long> chosenIds = enseignant
	        .getSeances()  // ta relation ManyToMany
	        .stream()
	        .map(Seance::getId)
	        .collect(Collectors.toSet());

	    // 3. Construire la grille + marquer les choisies
	    Map<String, List<List<Map<String, Object>>>> examSessions = buildSessionGrid(seancesNonEnseignees, chosenIds);

	    return ResponseEntity.ok(Map.of(
	        "examSessions", examSessions,
	        "chosenSeanceIds", new ArrayList<>(chosenIds)  // ← pour debug ou bonus
	    ));
	}
	@GetMapping("/seances-of-teacher/{enseignantId}")
	@CrossOrigin
	public ResponseEntity<Map<String, Object>> getSeancesOfTeacher(@PathVariable Long enseignantId) {

	    // 1. Find enseignant
	    Enseignant enseignant = enseignantService.findById(enseignantId);
	    if (enseignant == null) {
	        return ResponseEntity.badRequest().body(Map.of(
	            "error", "Enseignant not found"
	        ));
	    }

	    // 2. Extract the seances from all matieres of this teacher
	    Set<Seance> seancesOfTeacher = enseignant.getMatieres().stream()
	            .map(Matiere::getSeance)
	            .filter(s -> s != null)
	            .collect(Collectors.toSet());

	    // 3. Format response
	    List<Map<String, Object>> seanceList = seancesOfTeacher.stream()
	            .map(s -> Map.<String, Object>of(
	                "id", s.getId(),
	                "date", s.getDate(),
	                "dayOfWeek", s.getDate() != null ? s.getDate().getDayOfWeek().name() : null,
	                "horaireStart", s.getHoraire() != null ? s.getHoraire().getHoraireId().getHDebut() : null,
	                "horaireEnd", s.getHoraire() != null ? s.getHoraire().getHoraireId().getHFin() : null
	            ))
	            .toList();

	    return ResponseEntity.ok(Map.of(
	            "enseignantId", enseignantId,
	            "seances", seanceList,
	            "count", seanceList.size()
	    ));
	}

//	 */
	/*******************************************/

	
	
	
	
	
	private Map<String, List<List<Map<String, Object>>>> buildSessionGrid(List<Seance> seances, Set<Long> chosenIds) {
	    String[] days = {"lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"};
	    Map<String, Integer> dayMap = Map.of(
	        "MONDAY", 0, "TUESDAY", 1, "WEDNESDAY", 2, "THURSDAY", 3,
	        "FRIDAY", 4, "SATURDAY", 5, "SUNDAY", 6
	    );

	    Map<String, List<List<Map<String, Object>>>> grid = new LinkedHashMap<>();

	    // Initialize grid with 3 mutable slot lists for each day
	    for (String d : days) {
	        List<List<Map<String, Object>>> slots = new ArrayList<>();
	        slots.add(new ArrayList<>()); // slot 0
	        slots.add(new ArrayList<>()); // slot 1
	        slots.add(new ArrayList<>()); // slot 2
	        grid.put(d, slots);
	    }

	    for (Seance s : seances) {
	        if (s.getDate() == null || s.getHoraire() == null || s.getHoraire().getHoraireId() == null) continue;

	        String dayEn = s.getDate().getDayOfWeek().name();
	        Integer dayIndex = dayMap.get(dayEn);
	        if (dayIndex == null) continue;

	        int slot = switch (s.getHoraire().getHoraireId().getHDebut()) {
	            case 510 -> 0;
	            case 690 -> 1;
	            case 870 -> 2;
	            default -> -1;
	        };
	        if (slot == -1) continue;

	        Map<String, Object> opt = Map.of(
	            "value", s.getId(),
	            "label", "Séance " + s.getId(),   // JUSTE ÇA, RIEN D'AUTRE
	            "chosen", chosenIds != null && chosenIds.contains(s.getId()),
	            "disabled", false
	        );

	        grid.get(days[dayIndex]).get(slot).add(opt);
	    }

	    return grid;
	}

	
	
	@CrossOrigin
	@GetMapping("/surveillance/seance/{id}/remaining")
	public ResponseEntity<Map<String, Object>> getRemainingSurveillants(@PathVariable Long id) {

	    if (id == null || id <= 0) {
	        return ResponseEntity.badRequest().body(Map.of("error", "Invalid ID"));
	    }

	    // 1. Base required (dynamic)
	    int requis = calculerSurveillantsRequis(id);

	    // 2. Assigned teachers (join table count)
	    int assigned = seanceService.countAssignedTeachers(id);

	    // 3. Remaining to assign
	    int remaining = Math.max(requis - assigned, 0);

	    return ResponseEntity.ok(
	            Map.of(
	                    "seanceId", id,
	                    "baseRequis", requis,
	                    "assigned", assigned,
	                    "remaining", remaining
	            )
	    );
	}
	@Transactional
	@CrossOrigin
	@PostMapping("/surveillance/voeux/save")
	public ResponseEntity<Map<String, Object>> saveVoeux(@RequestBody Map<String, Object> body) {

	    Long enseignantId = Long.valueOf(body.get("enseignantId").toString());

	    @SuppressWarnings("unchecked")
	    List<Integer> rawIds = (List<Integer>) body.get("seances");

	    List<Long> seanceIds = rawIds.stream()
	            .map(Integer::longValue)
	            .toList();

	    enseignantService.saveVoeux(enseignantId, seanceIds);

	    return ResponseEntity.ok(
	            Map.of(
	                "status", "success",
	                "enseignantId", enseignantId,
	                "savedCount", seanceIds.size()
	            )
	    );
	}

	
	@GetMapping("/seances_info")
	@CrossOrigin
	public ResponseEntity<List<Map<String, Object>>> getSeancesInfo() {
		
		List<Map<String, Object>> infoByDay = seanceService.findAll().stream()
			    .map(s -> Map.<String, Object>of(
			        "id", s.getId(),
			        "date", s.getDate() != null ? s.getDate() : "",
			        "dayOfWeek", s.getDate() != null ? s.getDate().getDayOfWeek() : null,
			        "horaireStart", s.getHoraire() != null && s.getHoraire().getHoraireId() != null
			                       ? s.getHoraire().getHoraireId().getHDebut() : 0,
			        "horaireEnd", s.getHoraire() != null && s.getHoraire().getHoraireId() != null
			                     ? s.getHoraire().getHoraireId().getHFin() : 0
			    ))
			    .collect(Collectors.toList());


	    return ResponseEntity.ok(infoByDay);
	}


	
	
	@GetMapping("/seances_ids")
	@CrossOrigin
    public ResponseEntity<List<Long>> getAllSeancesIds() {
        List<Long> seances = seanceService.findAll().stream().map(Seance::getId).toList();
        return ResponseEntity.ok(seances);
    }
	public Seance findById(long id)
	{Seance s=null;
		try {
			
		 s =seanceService.findById(id).orElseThrow(()->new RuntimeException("seance error"));
		
		return  s;
		}
		catch (Exception e) {
			// TODO: handle exception
			return new Seance();
		}
		finally {
			System.out.println(s+" : nice");
		}
}
	
	
	@Transactional
    public void insertSeances(List<Seance> seances ) {
        if (seanceService.getRepo().count() == 0) {

        
				
			
            // --- 3. Insert seances ---
        

        	seanceService.getRepo().saveAll(seances);
            System.out.println("Inserted 5 seances successfully!");
        }
        }
	@CrossOrigin
	@GetMapping("/first-exam-date")
	public ResponseEntity<Map<String, Object>> getFirstExamDate() {

	    // 1. Get all seances
	    List<Map<String, Object>> seances = seanceService.findAll().stream()
	            .map(s -> Map.<String, Object>of(
	                    "id", s.getId(),
	                    "date", s.getDate()
	            ))
	            .toList();

	    if (seances.isEmpty()) {
	        return ResponseEntity.ok(Map.of("firstExamDate", null));
	    }

	    // 2. Find the earliest date
	    LocalDate firstDate = seances.stream()
	            .map(m -> (LocalDate) m.get("date"))
	            .min(LocalDate::compareTo)
	            .orElse(null);

	    // 3. Return as JSON
	    return ResponseEntity.ok(Map.of("firstExamDate", firstDate));
	}
	@CrossOrigin 
	@PostMapping("/auto-assign-surveillance")
	public ResponseEntity<?> autoAssignSurveillance(@RequestBody Map<String, Object> params) {
	    boolean dryRun = (boolean) params.getOrDefault("dryRun", false);

	    // 1. Get all teachers
	    List<Enseignant> teachers = enseignantService.findAll();

	    // 2. Get all seances
	    List<Seance> allSeances = seanceService.findAll();

	    List<AssignmentDetail> assignments = new ArrayList<>();
	    int totalAssigned = 0;

	    for (Enseignant teacher : teachers) {
	        // Compute max surveillance sessions for this teacher
	        int chargeMax = (int) Math.ceil(teacher.getGrade().getChargeDeSurveillance() * 1.5);

	        // Count current choices
	        int currentChoices = seanceService.countVoeuxByEnseignant(teacher.getId());

	        if (currentChoices < chargeMax) {
	            int needed = chargeMax - currentChoices;

	            // Find available seances: not full & not already chosen by this teacher
	            List<Seance> availableSeances = allSeances.stream()
	                .filter(s -> seanceService.countAssignedTeachers(s.getId()) <
	                             seanceService.calculerSurveillantsRequis(
	                                 matiereService.findAll().stream()
	                                     .filter(m -> m.getSeance() != null && m.getSeance().getId() == s.getId())
	                                     .mapToInt(Matiere::getNbPaquet)
	                                     .sum()
	                             ))
	                .filter(s -> !teacher.getSeances().contains(s))
	                .collect(Collectors.toList());

	            // Shuffle for random assignment
	            Collections.shuffle(availableSeances);

	            List<Seance> toAssign = availableSeances.stream()
	                .limit(needed)
	                .collect(Collectors.toList());

	            if (!dryRun) {
	                // Save assignments
	                for (Seance seance : toAssign) {
	                    enseignantService.saveVoeux(teacher.getId(), List.of(seance.getId()));
	                }
	            }

	            // Track assignment details
	            assignments.add(new AssignmentDetail(
	                teacher.getId(),
	                teacher.getNom() + " " + teacher.getPrenom(),
	                chargeMax,
	                currentChoices,
	                toAssign.size(),
	                toAssign.stream().map(Seance::getId).collect(Collectors.toList())
	            ));

	            totalAssigned += toAssign.size();
	        }
	    }

	    return ResponseEntity.ok(Map.of(
	        "success", true,
	        "assignmentsCreated", totalAssigned,
	        "teachersAssigned", assignments.size(),
	        "details", assignments
	    ));
	}

	// Helper DTO for assignment details
	public static class AssignmentDetail {
	    public Long teacherId;
	    public String teacherName;
	    public int chargeMax;
	    public int alreadyChosen;
	    public int newlyAssigned;
	    public List<Long> seanceIds;

	    public AssignmentDetail(Long teacherId, String teacherName, int chargeMax, int alreadyChosen, int newlyAssigned, List<Long> seanceIds) {
	        this.teacherId = teacherId;
	        this.teacherName = teacherName;
	        this.chargeMax = chargeMax;
	        this.alreadyChosen = alreadyChosen;
	        this.newlyAssigned = newlyAssigned;
	        this.seanceIds = seanceIds;
	    }
	}

	
}
