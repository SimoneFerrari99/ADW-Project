package com.adwProject.Backend.primary.resolver;

import com.adwProject.Backend.primary.entity.Agent;
import com.adwProject.Backend.primary.service.agent.AgentService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
//@Slf4j
@AllArgsConstructor
public class AgentResolver implements GraphQLQueryResolver {
    private final AgentService agentService;

    public Agent agentById(String agentCode) {
        return agentService.getById(agentCode);
    }
    public List<Agent> getAgents() {
        return agentService.getAgents();
    }

}
