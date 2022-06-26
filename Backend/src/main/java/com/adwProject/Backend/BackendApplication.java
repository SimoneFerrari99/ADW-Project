package com.adwProject.Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@SpringBootApplication
@RestController
public class BackendApplication {
/*	@Autowired
	private CustomerRepository customerRepo;*/
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}


	/*@Override
	public void run(String... args) throws Exception {
		List<Customer> customer = customerRepo.findAll();

		customer.forEach(System.out :: println);
	}

	@GetMapping("/")
	public String index() {
		*//*CustomerDB c = new CustomerDB("Simone", "Venezia", "Padova", "Italia", 2, 0.0, 1.0, 2.0, 3.0, "3409078607", new AgentDB(), new ArrayList<>());
		customerRepo.save(c);
		List<CustomerDB> customer = customerRepo.findAll();

		customer.forEach(System.out :: println);*//*
		return "Greetings from Spring Boot!";
	}*/
}
