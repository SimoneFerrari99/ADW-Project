package com.adwProject.Backend.primary.service.agent;

import com.adwProject.Backend.primary.entity.Agent;

import java.util.List;

public interface AgentService {
    Agent getById(String id);
    List<Agent> getAgents();
    Boolean deleteAgent(String agentCode);
}
