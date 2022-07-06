package com.adwProject.Backend.primary.service.agent;

import com.adwProject.Backend.primary.dto.AgentInput;
import com.adwProject.Backend.primary.entity.Agent;
import com.adwProject.Backend.primary.entity.Customer;
import com.adwProject.Backend.primary.entity.Order;
import com.adwProject.Backend.primary.map.MapAgent;
import com.adwProject.Backend.primary.repository.AgentRepository;
import com.adwProject.Backend.primary.repository.CustomerRepository;
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
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final MapAgent mapAgent;

    @RequestMapping(value="/primary")
    @Override
    public Agent getById(String agentCode) {
        return agentRepository.findById(agentCode).orElse(null);
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
        List<Customer> customers = customerRepository.findCustomerByAgentAgentCode(agentCode).orElse(null);
        boolean allCustomersDisabled = true;

        if(orders == null) {
            throw new GraphQLException("There is no Agent according with id: " + agentCode);
        }

        if(customers == null) {
            throw new GraphQLException("There is no Customer according with id: " + agentCode);
        }

        if(orders.isEmpty() && agentRepository.existsById(agentCode)) {
            Agent agent = agentRepository.findById(agentCode).orElse(null);
            User user = userRepository.findById(agentCode).orElse(null);

            if(!customers.isEmpty()){
                for (Customer c : customers){
                    if (c.getActive()) {
                        allCustomersDisabled = false;
                        break;
                    }
                }
            }

            if(agent != null && allCustomersDisabled) {
                agent.setActive(false);
                agentRepository.save(agent);
                if (user != null){
                    user.setActive(false);
                    userRepository.save(user);
                }
                return true;
            }
        }

        return false;
    }

    @RequestMapping(value="/primary")
    @Override
    public Agent createOrUpdateAgent(String agentCode, AgentInput agentInput) {
        if(agentCode == null) {
            Agent agent = mapAgent.mapInputToCreateAgent(agentInput);
            agentRepository.save(agent);
            return agent;
        }
        Agent agent = agentRepository.findById(agentCode).orElse(null);
        if(agent != null) {
            mapAgent.mapInputToUpdateAgent(agentInput, agent);
            agentRepository.save(agent);
            return agent;
        }
        throw new GraphQLException("There is no Agent according with id: " + agentCode);
    }

    @RequestMapping(value="/primary")
    @Override
    public Boolean restoreAgent(String agentCode) {
        Agent agent = agentRepository.findById(agentCode).orElse(null);
        User user = userRepository.findById(agentCode).orElse(null);

        if(agent != null) {
            agent.setActive(true);
            agentRepository.save(agent);
            if(user != null) {
                user.setActive(true);
                userRepository.save(user);
            }
            return true;
        }
        return false;
    }
}