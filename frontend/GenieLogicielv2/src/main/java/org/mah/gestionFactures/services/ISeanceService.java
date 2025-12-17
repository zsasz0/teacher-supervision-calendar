package org.mah.gestionFactures.services;


import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.mah.gestionFactures.model.Seance;
import org.mah.gestionFactures.model.User;

public interface ISeanceService {
	Optional<Seance> findById(long id);
	List<Seance> findAll();
	 int calculerSurveillantsRequis(int sommePaquets);
	  int countVoeuxByEnseignant(Long enseignantId) ;

		 int countAssignedTeachers(long seanceId) ;

}
