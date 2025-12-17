package org.mah.gestionFactures.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.mah.gestionFactures.model.Seance;
import org.mah.gestionFactures.repository.SeanceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.Getter;

@Service
public class SeanceService implements ISeanceService{
	@Getter
private SeanceRepo repo;
	@Autowired
	public SeanceService(SeanceRepo repo) {
		super();
		this.repo = repo;
	}
	@Override
	public Optional<Seance> findById(long id) {
		// TODO Auto-generated method stub
		return repo.findById(id);
	}
	@Override
	public  int calculerSurveillantsRequis(int sommePaquets) {
	    if (sommePaquets < 0) {
	        throw new IllegalArgumentException("La somme des paquets ne peut pas être négative");
	    }
	    double resultat = sommePaquets * 1.5;
	    return (int) Math.ceil(resultat); // plafond → toujours assez de surveillants
	}
	@Override
	public List<Seance> findAll() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}
	@Override
	public int countAssignedTeachers(long seanceId) {
	    return repo.countAssignedTeachers(seanceId);
	}
	@Override
	public int countVoeuxByEnseignant(Long enseignantId) {
	    return repo.countByEnseignantId(enseignantId);
	}



}
