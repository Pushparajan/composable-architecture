---
title: 'From Strangler to Lift and Shift, various patterns that help businesses migrate to a composable architecture from monolith systems.'
description:  Discuss about various patterns that help businesses migrate to a composable architecture from monolith systems.
date: '2023-03-18'
modified_date: '2022-03-18'
image: /assets/images/posts/various_patterns_help_businesses_migrate.jpg
tags:
  - Composable Architecture
  - Migration Patterns
---

When migrating a monolith to a composable architecture, architects must evaluate the existing system and identify the hot spots or the essential components candidates for modernization. Then, appropriate tools and technologies are identified for each component or packaged business capability. Also, a roadmap for implementing the new architecture using a modular and componentized approach is designed. Finally, a migration approach is utilized, such as the Strangler pattern, Parallel Run, Blue-Green Deployment, Big Bang, Event-Driven, or Lift and Shift.

## A. Strangler pattern

The Strangler pattern involves gradually replacing the components of the existing system with new ones. The new PBCs are developed separately and integrated into the current system over time until the entire system is replaced.

### Steps

1. Identify the components of the existing system that need to be replaced.
2. Develop new PBCs separately.
3. Integrate new PBC into the current system over time.
4. Gradually remove the old components until the entire system is modernized.

### Advantages

- Gradual migration reduces risks and ensures the continuity of operations.
- The new PBCs are deployed incrementally.
- The legacy system can continue to operate until the new system is fully operational.

### Disadvantages

- The approach can be complex, requiring careful planning and design.
- Integration between old and new systems can be challenging.
- This method may require significant effort to maintain both systems during the migration.

The Strangler pattern is a good option when the existing system is too complex to replace all at once and requires incremental changes. It's also an appropriate approach when the business needs to keep the current system operational while the new system is being developed and tested.

## B. Parallel Run

The Parallel Run pattern involves running the old and new systems in parallel until the new system is fully operational. Then, both applications are maintained and updated until the new system is fully functional.

### Steps

1. Develop the new system separately.
2. Run the old and new applications in parallel.
3. Validate and test the new system.
4. Gradually switch over to the new system.

### Advantages

- Reduces the risk of losing data or transactions during migration.
- Comprehensive testing and validation of the new system are possible
- Provides a fall-back option if issues arise.

### Disadvantages

- Requires significant resources to maintain and support two systems.
- It can be time-consuming, leading to longer migration times.
- Integrating the old and new systems can be challenging.

Parallel Run is a good option when the business must ensure that the new system works well before fully transitioning from the old one. It's also a suitable approach when the organization needs to minimize the risk of data loss or transaction issues.

## C. Blue-Green Deployment

The Blue-Green Deployment pattern involves creating two identical environments: active (blue) and inactive (green). The new system is deployed in the inactive environment (green), and once the testing is complete, traffic is switched over from the old system (blue) to the new system (green).

### Steps

1. Create two identical environments (blue and green).
2. Deploy the new system in the inactive environment (green).
3. Test and validate the new system.
4. Switch over traffic to the new system.

### Advantages

- It needs zero-downtime deployment and testing.
- Allows for easy rollback to the old system if issues arise.
- It reduces the risk of data loss or transaction issues during migration.

### Disadvantages

- Requires significant resources to maintain and support two systems.
- It may require additional network configurations and infrastructure.
- The complexity of the approach may make it challenging to implement.

Blue-Green deployment is a good option when the business requires zero-downtime deployment and testing. It's also an appropriate approach when the organization must ensure the new system is fully functional before switching from the old one.

## D. Big Bang

The Big Bang approach involves replacing the old system with the new one. This approach requires careful planning and execution to operationalize the new application fully.

### Steps

1. Replace the entire existing system with the new system all at once.
2. Ensure that the new system is fully functional before deploying.

### Advantages

- Simplifies the migration process by replacing the old system with the new one.
- Requires fewer resources to maintain and support the new system.
- It provides a clean break from the legacy system.

### Disadvantages

- Higher risk of data loss or transaction issues.
- This approach may result in extended downtime if problems arise.
- It requires careful planning and execution to operationalize the new system fully.

The Big Bang approach is a good option when the existing system is outdated and needs to be replaced quickly. It's also an appropriate approach when the business has a limited budget or resources and needs help to afford a more gradual migration.

## E. Event-Driven

The Event-Driven architecture replaces legacy systems with microservices, where each microservice handles specific business functions. This approach provides businesses with a modular, flexible system that enables faster development and deployment cycles.

### Steps

1. Identify the business functions that need to be handled by each microservice.
2. Develop microservices separately.
3. Integrate microservices into the system.
4. Update and add new functionalities to the system as required.

### Advantages

- It provides a modular and flexible system.
- It allows for easy addition or modification of functionalities.
- This migration approach Enables faster development and deployment cycles.

### Disadvantages

- It requires significant planning and design effort.
- It can be complex to implement and maintain.
- It may require additional infrastructure and resources.

Event-Driven architecture is a good option when the business requires a more modular and flexible system. It's also an appropriate approach when the organization needs to develop and deploy functionalities faster.

## F. Lift and Shift

The Lift and Shift approach involves migrating the existing system to a cloud-based infrastructure and simplifying, updating, and maintaining the platform. This approach is relatively simple but may need to address the underlying issues with the legacy system.

### Steps

1. Migrate the existing system to a cloud-based infrastructure.
2. Update and maintain the system in the cloud.
3. Address underlying issues with the legacy system as needed.

### Advantages

- This migration approach enables the use of modern cloud-based infrastructure and technologies.
- It can be easier to implement and manage than other approaches.
- It provides a clean break from legacy hardware and infrastructure.

### Disadvantages

- This migration approach needs to address underlying issues with the legacy system.
- It may require significant changes to the system architecture.
- They may need to take full advantage of the benefits of modern architecture.

Lift and Shift is a good option when the business needs to modernize the existing system but needs to afford a complete overhaul. It's also an appropriate approach when the organization needs to reduce costs by moving to a cloud-based infrastructure.

In summary, each approach has advantages and disadvantages, and the approach selection depends on several factors. Therefore, Architects should help businesses carefully evaluate the needs, the project's scope and goals, and the available resources before selecting an approach for modernizing their legacy systems.
