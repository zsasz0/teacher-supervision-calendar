package org.mah.gestionFactures.repository;

import org.mah.gestionFactures.model.Horaire;
import org.mah.gestionFactures.model.HoraireId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HoraireRepo extends JpaRepository<Horaire, HoraireId>{

}
