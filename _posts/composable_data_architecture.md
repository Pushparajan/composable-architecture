---
title: 'Data model Design in Composable Data Architecture'
description: Discuss on how to break the Monolith Data into Composable Data Architecture
date: '2022-11-20'
modified_date: '2022-11-20'
image: /assets/images/posts/composable_data_architecture.png
tags:
  - Composable Architecture
  - Composable Data Architecture
  - Data Modeling
---

Organizations have grown extensively over time, and so have the number of disparate applications. Data security has always been a concern, leading to consolidation and centralization. This consolidation has paved the way for data monoliths. Consuming and providing applications must eventually bulk up with business logic to transform the data for business needs. This bulked-up code is a performance and maintenance problem. Scaling one application alone is not possible as the database is shared. Also, data monoliths make it challenging to build and deploy applications due to the tight coupling.  

By definition, each microservices manage its database and data model, and so do the Packaged Business Components (PBC), aka the Composable Architecture components. This article will focus on the database design principles around PBCs.

In the NoSQL era, we have seen in principle that data evolves. We do not force the structure. This principle applies to the PBCs and that the functions evolve the data. Thinking in functions allows for decoupling application data. Function-first thinking also avoids building CRUD-only functions that expose the internal data structures. Business functions abstract data modal from the consuming applications, so all the changes for performance or other enhancements get abstracted from the consuming applications. It causes fewer ripple effects beyond the PBC boundary. Defining the boundary enables the PBCs technology agnostic and database agnostic. One PBC may use a NoSQL database, and others use a relational database.  

In most cases, the same data elements are required across business functions; then, how does that data element get shared across the PBCs? Event-Driven Architecture comes in handy. In the Event-Driven architecture, events fired by business activities are queued (Like add to Cart), and PBCs (like ProfileService and OrderService) subscribe to that topic. Apache Kafka and commercial variants like confluent, RabitMQ, and AWS Kinesis are all tools in this category that enable the eventual synchronization of data across the PBCs. Rather than storing the state data or entity and then coping the entity, the approach is to store the sequence of events so each application can replay the events in the same order to get to the current state. After the data is synchronized at frequent intervals, they are flattened to increase performance and optimize the database storage size.

Sometimes, This constant write optimization cycle is not read-friendly in high-traffic applications with high writes. The pattern that can help is called Command Query Segregation (CQRS). PBCs can implement more than one type of database, one a read-friendly NoSQL database and the other a relational database for the write-operations with this pattern. 

Setting up Composable Architectures is straightforward in green field implementation, yet it has challenges in organizations with large IT implementations. There may be multiple iterations that have to be planned to achieve the decoupled end state. 

1. Firstly, business functions must be identified and documented by Business Architects. 
2. Business Architects should clearly define functional boundaries. 
3. Technology Architects should map the existing data tables and data fields within the monolith database.
4. Technology Architects should identify needed data elements that have to be duplicated across the functions.
5. The Data tables identified for a specific function must be moved to the corresponding PBC that would own the data from now on.
6. Event-Driven architecture has to be implemented for the common data that have to be synchronized eventually. 
7. In some cases, to avoid duplication of common data and maintenance priorities, data-shared services can be created for such data and managed in-house.
8. Iterate on these above steps until there is no more monolith

## Conclusion

Monoliths have evolved for many years now, which would take time to fix. Moving to composable data architecture is not a simple process, yet with the PBCs and the new wave of MACH-based products, the composable market has tools that avoid rewriting a lot of code during this refactoring. 

Change is the way of business, and keeping the applications flexible to meet business needs is a priority more than ever before. Event-Driven Microdatabases are a way to get to business agility and the same time, address data privacy and compliance issues.
