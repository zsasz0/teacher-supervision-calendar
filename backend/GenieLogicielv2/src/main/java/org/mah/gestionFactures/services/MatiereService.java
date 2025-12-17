package org.mah.gestionFactures.services;

import java.util.List;
import java.util.Optional;

import org.mah.gestionFactures.model.Matiere;
import org.mah.gestionFactures.repository.MatiereRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.Getter;
@Service
public class MatiereService implements IMatiereService{
	@Getter
private MatiereRepo matiereRepo;
@Autowired
public MatiereService(MatiereRepo matiereRepo) {
	super();
	this.matiereRepo = matiereRepo;
}
@Override
public Optional<Matiere> findById(Long id) {
	// TODO Auto-generated method stub
	return matiereRepo.findById(id);
}
@Override
public List<Matiere> findAll() {
	// TODO Auto-generated method stub
	return matiereRepo.findAll();
}

}
