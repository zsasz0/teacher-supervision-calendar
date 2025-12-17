package org.mah.gestionFactures;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.mah.gestionFactures.controllers.SeanceController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class GenieLogicielApplicationTests {
	@Autowired
SeanceController seanceController;
	@Test
	void contextLoads() {
		int a =seanceController.calculerSurveillantsRequis(2);
		 assertEquals(6, a);
	}
	

}
