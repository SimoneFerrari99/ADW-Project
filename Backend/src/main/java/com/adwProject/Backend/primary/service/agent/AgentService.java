package com.adwProject.Backend.primary.service.agent;

import com.adwProject.Backend.primary.dto.AgentInput;
import com.adwProject.Backend.primary.entity.Agent;

import java.util.List;

public interface AgentService {         //The "AgentService" interface contains a collection of methods that will be implemented in the "AgentServiceImpl" class
    Agent getById(String agentCode);
    List<Agent> getAgents();
    Boolean deleteAgent(String agentCode);
    Agent createOrUpdateAgent(String agentCode, AgentInput agentInput);
    Boolean restoreAgent(String agentCode);
}
