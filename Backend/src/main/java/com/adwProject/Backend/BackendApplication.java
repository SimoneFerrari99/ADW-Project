package com.adwProject.Backend;

import com.adwProject.Backend.entity.CustomerDB;
import com.adwProject.Backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@RestController
public class BackendApplication implements CommandLineRunner {
	@Autowired
	private CustomerRepository customerRepo;
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception {
		List<CustomerDB> customer = customerRepo.findAll();

		customer.forEach(System.out :: println);
	}
}
