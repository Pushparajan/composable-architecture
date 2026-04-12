---
title: 'Micro frontends for Composable Commerce Platforms'
description:  Combine micro frontend fragments that are built by different teams using different technologies to one composable platform
date: '2022-10-02'
modified_date: '2022-10-02'
image: /assets/images/posts/micro-frontends.png
tags:
  - Composable Architecture
  - Micro Frontend
---

While building content management applications, a monolith isn't the wrong choice all the time. But it can slow down the development process and increase the complexity. To increase agility and embrace DevOps, developers must build their applications with great modularity.  
The micro frontend is becoming a buzzword that changes how developers think about their web development architectures. This article will demystify the micro frontend paradigm, why it's becoming a popular architecture choice among developers, and why it has become critical for composable commerce platforms.

Before we dive deeper into this topic, first, let's look at the basic content management system architectures used:

## Content Architectural Patterns

### Monolith

Programmers are typically full-stack developers in this type of architecture. They frequently perform both frontend and backend tasks. Experience Platforms in this category have a data layer, process layer, and presentation layer, all bundled together. Most prior-generation CMS platforms like Adobe Experience Manager, Sitecore, and Drupal all fall in this category. Such platforms provide the WYSWYG view to the marketers and have been effective for static digital marketing and corporate site. The customization and development of such platforms are complex and take time.

### Content Microservices

Microservices is an architectural approach where applications are broken down into loosely connected services. In content microservices or Content As Service platforms like Contentful, Hippo, and Strapi, the content is provided in a headless approach. The data and service layer are decoupled from the presentation layer via integrations with simple protocols like HTTP as a restful JSON data format. GraphQL is the newest approach that reduces the number of backend calls and saves network time. Marketers cannot view the experience in the WYSWYG view, though building Frontend SPA applications is more straightforward and provides the agility to change the experience quickly.

### Micro frontends

As customer behavior and touch points are changing fast, and the channels in which customers engage with brands are increasing, It is not enough to have the flexibility to adapt new device-specific presentations but also the need to be more agile between the page sections. A micro frontend architecture views a web application as a collection of features controlled by various independent teams. This method works well for complex applications because simple ones can become challenging and cluttered to maintain over time. This architectural design pattern transforms the monolith UI into smaller and more manageable deployable units. It offers independent releases of both microservices and the presentation blocks. Content as Service is not adequate, and there is a need for an additional layer to compose the micro frontends.

## Why do we need micro frontends?

### Independent Teams

Multiple teams can work on the application independently to contribute to multiple systems. It further allows developers to divide the work and scale it up through smaller deployable units.

### Independent Releases

Each micro frontend should have a separate continuous delivery pipeline that builds, tests, and deploys it to production, regardless of how or where your frontend code is hosted. The developers can deploy each micro frontend without much consideration for the condition of other codebases or pipelines.

### Simple, decoupled codebases

As opposed to the source code of a single monolithic frontend, the source code for each micro frontend will, by definition, be substantially smaller. These smaller codebases typically have simpler, easier-to-use interfaces for developers. It avoids complexity, in particular, that results from the inadvertent and inappropriate coupling between components that shouldn't be aware of one another.

### Incremental Upgrades

With micro frontend architecture, developers are afforded more freedom in making case-by-case decisions on individual parts of their web applications. Plus, it helps make incremental upgrades to the development architecture, user experience, and dependencies.

## Important decisions when starting micro-frontends

### Slicing

The whole point of micro frontends is to slice up large, intimidating objects into smaller, more manageable bits while being clear about their interdependencies. Teams, technology selections, codebases, and release methodologies should be able to function and develop independently of one another without overly coordinating. To simplify the slicing process, one can use the bounded context pattern: A fundamental pattern in domain-driven design is bounded context. The strategic design component of DDD, which is all about working with big models and teams, is focused on it. DDD handles big models by breaking them into multiple Bounded Contexts and clarifying how one context relates to the others.

### Orchestration and Composition

With micro frontends, multiple modules build to form a single application. The module builds need to be developed and deployed individually, not depending on each other. These modules can be composed in the following approaches.

### Build Time Composition

with tools like web pack 5 module federations

### Run Time Composition

client-side, edge-side, and server-side composition with frameworks like NextJS, Gatsby, Angular Universal

## Data Communication

Data between micro frontends are challenging. Often a storage-based (Redux) or event-based (Event handlers) communication method is used to bridge the gap.  

## Testing

While testing the micro frontends, one should consider the following points:
Who owns the micro frontends, including the pipelines.
Coordination of fixes across the micro frontends

## Conclusion

Businesses need technology solutions that are composable so that they would be able to react to market conditions swiftly. There is also a need to provide tailored content to have one-on-one communication with the client without much manual work and to maintain multiple systems.
Micro frontends enable the ability to divide the complete solution into separate parts that various independent teams can manage. API-based content as service tools, in combination with micro frontend composition tools like Next JS, Gatsby, Build.io, Frontasic, and other SaaS products, are frameworks and tools to watch out for building future composable commerce platforms.
