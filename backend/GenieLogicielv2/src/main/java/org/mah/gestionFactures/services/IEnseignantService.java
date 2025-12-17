package org.mah.gestionFactures.services;

import java.util.List;

import org.mah.gestionFactures.model.Enseignant;

public interface IEnseignantService {
Enseignant findById(long id);
List<Enseignant> findAll();
}
