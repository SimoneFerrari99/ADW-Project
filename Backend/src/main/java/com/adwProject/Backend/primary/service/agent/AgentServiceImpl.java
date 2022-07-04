package com.adwProject.Backend.primary.service.agent;

import com.adwProject.Backend.primary.entity.Agent;
import com.adwProject.Backend.primary.entity.Order;
import com.adwProject.Backend.primary.repository.AgentRepository;
import com.adwProject.Backend.primary.repository.OrderRepository;
import com.adwProject.Backend.secondary.entity.User;
import com.adwProject.Backend.secondary.repository.UserRepository;
import graphql.GraphQLException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Service
@AllArgsConstructor
public class AgentServiceImpl implements AgentService {
    private final AgentRepository agentRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @RequestMapping(value="/primary")
    @Override
    public Agent getById(String id) {
        return agentRepository.findById(id).orElse(null);
    }

    @RequestMapping(value="/primary")
    @Override
    public List<Agent> getAgents() {
        return agentRepository.findAll();
    }

    @RequestMapping(value="/primary")
    @Override
    public Boolean deleteAgent(String agentCode) {
        List<Order> orders = orderRepository.findByAgentAgentCode(agentCode).orElse(null);
        if(orders == null) {
            throw new GraphQLException("There is no Agent according with id: " + agentCode);
        }
        if(orders.isEmpty() && agentRepository.existsById(agentCode)) {
            User user = userRepository.findById(agentCode).orElse(null);
            agentRepository.deleteById(agentCode);
            user.setActive(false);
            userRepository.save(user);
            return true;
        }
        return false;
    }
}
