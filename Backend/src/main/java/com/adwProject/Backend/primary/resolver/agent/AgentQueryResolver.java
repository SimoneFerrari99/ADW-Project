package com.adwProject.Backend.primary.resolver.agent;

import com.adwProject.Backend.primary.entity.Agent;
import com.adwProject.Backend.primary.service.agent.AgentService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
@AllArgsConstructor
public class AgentQueryResolver implements GraphQLQueryResolver {                               //The resolver, in this case GraphQLQueryResolver, is the penultimate step in executing the Query
    private final AgentService agentService;

    public Agent agentById(String agentCode) {                                                  //Method used for search an Agent by Id ("agentCode")
        return agentService.getById(agentCode);
    }
    public List<Agent> getAgents() {                                                            //Method used for retrieve all existing Agent
        return agentService.getAgents();
    }

}
