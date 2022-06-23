package com.adwProject.Backend.helper.map;

import com.adwProject.Backend.domanin.AgentInput;
import com.adwProject.Backend.entity.Agent;

public class MapAgent {
    public Agent mapInputToAgent(AgentInput agentInput) {
        Agent agent = new Agent();

        agent.setAgentCode(agentInput.getAgentCode());
        agent.setAgentName(agentInput.getAgentName());
        agent.setWorkingArea(agentInput.getWorkingArea());
        agent.setCommission(agentInput.getCommission());
        agent.setPhoneNO(agentInput.getPhoneNO());
        agent.setCountry(agentInput.getCountry());
        return agent;
    }
}
