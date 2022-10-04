---
title: 'Overcoming Challenges in implementing Micro Frontend Composable Architectures'
description: Discuss how to solve cross microfrontend communication, shared state management, authentication, backend communication, Design consistency, routinc, and Testing challenges.
date: '2022-10-04'
modified_date: '2022-10-04'
image: /assets/images/posts/micro-frontends-overcoming-challenges.png
tags:
  - Composable Commerce
  - Micro Frontend
---

In my previous article, we spoke about what Micro frontend architecture is, and in this article, we will take a deeper look. As discussed, Micro frontend architecture is the future of frontend web development that has seen recent exuberant growth over the monolithic approach. It gives the same flexibility, adaptability, and scalability. The professionals can split an entire software into small fragments, develop, test, and deploy it independently. They can also integrate micro frontend components with other frameworks on the same website page by embedding multiple applications into a container.
When building an application with micro frontend-based architectures, let's discuss how to solve cross microfrontend communication, shared state management, authentication, backend communication, Design consistency, routinc, and Testing challenges.

## Cross Micro Front End Communication

Micro frontends on the same page often need to show content relevant to other micro frontends and update themselves when user actions are with other micro frontends. For example, When the user logs in, you may want to display some personalized offer. Separate micro functions login micro frontend and an offer micro frontend implemented. Similarly, the catalog could be a micro frontend in a typical commerce application, and the shopping cart could be another. When the end user clicks add to cart on the catalog micro frontend, the cart micro frontend module should know that state and update the counts to display. There are different techniques for the micro frontends to communicate with each other; some of them are as below, 

### a) Using Props

It's the primary cross-micro frontend communication technique. In this approach, lift the state to the container app as props and transfer the state to the required micro frontends using handler functions. Most frontend frameworks like React, Angular, or Vue support this approach. Only the required data is passed between micro frontend modules, avoiding prop-drilling issues with state management.

This approach may add coupling between the micro frontend and container application. In some cases, it may even trigger a reloading of multiple micro frontends and impact performance. Also, in this approach, each micro frontend needs to be developed with the same framework, i.e., if ReactJS was the chosen framework for one micro frontend, then all micro frontends should use ReactJS only.

### b) Using Platform Storage

Local storage is available for browsers and mobile devices. This approach reduces the coupling between the micro frontends. Use this approach for more minor data; with more extensive data, this may cause conflicts, security, and memory leak issues. It will be a challenge to debug the application as a whole as different micro frontends would be manipulating the data in local storage at the same time. 

### c) Using Custom Events

All modern browsers support event listeners and subscribers. All micro frontend teams can design a generic approach to what events they would publish and what they would listen to. Custom events may have some setup costs, but they are easy to scale. Eventing enables cross micro frontend communication on the same page, at the state can not be shared to multiple pages. The events need to get unsubscribed on unmount of a component.

### d) Using Post Message Passing in iFrames

As mentioned above, cross-page or iFrame communication is complicated. The Window.postMessage() allows for cross-origin or iFrame communication securely.

### e) Using Message Bus

Expanding on the basic JavaScript approach, the Message Bus approach provides "broker" and subscriber implementations. The micro frontend Message Buss is similar to the Enterprise Service Bus implementation on the server side. Message Bus is easy to scale. Postal.js is one such framework, and there are quite a few. This approach has a steep learning curve for all the micro frontend teams.

## Shared State Management

Each microservice has its database. We will need an optimal approach if you want to share the state between these microservices. Simply duplicating the data across each microservices will create chaos and confusion in maintaining the data. There are different approaches to managing and sharing the data as follows,
 
### a) Using Reducer Pattern

The state reducer pattern has three parts, the state, an action dispatcher, and a reducer. Fundamentally state and the action are passed to a reducer function that has the logic to create the new state. Redux is not specific to React framework. It is a pattern used with any framework. With Redux functions, applications tend to bloat as all the micro-frontends have all data access to the application data.

### b) Using URL query Params

An alternative approach to Redux would be to use URL query parameters. As in the example, When you navigate from a cart to check out with a particular order id, the query parameter sends a pointer to that particular order, not the whole order. So, finally, the cart can find the products from the cart, making it easy to manage the state. 

## Authentication

When implementing Micro frontends, the user experience should be seamless. The user should not repeat functions like logging in to each micro frontend. Authentication is both a cross-communication and state management problem. The typical way to authenticate a microservice in a serverless world would be through an authentication token. This authentication token needs to be shared across other micro frontends. Authentication becomes both a cross-communication and state management problem. There are different approaches to address the authentication concerns of micro frontends.

### a) Shell application

Consider using a shell or container application to wrap the login, cart, catalog, and offer micro frontends. The shell micro frontend would hold the authentication token. The shell application refreshes the cart when you pass a refresh token. Even if the cart microservice returns an error or time expiry and the authentication token gets lost in the response, the shell app holds the token and refreshes the other micro frontends

### b) Event Bus

In this approach, the login micro frontend manages the validity of the authentication token. It emits an event to the Event Bus on the updated authentication token. All the subscribed listening micro frontends like cart refresh the token information.

## Backend Communication

The number of service calls to the backend increases with micro frontends as they are associated with one or more microservices, impacting the application performance. The backend for the frontend (BFF) pattern helps reduce the number of server communications by aggregating the data and returning it to the micro front end. Architects should watch out for this approach as this should not end up in a thick monolith function. There are situations where BFFs end up overlapping business functionality.

## Design Systems
As there may be different teams managing different micro frontends on an application, It introduces the problem of consistency of the look-and-feel of the micro frontends across the groups. All of the below need to be kept the same,

- Color Palette
- Typography
- Grid System and Spacing
- Icons and images
- Tone of voice

Establishing a design system and a style library with a collection of design tokens and design assets centrally across tools is enabled with tools like the amazon style dictionary, stencil,  Figma design tokens, and others., and CSS frameworks like Tailwind, Chakra UI, etc.

## Testing Strategy

Testing of the micro frontends individually and collectively. Various testing like below have to be considered before rolling out micro frontends 

- Manual Session-Based Testing
- Automated GUI Tests
- Automated API Tests
- Automated Integration Tests
- Automated Component Tests
- Automated Unit Tests 

## Routing

Routing has the same concerns as authentication and has inter-frontend communication and state synchronization problems. Routing should use a shell app or an event bus-based approach to address the concerns. 

## Wrapping Up

The setup costs are high for micro frontends and need much planning, and today there is not a commercial application composition platform that can help assemble all the micro frontends. Before implementing the micro frontend architecture, discuss the strategies with the team to ensure that micro front ends run independently. A few front-runners, like Vue storefront, Mason, Frontastic, crayond, Builder.io, etc., are decoupling the experience layer and offering frontend as service (FEaaS), yet mostly it is up to the business to build the micro frontends. And this market is set to grow as composable architectures will become the norm. 
