package org.mah.gestionFactures.model;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor

public class Enseignant {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private long id;
@Column(nullable = false)
private String nom;
@Column(nullable = false)
private String prenom;
@Column(nullable = false)
private int tel;
@ManyToOne

private Grade grade;

@ManyToMany


private Set<Matiere> matieres;
@ManyToMany
private Set<Seance> seances;
public Enseignant(String nom, String prenom, int tel, Grade grade, Set<Matiere> matieres, Set<Seance> seances) {
	super();
	this.nom = nom;
	this.prenom = prenom;
	this.tel = tel;
	this.grade = grade;
	this.matieres = matieres;
	this.seances = seances;
}
@Override
public String toString() {
    return "Enseignant{id=" + id + ", nom='" + nom + "'}";
}
public static int calculerChargeSurveillance(int chargeEnseignement, int nbSeancesPropres) {
    if (chargeEnseignement < 0 || nbSeancesPropres < 0) {
        throw new IllegalArgumentException("Les valeurs ne peuvent pas être négatives");
    }
    double resultat = (chargeEnseignement * 1.5) - nbSeancesPropres;
    return (int) Math.max(0, Math.round(resultat)); // arrondi à l'entier le plus proche, min 0
}

}
