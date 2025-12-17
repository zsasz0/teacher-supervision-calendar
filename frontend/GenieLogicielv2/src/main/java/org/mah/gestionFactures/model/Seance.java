package org.mah.gestionFactures.model;

import java.time.LocalDate;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(of= {"id"})

public class Seance {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
private long id;
	@Column(nullable = false)
private LocalDate date;
	
@ManyToMany(mappedBy = "seances")
@JsonIgnore
private Set<Enseignant> enseignants;
@ManyToOne
private Horaire horaire;
public Seance(LocalDate date, Set<Enseignant> enseignants, Horaire horaire) {
	super();
	this.date = date;
	this.enseignants = enseignants;
	this.horaire = horaire;
}
@Override
public String toString() {
    return "Seance{" +
           "id=" + id +
           ", date=" + date +
           ", horaire=" + (horaire != null ? horaire.getHoraireId() : "null") +
           ", nbEnseignants=" + 
           '}';
}

}
