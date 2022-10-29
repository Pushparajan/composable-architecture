---
title: 'API Gateways for Composable Stack'
description: Discuss Cloud native options for selecting the right API Gateway in a Composable Architecture
date: '2022-10-29'
modified_date: '2022-10-29'
image: /assets/images/posts/api_gateways_for_composable_stack.jpg
tags:
  - Composable Architecture
  - API Gateway
---
Composable Packaged Business Capability (PBCs) is a set of APIs that help realize the business logic modern organizations innovate faster and be agile to address changing market situations. API gateway connects to these APIs in an organized and secure manner without compromising performance or security. 

API gateway has transitioned from being ingress sentries to a multi-purpose connectivity solution.   Let's declutter the different technologies and trends in implementing an API gateway. 

Mulesoft, Kong, APIGee, and various other API gateways in the market are implemented differently from the ground up and have their benefits. 

## What do we look for in a modern API gateway?

Understanding the evolution of the API gateways and in which category each of the tools in the current market fall is important.
Modern API gateways like Hasura and Soloi.io support protocols like GraphQL, Kafka, and gRCP. They also facilitate secure and future-proof communication between internal sources and external users or devices. Typically each of the organizations has 100s of APIs grouped within the PBCs. Hosting these PBCs require infrastructure-as-code flexibility in a platform-agnostic way. Zero-Trust Security for API with advanced authentication and encryptions is a norm for interconnectivity. Managing many API endpoints requires better configurability, distributed logs, and full developer observability. API management also involves in securely decoding, interpreting, and filtering requests. Composable Commerce sites, in particular, need the API layer to support scalability and performance. 

## Evolution of API Gateways

### 1) Hardware-Based Load Balancers

Routing the API request based on the domain or path can be done rudimentarily with the age-old hardware-based load balancers at the network perimeter. F5, Amazon ELB, and Citrix ADC  are examples. Ideally, the management layer should be able to govern configurations via tools that support modern DevOps standards. Separate network teams manage the configurations manually at high operational costs. Managing the routing at scale is a concern with this approach.

### 2) Web Server-Based Load Balancers

Nginx and Apache are some tools that provide web server-based load balancers. Web server-based technologies act as a reverse proxy and are reliable for static content ingress and egress. Web server-based load balancers are not built for API management and have drawbacks in highly dynamic environments. Support for Web Application Firewall (WAF) is not part of these balancers and is supported by adding other solutions like the Akamai CDN's WAF. As a result, web server-based load balancers is not a good option for a zero-trust security model in the cloud infrastructure. 

### 3) Full Life-Cycle API Management Products

The Advent of Java technologies and frameworks yielded a new breed of full life-cycle API management products like APIGee. These products internally use databases like Cassandra or Postgres, Apache Zookeeper for distributing the requests, and support configuration via DevOps tools like puppet and tools like Nagios for monitoring. 

These tools still rely on webservers like Nginx. The very nature of the VMs in terms of latencies impacts the performance of these solutions. Though these tools are built RESTful, they are not cloud-native, and protocols like gRPC and GraphQL are add-ons. 
 
## The Road ahead

API gateways in the future would have to understand who the user is, whether a person or an application, authorize, collect metrics, transform requests and be extensible to perform any other appropriate action. The API gateways should have the ability to inject business logic abstractly. Emissary-ingress and Apache Apisix are emerging open-source tools that are cloud-native. While Mulesoft and Kong continue to transform, Gloo and Easegress are notable tools.
