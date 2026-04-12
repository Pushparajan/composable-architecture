---
title: 'Query Language for Frontends in Composable Architecture - GraphQL'
description: Discuss how GraphQL can be used as a Query language and an execution engine in Composable Architecture
date: '2022-10-15'
modified_date: '2022-10-15'
image: /assets/images/posts/query_language_for_frontends.jpg
tags:
  - Composable Architecture
  - Micro Frontend
  - GraphQL
---

Micro Frontends and Microservices enhance modular components, which have significant benefits and some concerns. One such problem is the frequency of back-and-forth communication between the frontends and the backends. GraphQL comes to the rescue. Graphql is a query language for clients and an execution engine for servers. It was initially created at Facebook in 2012 to describe the capabilities and requirements of data models for client-server applications in a typesafe and comprehensive way. Being a powerful developer tool, it gives clients the power to ask the API precisely what they need. It doesn't only access the properties of the resources but follows the references between them. So, with a single request, GraphQL fetches only the required data fields, reducing the payload size.

Consider a commerce example where server schema declares the capabilities like fetching product id and name traversing the relationship between products and reviews. The frontend client can precisely mention which of the fields in products and the ones in reviews are required and specify in the code.

The schema definitions in GraphQL are declarative and provide valuable tools, including federations. Also, the client operation selects only the requirements it needs. There are more fields in the schema definitions than what the frontend fetches. With GraphQL, the client gets control, while the server is responsible for the execution.

## GraphQL and REST

GraphQL and REST provide JSON responses. The difference is in the endpoint. With REST, there will be a different path to get responses that the client has to be aware of. In GraphQL, there is only one endpoint, and with HTTP commands, the client can send the appropriate request and get the required response. This GraphQL approach gives much consistency to the customers across the device-specific frontends.

## Benefits of Single Endpoint

- Consistency across Clients
- Less Redundant Logic across Clients
- Addresses Shortcomings of BFFs and similar architectural patterns
- Easy to Cache

## GraphQL Caching

Looking a bit deeper into caching, we need to look at some of the GraphQL tools that natively solve this. The Apollo platform is one such platform implementation of GraphQL. The Apollo server transfers data from the microservice to the frontend. By including the Apollo client in the frontend, the logic to retrieve the data, track changes, and update the frontend is managed via hooks (in react js terms). The data fetching is declarative, and caching is available out of the box with zero configuration. 

## Establishing a Single Graph Layer and GraphQL Federation

Each Micro frontend requires data from more than one microservice at any time instead of making multiple calls to each of the services, and the frontend informs the federation layer to get all the data across various domains, combine and provide the single graph data. This single graph data is called a supergraph or federated graph. The federated graph is a collection of sub-graphs, each representing a GraphQL API endpoint. The client sends the domain object fields it requires and the URLs hosted by those service's API endpoints. Once you have a single graph schema, run it through a query planner. The query plans are similar to the EXPLAIN Function in SQL. It shows what the engine will do to fetch the data from the microservices.

## Wrapping up

As learning comes in from various big GraphQL implementations, newer tools and approaches exist to implement this better. There are some competitive tools and some complementary ones. Apollo Server allows writing custom GraphQL server implementation and is used widely. Prisma, for example, is an ORM for GraphQL. Prisma.io will enable developers with Typescript code to read data from Databases and generate GraphQL endpoint. Hasura that is funded by SAP connects with databases, microservices, other upstream composable SaaS APIs, and event-driven business logic to provide a single graph schema.