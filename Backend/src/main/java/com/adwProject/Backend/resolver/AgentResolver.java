package com.adwProject.Backend.resolver;

import com.adwProject.Backend.domanin.Agent;
import com.adwProject.Backend.domanin.Customer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@Slf4j
public class AgentResolver {
    public Agent agentById(UUID id) {
        log.info("Retrieving agent id: {}", id);

        return Agent.builder()
                .agentCode(id)
                .agentName("Tony")
                .workingArea("IT")
                .commision(5.5f)
                .phoneNO("test1")
                .country("Svizzera")
                .build();
    }
}
