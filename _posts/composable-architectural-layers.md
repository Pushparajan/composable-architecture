---
title: 'Layers of Composable Architecture'
description: Discuss the various architectural layers of composable software architectures
date: '2020-09-25'
modified_date: '2020-09-25'
image: /assets/images/posts/composable-layers.png
tags:
  - Composable Architecture
  - Layers
---

In software architecture, composable is not a new phenomenon. Software architects have always looked at software decomposition as a tool to design modular, manageable, and predictable applications. In the current world, technology innovation is rapidly forcing us to use polyglot sub-systems as a means to integrate them quickly. Customer behavior is frequently changing, and so is the number of new digital channels evolving. Businesses need to actively listen to changing consumer behavior across omnichannel. Building such a solution cannot be achieved via monolithic solutions that are vendor locked.

## What is Composable Architecture?
Composable Architecture is business focused. It provides companies the agility to transform. For example, newer delivery models like curbside pickup had become crucial during the pandemic, and composable applications quickly supported the new business model with contained changes. Composable tools focus on solving one business function that they are scoped and ensure that there is no duplication of functionality. 

With speed and agility at the core, composable solutions are natively API driven. The composable architecture sub-systems exposed defined interfaces via which businesses can quickly and seamlessly integrate other sub-systems. The system-system blocks can be reused or replaced easily without causing a ripple effect on all the integrated systems.

From the development perspective, each building block can use any programming language and be built and deployed frequently based on the latest devop principles and tools. Each block is made based on MicroServices principles, self-contained with the application and the data required to provide the business function.

Composable Architecture supports both horizontal as well as vertical scalability of infrastructure. Each sub-system manages its non-functional requirements like performance and redundancy.

## Architectural Layers
Building blocks of composable architecture are decoupled based on the layered architecture pattern. As the MACH alliance puts it, the layers are frontend, experience composition, API Gateway, business functions, data layer, and systems of record.

In the grand old days, digital customers had very few channels of connecting with brands. With the advancement of technologies, consumers digitally connected with businesses with IoT devices like fridges, doorbells, and thermostats to voice devices like Alexa, social channels, laptops, desktops, mobile, touch screen kiosks, etc. Each piece of equipment has different touch points through the customer purchase journey, requiring different ways of communication and providing the customer experience across omnichannel needs more flexibility.   Headless is a new buzzword that talks about this approach. 

There has been much debate on putting the CMS or Commerce on the top. Keeping either on top has created entanglement. Often vendors have overlapping business functions, and the businesses have to pay for them irrespective of the usage, thereby introducing vendor lock-in. Headless Commerce or Headless CMS products provide the best-of-the-breed solutions. Organizations can now choose the right tool for presentation, whether custom-built or vendor-provided solutions like webflow, frontastic, shogun, etc.

With multiple frontend applications making various calls to the granular microservices, the need for the experience composition layer is vital. The Backend-for-frontend pattern provides the approach for avoiding multiple server calls. With GraphQL raising as a defacto way to query for the read-only data, tools like apollo solve this need to orchestrate the experience and provide personalized and channel-specific data to the views.

With Microservices-Based architecture, though the application is more modular, the frontend application will have complexity in keeping track of multiple endpoints and managing failover and resiliency. This situation indeed creates more coupling between the frontend and the services. API Gateways come to the rescue and act as the glue between the front end and the services by routing to the right microservice, aggregating the service calls, providing consistent data, and doing the protocol translations required between the layers. They also offer non-functional needs like security, authentication, caching, rate limiting, etc.

Each of the services is built using the same or a different language. The Service can be developed and deployed independently into containers that are scalable in real-time. The microservices hold the data required within them to ensure speed.

Granular Microservices mean distrubited data. Distributed creates another problem data inconsistency. An event-driven messaging design pattern is used to keep data eventually synchronous across all microservices. 

## What Next?
Having established the layers of composable architecture, let's discuss each of the layers in separate articles.