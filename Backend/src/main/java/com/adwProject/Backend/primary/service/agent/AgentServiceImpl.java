package com.adwProject.Backend.primary.service.agent;

import com.adwProject.Backend.primary.entity.Agent;
import com.adwProject.Backend.primary.repository.AgentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Service
@AllArgsConstructor
public class AgentServiceImpl implements AgentService {
    private final AgentRepository agentRepository;

    @RequestMapping(value="/primary")
    @Override
    public Agent getById(String id) {
        return agentRepository.findById(id).orElse(null);
    }

    @RequestMapping(value="/primary")
    @Override
    public List<Agent> getAgents() {
        return agentRepository.findAll();
    }

}
