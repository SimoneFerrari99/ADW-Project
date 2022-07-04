package com.adwProject.Backend.primary.resolver.agent;

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
}
