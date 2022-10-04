---
title: 'Composing and Rendering Micro Frontend Architectures'
description: Discuss how to compose and render micro frontend applications.
date: '2022-10-04'
modified_date: '2022-10-04'
image: /assets/images/posts/composing.png
tags:
  - Composable Commerce
  - Micro Frontend
---

Unless using Frontend as Service (FEaaS) provider, IT teams should review their deployment strategies for Micro frontends. Micro frontends are built on the server, client, or a combination. In this article, let us explore the various build and deployment options.

## Server-Side Rendering (SSR)

Server-Side rendering generates content that is delivered fast, SEO-friendly, and features accessible content. It can provide content to low-end or low-power smartphones and PCs. SSR is implemented in the following ways,
 
### a) Server-Side Includes

Server-site includes is a scripting language executed by the webserver. All web servers support this language, including IIS, Apache, and Nginx. The web server builds the micro frontends and generates the complete HTML content for the page on the server.

### b) Edge-Side Includes

Edge-Side includes (ESI) is the advanced version of SSI. ESIs handle conditionals and variables better. They also offer excellent error handling. In this approach, Edge Networks like Akamai and Varnish build the micro frontends and create the complete HTML content on the Edge server.

In either of these approaches, the static HTML is created after the script gets compiled. The Time to First Byte (TTFB), the time between clicking a link and the first bit of content coming in, is less. Rendering the page is fast. First Contentful Paint (FCP), when requested content becomes visible, and the Time To Interactive (TTI),  the time at which a page becomes interactive, are the same. 

## Client-Side Rendering

This rendering method manipulates the DOM and gathers data from the microservices to build pages in a user’s web browser. Different forms of CSR are used to improve user experience. JavaScript is used to mount or unmount the micro frontends from a page. Micro frontends work with many frontend frameworks, some specifically made for them. These are some micro frontend specific frameworks include, 

- Piral
- Ragu
- Single SPA
- Frint
- WebPack Module Federation

In CSRs, logic, booting, and rendering are done on the client side. CSRs are flexible to implement, but Architects need to be watchful about the page load performance. Time To Interactive (TTI), the time at which a page becomes interactive, is much more than First Contentful Paint(FCP), the time when requested content becomes visible. 

## Combining SSR and CSR with (Re)hydration

A variation of Server-Side rendering is that the components are composed on the server side, and the JavaScript and data used for rendering the page are embedded into the resulting HTML document, and then the JavaScript functions are executed. When the JavaScript functions are not fully downloaded on slower networks triggered, some micro frontends may freeze and cause unexpected behavior.

## Preload Render Pre-cache Lazy load (PRPL) Pattern

PRPL is a pattern that google recommends and uses in its tools. In this pattern, most of the resources are preloaded, the initial route is rendered as soon as possible, the remaining assets are pre-cached, and the other routes and non-critical assets are Lazy loaded. PRPL pattern uses a container app that loads the critical routes and resources. Once the main container app is loaded, a micro frontend worker can get installed, and that worker will then fetch the resources for the other routes. Gatsby is built on these principles. It is a static site generator and will send only the data and Javascript required for the route with HTTPS/2 streaming and is a good option for composing and rendering micro frontends. NextJS with Webpack 5 Module Federation plugin is another good candidate for developing and building micro frontends.

## Wrapping Up

Building the right microfrontends architecture like microservices can be challenging and needs a flexible, proven design.
When deciding on an approach to build microfrontends reference and rendering, it is essential to consider the challenges. Choose between server-side, client-side, or a combination to achieve your objectives. 
