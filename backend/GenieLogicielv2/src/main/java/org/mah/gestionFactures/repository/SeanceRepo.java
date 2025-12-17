package org.mah.gestionFactures.repository;

import org.mah.gestionFactures.model.Seance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SeanceRepo extends JpaRepository<Seance,Long>{
	@Query(value = "SELECT COUNT(*) FROM enseignant_seances WHERE seances_id = :seanceId", nativeQuery = true)
	int countAssignedTeachers(@Param("seanceId") long seanceId);

    // Count how many seances a teacher has chosen
    @Query("SELECT COUNT(s) FROM Seance s JOIN s.enseignants e WHERE e.id = :enseignantId")
    int countByEnseignantId(@Param("enseignantId") Long enseignantId);

    // Count how many teachers are assigned to a seance
    @Query("SELECT COUNT(e) FROM Seance s JOIN s.enseignants e WHERE s.id = :seanceId")
    int countAssignedTeachers(@Param("seanceId") Long seanceId);
}
