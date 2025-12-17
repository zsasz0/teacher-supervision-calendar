package org.mah.gestionFactures.services;

import java.util.List;

import org.mah.gestionFactures.model.Enseignant;
import org.mah.gestionFactures.model.Seance;
import org.mah.gestionFactures.model.User;
import org.mah.gestionFactures.repository.EnseignantRepo;
import org.mah.gestionFactures.repository.SeanceRepo;
import org.mah.gestionFactures.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.Getter;

@Service
public class EnseignantService implements IEnseignantService{

    private final UserRepo userRepo;
	@Getter
	private EnseignantRepo enseignantRepo;
	@Autowired
	private SeanceRepo seanceRepo;

	public EnseignantService(EnseignantRepo enseignantRepo, UserRepo userRepo) {
		super();
		this.enseignantRepo = enseignantRepo;
		this.userRepo = userRepo;
	}

	
	@Transactional
	public void saveVoeux(Long enseignantId, List<Long> seanceIds) {

	    Enseignant e = enseignantRepo.findById(enseignantId)
	            .orElseThrow(() -> new RuntimeException("Enseignant not found"));

	    // Clear old seances
	    e.getSeances().clear();

	    // Add new selected seances
	    List<Seance> seances = seanceRepo.findAllById(seanceIds);
	    e.getSeances().addAll(seances);

	    // Save the teacher with his new choices
	    enseignantRepo.save(e);
	}

	
	@Override
	public Enseignant findById(long id) {
		// TODO Auto-generated method stub
		try {
		return enseignantRepo.findById(id).orElseThrow(()->new RuntimeException("error"));
	}
		catch (Exception e) {
			// TODO: handle exception
			return new Enseignant();
		}
	}


	@Override
	public List<Enseignant> findAll() {
		// TODO Auto-generated method stub
		return enseignantRepo.findAll();
	}
	
}
