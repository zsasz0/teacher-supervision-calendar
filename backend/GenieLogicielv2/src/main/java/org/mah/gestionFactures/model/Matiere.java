package org.mah.gestionFactures.model;

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
@AllArgsConstructor
@EqualsAndHashCode(of= {"id"})
public class Matiere {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
private long id ;
	@Column(nullable = false)
private String nom;
private int nbPaquet;
@ManyToMany(mappedBy = "matieres")
@JsonIgnore
private Set<Enseignant> Enseignants;
@ManyToOne
private Seance seance;
public Matiere(String nom, int nbPaquet, Set<Enseignant> enseignants, Seance seance) {
	super();
	this.nom = nom;
	this.nbPaquet = nbPaquet;
	Enseignants = enseignants;
	this.seance = seance;
}
@Override
public String toString() {
    return "Matiere{nom='" + nom + "', nbPaquets=" + nbPaquet + "}";
}

}
