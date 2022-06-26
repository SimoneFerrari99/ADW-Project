package com.adwProject.Backend.service.agent;

import com.adwProject.Backend.entity.Agent;
import com.adwProject.Backend.repository.AgentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AgentServiceImpl implements AgentService {
    private final AgentRepository agentRepository;

    @Override
    public Agent getById(String id) {
        return agentRepository.findById(id).get();
    }

}
