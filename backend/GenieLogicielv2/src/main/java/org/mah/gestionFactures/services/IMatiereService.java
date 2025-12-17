package org.mah.gestionFactures.services;

import java.util.List;
import java.util.Optional;

import org.mah.gestionFactures.model.Matiere;

public interface IMatiereService {
	Optional<Matiere> findById(Long id);
	List<Matiere> findAll();
}
