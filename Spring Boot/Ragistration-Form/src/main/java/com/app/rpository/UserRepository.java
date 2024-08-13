package com.app.rpository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
}
