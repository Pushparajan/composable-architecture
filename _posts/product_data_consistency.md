---
title: 'Product Data Consistency in Composable Commerce Architecture'
description: Discuss on how to mordern product information systems support realtime data consistency 
date: '2022-12-10'
modified_date: '2022-12-10'
image: /assets/images/posts/product_data_consistency.png
tags:
  - Composable Architecture
  - Composable Data Architecture
  - Product Information Management
---

Commerce is exchanging a product or a service between two parties. Both parties need a clear description of the exchanged product or service. In today's world, a product evolves through multiple steps. Often it is a collaboration between numerous manufacturers and service providers who help build and enrich the product. The partially completed or entirely manufactured product is shipped and transported almost all over the globe before it reaches the receiver gets it.   With an overwhelm of products in the market, there is a need for Sales and Marketing teams who could call out the product's salient features and find the right moment when the transaction could happen. Since the receiver and the buyer have yet to establish trust, they expect a warranty and support to fix the received product post-trade. Everyone involved in this process performs a business activity.

## So what is a product, and how can we describe it? 

How do we know the silicon wafer manufactured in China evolved into the IC Chip in Taiwan, ended up as a mobile phone in Vietnam or Malaysia, tested in India, and then sold in the USA? This product data stored in different locations may cause data silos. Inconsistent data can create considerable time to reconcile and lead to revenue losses through the manufacturing supply chain. Receivers or buyers of the products and making buying decisions across multiple channels, the sellers and marketers need to make sure that they are consistently messaging across these channels. Commerce is no more trade; the seller must know the product sold and provide appropriate service. The message needs to be localized and translated for different markets. The product is also classified and bundled differently based on the market. Understanding the product and its attributes in one view and acting as a single source of truth requires Product Information Management (PIM) software.

## What is not PIM?

One should be clear that PIM is the system that provides the Single View or the product and does not remove the Enterprise Resource Planning (ERP) Software. The ERP organizes all company data centrally and is connected to all other services and processes, including the PIM system. PIM is not an Inventory Management tool responsible for the warehouse materials, supplies, and catalog of products. Instead, the PIM receives data related to updated information about the stock of products and the status of orders and stores. Finally, PIM is not a customer relationship management tool. The consumer never interacts with the PIM system directly. Yet the PIM system will help customers have a pleasant purchase journey by providing accurate product information under the suitable classification to influence the decision to purchase.

## What does a PIM do?

1. PIM tools help provide a holistic view of the product
2. They help consolidate primary product data, including name, categories, description, and technical characteristics.  
3. They help consolidate attributive data: cost, price, SKU, or reference numbers...
4. They help consolidate technical data: warranty, packaging, dimensions
5. They help publish the product data across all online and offline marketing channels. 
6. They help automate the publishing user documents, paper catalogs, and pdf technical datasheets. 
7. They help integrate product data from product content services such as GS1, Icecat, CNET, and SKUvantage.

## Future is here

Traditionally eCommerce systems like Hybris have bundled the product information capabilities partly. Different custom applications are required to manage the complete product life cycle. Traditional applications like inRiver or Informatica are still consistent. Yet synchronizing the data across systems with the batch processes is painful. 

Event-Driven Microservices are the need for the day. Instead of waiting on batch processes that run multiple hours and days, the eventually synchronous data support more real-time information to consumers at the right moment. Open-source tools like Akeneo and SAAS products like Salsify provide this ability.
