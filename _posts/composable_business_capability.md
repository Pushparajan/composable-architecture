---
title: 'Making Business Sense of Microservices with Packaged Business Capability'
description: Discuss what Packaged Business Capability is and how to choose a composable product
date: '2022-11-06'
modified_date: '2022-11-06'
image: /assets/images/posts/composable_business_capability.png
tags:
  - Composable Architecture
  - PBC
  - Packaged Business Capability
---

Gone are the days businesses have had only two options build vs. buy or the combination of the two in some proportions. Companies do not have the time to change their technology platforms to adapt swiftly to change based on consumer needs. Though we have Microservices, native cloud applications, and established agile deliverable processes, the time to build is not fast enough to meet the changing requirements. Most lime businesses have bought monolith products to keep up with the time. 

The Monolith applications need to establish proper boundaries, and businesses pay two separate vendors for the same business capability. When custom building microservices to support the missing or weaker business capability ends up in multiple fine-grained applications. Right-sizing the business capability becomes an essence. "Package Business Capability" was the term Gartner named this solution. PBCs represent a clearly defined business feature functionally identifiable by a business user.  

To Technically understand a PBC, we need to recap what a Microservice is. "Microservices are small, autonomous services that work together" - Sam Newman. In the principles he defined, microservices are modeled around a business domain,  hide the implementation details, decentralize everything, automate and deploy independently, isolate the failure, and are highly observable. The very nature of being small and decentralized has problems and proven solutions around it. The microservices expose the functions via APIs and listen to events across other applicable services to keep up with the data changes happening in them.

We often end up with more than one microservice to provide a business capability. Organizations need not know the details about how many microservices are created. Instead, they need to know what ability they get from the product they buy or pay for. A platform business capability is, technically speaking, a constrained collection of an event channel, a set of microservices, an associated data structure, and an API gateway exposing possible operations. A PBC can hold one microservice or more than one. The effectively established PBCs are fully operational to ensure autonomy (no critical external dependencies, no need for direct external access to its data). 

Software vendors in this approach deliver fluid source pools of PBCs. Organizations and Business Architects help businesses to identify the business capability required for the enterprises and COMPOSE the PBC from different vendors to deliver the required software application. PBCs are designed to form the foundation for application product suites and individually constructed application experiences. This approach reduces operational complexity for traditional workloads while boosting active momentum for next-generation services and applications.  

In today's world, there are two types of vendors, one that provides PBCs built from the ground up with cloud-native standards and the existing monoliths that offer APIs for integrations. Business architects not only carefully assess the business capability requirements of the organizations but also watch out for the following,

### 1) Domain Boundaries

Software vendors often make quick adjustments to the products they already have with additional business capabilities that are not their core capability, like a commerce product with a content capability or a content product that offers search capability. Business Architects have to be watchful of the finer features of the product capability so that they pick the best-of-the-breed solution.

### 2) API Driven and Orchestrated Assembly 

A composable architecture that allows for simple reconfiguration enables dynamic structure and customization. 
Modular-based, composable solutions must be innovative and adaptable because company needs vary over time. PBCs should provide discoverable interfaces so other PBCs can be connected or disconnected when needed. Most times, different countries or geographies have different complaint standards. The composable application should allow for seamless integrations.

### 3) Event Driven Data Synchronization

Microservices are architected to manage the data they need, providing the speed to perform and the agility to change. The context they hold is limited to the functions they provide. There are PBC that rely on other PBCs to offer better functionality. For example, consumers are looking for products in their local area. The search PBC needs to know their changing location information to provide an appropriate match. The Search PBC should be able to subscribe to changing location events of the consumer.

### 4) Independently Deployable Business Capabilities

In the current norm, PBCs are mostly SAAS products hosted on cloud infrastructure by the solution developers. Composable solution providers should provide more options to organizations evolving to modern composable architectures. 

### 5) Multiple Experiences

User experiences come from different personas today, including developers, businesses, and consumers. The composable solution provider should provide an adequate interaction experience for all users. Users are not only working on the web or desktops, so the Experience platform should allow implementation of the experience omnichannel. Some DXPs are transforming to composability, Low code options like Salesforce Lightning are evolving, and so are Frontend as Service (FEaaS) platforms like Frontastic. The backend PBC should play well with the frontend experiences 

## Conclusion

Packaged Business capabilities reduce the complexity for the organizations that build the solutions and those that buy the solution. Vendors can quickly adapt to the changing business needs by implementing the functionality of the PBC they offer and staying the best of the breed. Organizations can easily compose an application that fits their business needs.
 