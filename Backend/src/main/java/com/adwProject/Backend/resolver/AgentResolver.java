package com.adwProject.Backend.resolver;

import com.adwProject.Backend.entity.Agent;
import com.adwProject.Backend.service.agent.AgentService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;



@Component
//@Slf4j
@AllArgsConstructor
public class AgentResolver implements GraphQLQueryResolver {
    private final AgentService agentService;

    public Agent agentById(String agentCode) {
        return agentService.getById(agentCode);
    }
}
