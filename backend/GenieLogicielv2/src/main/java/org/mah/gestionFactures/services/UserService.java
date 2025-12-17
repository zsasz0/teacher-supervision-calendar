package org.mah.gestionFactures.services;

import java.util.Optional;

import org.mah.gestionFactures.model.User;
import org.mah.gestionFactures.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.Getter;

@Service
public class UserService implements IUserService{

	@Getter
    private UserRepo userRepo;
	@Override
	public Optional<User> findById(long id) {
		// TODO Auto-generated method stub
		return userRepo.findById(id);
	}


	@Autowired
	public UserService(UserRepo userRepo) {
		super();
		this.userRepo = userRepo;
	}


	@Override

    public Optional<User> authVerification(Long id, String password) {
        Optional<User> user = userRepo.findById(id);
        if (user.isPresent() && user.get().getPwd() != null && password.equals(user.get().getPwd())) {
            return user; // Return user if ID exists and password matches
        }
        return Optional.empty(); // Return empty if user not found or password doesn't match
    }
	

}
