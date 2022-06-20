package com.adwProject.Backend;
import org.graphqlize.java.GraphQLResolver;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
public class GraphQLController {
    private final GraphQLResolver graphQLResolver;
    public GraphQLController(GraphQLResolver graphQLResolver) {
        this.graphQLResolver = graphQLResolver;
    }
    @PostMapping("/graphql")
    public ResponseEntity handle(@RequestBody GraphQLRequest graphQLRequest) {
        String result =
        graphQLResolver.resolve(
                graphQLRequest.getQuery(),
                graphQLRequest.getVariables());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "application/json")
                .body(result);
    }
}

