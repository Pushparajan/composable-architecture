---
title: 'Saga Pattern and achieving Eventual Data Consistency in Composable Data Architecture '
description: Discuss on how to achieving Data Consistency across packed business capability with patterns like Saga in Composable Data Architecture 
date: '2022-11-25'
modified_date: '2022-11-25'
image: /assets/images/posts/saga_pattern_composable_data_architecture.jpg
tags:
  - Composable Architecture
  - Composable Data Architecture
  - Data Modeling
  - Saga Pattern
  - Eventual Consistency
---

The reality of Consumer Product Organizations and the Retail Industry is that seasonal ups and downs exist. The organization's business functions have to scale up to support the demand and scale down to avoid unused costs. Composable business architecture provides that ability via the microservices-based Packaged Business Capabilities (PBC). The very nature of the PBCs is that they have their own data storage for them to avoid external dependencies and performance issues. 

Providing end consumers with a seamless and compelling experience needs the data collected across the PBCs and provides suitable recommendations across the purchase journey. This article discusses the different data patterns to keep the data rather than ending up in silos.

## Seamless Experience

In traditional applications, consistency is mandatory for all transactions. When a transaction occurs, the data is committed to all the systems that store the data. For example, the order transaction is only executed if both the account and the inventory transactions are successfully saved. If either operation fails, the entire transaction is rolled back. The ACID (Atomic, Consistent, Isolation, and Durability) transactions ensure that the same product cannot be ordered by two different people and causes difficult experiences in the purchase process. When we prioritize scalability and availability over the consistencies with PBCs, architects should use patterns like SAGA and, Eventual Consistency.

## Saga pattern

A few concepts, Domin-driven Design (DDD), refers to designing components related to a specific business domain. In the DDD context, Event sourcing is a design and development approach to seeing applications as a system of events rather than a system of states. The state of the applications is always aggregated from the series of events. This design approach improves the analytics and data mining needs. 

Any PBC in the Saga consumes  (Event Handling) and emits (Event Publishing) a message. The UI sends an order message to the order service and the order component. The order component performs the transaction, commits to its data store, and on success, emits a message. The inventory and the account components consume this message, serve their part of the transaction and store the data locally. Once the transaction is successful in the individual components, they emit a success message. After all the components have succeeded, the final transaction is completed, and the order is confirmed back to the user via the UI.

When a transaction fails in one component or PBC, it emits a rollback or unsuccess event. All the components of the primary transaction are notified or listening to the event. Based on the rollback event notifications, the individual PBCs also roll back the local transaction, and the primary transaction failed; in this case, the order is not placed.

The passing of an event can be sequential, a -> b -> c, and/or orchestrated by an event orchestrator. The Event orchestrator logs all the events to an Event Store (DB or file), and then the Event orchestrator sends out events to the PBCs. If one event in the saga fails (Exception Handling), then the Event orchestrator sends a compensation request to each component. The event orchestrator is implemented as a microservice and is reliable and recoverable. In case of failure of the event orchestrator, the event orchestrator should have the ability to replay the messages. Seata, Camuda, Apache Camel, Axon, and Kafka all help realize the Saga pattern. 

## Eventually Consistent

ACID Transactions are costly because all the related resources need to be locked or atomized. It is an approach only the absolutely mandatory data is locked, and the rest of the data is updated eventually and not immediately. This model is called the Basic Available Soft state Eventually available (BASE) model. Availability is the primary problem for the BASE and compromises consistency. There are multiple ways to implment this, a simple approach would be for the main transaction to write to a sql db and trigger could fire an event to service that can ensure the data is consistent on a seperate transaction.

## Wrapping up

Availability is a critical use case for seamless and compelling user experiences. Event-driven architectures are fueling the Composable Architecture drive across all industry sectors. Improvements in the streaming cloud-native applications are helping to reduce the time it takes to be eventually consistent in micro-milliseconds. Enabling API gateways on top of old IT systems is not enough to scale for todays technology platforms. Composable data architecture is a foundation for plug and play of composable packaged business capabilities.
