package org.mah.gestionFactures.controllers;

import java.util.List;

import org.mah.gestionFactures.model.Grade;
import org.mah.gestionFactures.model.Horaire;
import org.mah.gestionFactures.model.HoraireId;
import org.mah.gestionFactures.repository.HoraireRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import jakarta.transaction.Transactional;

@Controller
public class HoraireController {
	private HoraireRepo horaireRepo;
	@Autowired
public HoraireController(HoraireRepo horaireRepo) {
		super();
		this.horaireRepo = horaireRepo;
	}



	@Transactional
	public void insertHoraires()
	{
	    if (horaireRepo.count() == 0) {  
	        List<Horaire> horaires = List.of(
	                new Horaire(new HoraireId(510, 630)),
	                new Horaire(new HoraireId(690, 810)),
	                new Horaire(new HoraireId(870, 990))
	            );
	        horaireRepo.saveAll(horaires);
	        System.out.println("Inserted horaires successfully!");
	}
}
}