package com.adwProject.Backend.primary.map;

import com.adwProject.Backend.primary.dto.AgentInput;
import com.adwProject.Backend.primary.entity.Agent;
import org.springframework.stereotype.Component;

@Component
public class MapAgent {
    public Agent mapInputToCreateAgent(AgentInput agentInput) {
        Agent agent = new Agent();

        agent.setAgentName(agentInput.getAgentName());
        agent.setWorkingArea(agentInput.getWorkingArea());
        agent.setCommission(agentInput.getCommission());
        agent.setPhoneNO(agentInput.getPhoneNO());
        agent.setCountry(agentInput.getCountry());
        return agent;
    }

    public Agent mapInputToUpdateAgent(AgentInput agentInput, Agent agent) {

        agent.setAgentName(agentInput.getAgentName());
        agent.setWorkingArea(agentInput.getWorkingArea());
        agent.setCommission(agentInput.getCommission());
        agent.setPhoneNO(agentInput.getPhoneNO());
        agent.setCountry(agentInput.getCountry());
        return agent;
    }
}
