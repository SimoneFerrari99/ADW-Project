package com.adwProject.Backend.primary.map;

import com.adwProject.Backend.primary.dto.AgentInput;
import com.adwProject.Backend.primary.entity.Agent;
import org.springframework.stereotype.Component;

@Component
public class MapAgent {                                                         //This class is used for mutations. It helps us map incoming data from the frontend (AgentInput) to the Agent
    public Agent mapInputToCreateAgent(AgentInput agentInput) {                 //Method used for map incoming data to the new Agent
        Agent agent = new Agent();

        agent.setAgentName(agentInput.getAgentName());
        agent.setWorkingArea(agentInput.getWorkingArea());
        agent.setCommission(agentInput.getCommission());
        agent.setPhoneNO(agentInput.getPhoneNO());
        agent.setCountry(agentInput.getCountry());
        agent.setActive(agentInput.getActive());
        return agent;
    }

    public Agent mapInputToUpdateAgent(AgentInput agentInput, Agent agent) {    //Method used for map incoming data to update data in Agent

        agent.setAgentName(agentInput.getAgentName());
        agent.setWorkingArea(agentInput.getWorkingArea());
        agent.setCommission(agentInput.getCommission());
        agent.setPhoneNO(agentInput.getPhoneNO());
        agent.setCountry(agentInput.getCountry());
        return agent;
    }
}
