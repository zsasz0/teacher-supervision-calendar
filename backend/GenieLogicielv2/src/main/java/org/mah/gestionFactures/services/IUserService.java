package org.mah.gestionFactures.services;

import java.util.Optional;

import org.mah.gestionFactures.model.User;

public interface IUserService {
	
	Optional<User> findById(long id);
	
	Optional<User> authVerification(Long id, String password);	
	
}
