export type SectionConfig = {
  name: string;
  slug: string;
  title: string;
  description: string;
  contentDir: string;
};

export const AppConfig = {
  site_name: 'Architecture Knowledge Hub',
  title: 'Architecture Knowledge Hub',
  description:
    'Explore composable architectures, TOGAF, AI, and AWS best practices',
  url: 'https://pushparajan.tech',
  locale: 'en',
  author: 'Pushparajan Ramar',
  twitterHandle: '@pushparajan',
  keywords: [
    'Applied AI',
    'Artificial Intelligence',
    'Machine Learning',
    'Loyalty',
    'Marketing Technology',
    'Digital Transformation',
    'Composable Architecture',
    'Microservices',
    'Enterprise Architecture',
    'TOGAF',
    'AWS',
    'Cloud Architecture',
  ],
  pagination_size: 6,
  post_fields: ['title', 'description', 'date', 'image', 'tags', 'slug'],
  sections: [
    {
      name: 'Composable Architecture',
      slug: 'composablearchitecture',
      title: 'Composable Microservices-Based Architectures Distilled',
      description:
        'Find out how microservice-based architectures provide the foundation for composable commerce solutions and digital transformation',
      contentDir: '_content/composablearchitecture',
    },
    {
      name: 'TOGAF',
      slug: 'togaf',
      title: 'TOGAF Enterprise Architecture Framework',
      description:
        'Learn about The Open Group Architecture Framework for enterprise architecture and digital transformation',
      contentDir: '_content/togaf',
    },
    {
      name: 'AI',
      slug: 'ai',
      title: 'Applied AI, Artificial Intelligence & Machine Learning',
      description:
        'Explore Applied AI, Machine Learning architectures, loyalty platforms, marketing technology, and AI implementations',
      contentDir: '_content/ai',
    },
    {
      name: 'AWS',
      slug: 'aws',
      title: 'Amazon Web Services Cloud Architecture',
      description:
        'AWS cloud architecture patterns, best practices, and solutions for digital transformation',
      contentDir: '_content/aws',
    },
    {
      name: 'Adobe',
      slug: 'adobe',
      title: 'Adobe Experience Cloud & Marketing Technology',
      description:
        'Adobe Experience Platform, AEM, Analytics, Target, and Marketing technologies for digital transformation',
      contentDir: '_content/adobe',
    },
  ] as SectionConfig[],
  getSectionBySlug(slug: string): SectionConfig | undefined {
    return this.sections.find((s) => s.slug === slug);
  },
};
