package com.adwProject.Backend.primary.resolver.agent;

import com.adwProject.Backend.primary.dto.AgentInput;
import com.adwProject.Backend.primary.entity.Agent;
import com.adwProject.Backend.primary.service.agent.AgentService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class AgentMutationResolver implements GraphQLMutationResolver {

    private final AgentService agentService;

    public Boolean deleteAgent(String agentCode) {
        return agentService.deleteAgent(agentCode);
    }
    public Agent createOrUpdateAgent(String agentCode, AgentInput agentInput) {
        return agentService.createOrUpdateAgent(agentCode, agentInput);
    }
}
