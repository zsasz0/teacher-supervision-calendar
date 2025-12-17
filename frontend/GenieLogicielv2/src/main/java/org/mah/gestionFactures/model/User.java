package org.mah.gestionFactures.model;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor

@Entity
public class User {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
	@OneToOne
	private Enseignant enseignant;
	@Column(nullable = false)
private String pwd;
	public User(Enseignant enseignant, String pwd) {
		super();
		this.enseignant = enseignant;
		this.pwd = pwd;
	}
	

}
