---
title: 'Function-based architecture (FBA) for building composable architectural blocks'
description:  Discuss about Function-based architecture to develop composable architectural components
date: '2023-03-12'
modified_date: '2022-03-12'
image: /assets/images/posts/function_based_architecture.jpg
tags:
  - Composable Architecture
  - Function-based Architecture
  - Serverless Computing
---

Function-based architecture is a critical concept in serverless computing. Serverless platforms are built to break down applications into small, independent code units called functions. In this architecture, each function is responsible for performing a specific task or operation and can be quickly developed, deployed, and scaled independently. Functions in a serverless architecture are stateless, meaning they don't maintain any state between executions. Each function invocation is independent of any previous request, and any required state must be passed in as input or retrieved from an external data source. A function is a self-contained code triggered by an event, such as an HTTP request or a database update. The function-based architecture addresses the issue of code organization and complexity. Programming languages, including Node.js, Python, Java, and Go, are used to write functions.

One of the critical benefits of function-based architecture is its ability to scale rapidly and efficiently. Serverless platforms automatically scale the number of function instances based on the incoming workload. The platform spins up a new instance to handle the request when a function is triggered. As the workload increases, more compute servers are added, and as the workload decreases, servers are removed. This auto-scaling ensures the application can handle any workload without over-provisioning resources or requiring manual intervention.

Another benefit of the function-based architecture is its pay-per-use pricing model. Serverless platforms charge based on the number of function invocations and the duration of each request, so developers only pay for the actual usage of the application. The pay-per-use use approach makes serverless computing a cost-effective way to build and deploy applications, particularly for workloads that have unpredictable or sporadic traffic patterns.

In a serverless architecture, developers don't need to manage the underlying infrastructure. Instead, they focus on writing and deploying functions. Serverless platforms handle the details of managing and scaling the underlying compute resources, including servers, load balancers, and networking infrastructure. As a result, developers can now focus on writing code and delivering business value rather than managing infrastructure.

Serverless architectures also provide fast and easy deployment of code changes. With traditional deployment models, developers must manage the deployment process and ensure the application is updated and running correctly. In a serverless architecture, the platform handles deployment automatically, ensuring the new code is available for use as soon as it's deployed. As a result, serverless architecture can lead to faster time-to-market and increased agility for the development team.

The function-based architecture also enables developers to build applications integrating with other services and tools. For example, serverless platforms often provide integrations with databases, messaging systems, and other services that are used to build complete applications. For example, a serverless application might use a messaging system to trigger a function that processes incoming messages and updates a database.

There are various serverless computing platforms available for developers today, including,

1. Many companies and organizations, including Netflix, Airbnb, Lyft, and Expedia, use AWS Lambda for various use cases, such as serverless data processing, event-driven computing, and real-time stream processing. AWS Lambda supports Node.js, Python, Java, and .NET programming languages

2. Companies such as Siemens, and Heineken use Microsoft Azure Functions for predictive maintenance and real-time industrial equipment monitoring.

3. Google Cloud Functions is used by companies such as Coca-Cola, Ubisoft, and Philips to automate their sales data processing, while Ubisoft uses it for their game serverless backend infrastructure. GCP supports Node.js, Python, and Go programming languages.

4. Fidelity uses IBM Cloud Functions for their financial functions, while The Weather Company processes its weather data. Companies like H&R Block also use IBM Cloud Functions. IBM Cloud Functions supports Node.js, Python, Java, and Swift programming languages

5. Adobe uses Apache OpenWhisk for its cloud services, like Adobe Experience Platform, and companies like Red Hat. OpenWhisk supports programming languages like Node.js, Python, Java, and Swift.

6. There is more adaptation to newer tools like Zeit Now. Zeit Now is used by companies such as Lyft, Coca-Cola, and Airbnb. Lyft uses Zeit Now for its real-time data processing, Coca-Cola uses it for its sales data processing, and Airbnb uses it for its serverless backend infrastructure. Zeit Now supports Node.js, Python, and Go programming languages

Though there is a fast adoption in various domains, weigh-in the benefits with the concern areas. The following are the few key concern areas when looking at implementing an FBA solution,

1. Managing multiple functions and their dependencies, setting up event triggers, and managing permissions and security all introduce complexity.
Since functions are distributed across multiple instances and managed by the platform, debugging and testing can be challenging.
2. Since each function is not readily available and needs to be started before it can be used, function-based architecture suffers from cold starts and impact the performance of the functions.
3. Selecting the programming language and the vendor platform is essential, as some technologies may lead to vendor lock-in. Architects must use tools like Kubernetes that will run on any major cloud platform provider.
4. Functions are limited by the number of resources allocated to them by the platform, which can limit the amount of processing power, memory, or storage available to the function.
5. More than all, architects must know each platform vendor's pricing model to build the system cost-effective.

In summary, function-based architecture is a critical concept in serverless computing. Functions are the building blocks of serverless applications, and the serverless platform automatically manages the underlying infrastructure, scaling and deploying functions as needed. As a result, this architecture enables developers to write code quickly and efficiently, focus on business value rather than infrastructure, and build scalable, cost-effective applications that can easily integrate with other services and tools.
