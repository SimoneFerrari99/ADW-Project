package com.adwProject.Backend.primary.resolver.agent;

import com.adwProject.Backend.primary.dto.AgentInput;
import com.adwProject.Backend.primary.entity.Agent;
import com.adwProject.Backend.primary.service.agent.AgentService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class AgentMutationResolver implements GraphQLMutationResolver {                                     //The resolver, in this case GraphQLMutationResolver, is the penultimate step in executing the Mutation

    private final AgentService agentService;

    public Boolean deleteAgent(String agentCode) {                                                          //Method used for delete an Agent by Id ("agentCode"), if exist
        return agentService.deleteAgent(agentCode);
    }
    public Agent createOrUpdateAgent(String agentCode, AgentInput agentInput) {                             //Method used for create a new Agent or update an existing Agent
        return agentService.createOrUpdateAgent(agentCode, agentInput);
    }
    public Boolean restoreAgent(String agentCode) {                                                         //Method used for restore a disabled Agent
        return agentService.restoreAgent(agentCode);
    }
}
