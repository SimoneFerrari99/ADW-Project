package com.adwProject.Backend.primary.service.agent;

import com.adwProject.Backend.primary.dto.AgentInput;
import com.adwProject.Backend.primary.entity.Agent;

import java.util.List;

public interface AgentService {
    Agent getById(String agentCode);
    List<Agent> getAgents();
    Boolean deleteAgent(String agentCode);
    Agent createOrUpdateAgent(String agentCode, AgentInput agentInput);
    Boolean restoreAgent(String agentCode);
}
