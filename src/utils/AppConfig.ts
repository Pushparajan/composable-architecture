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
  url: 'https://composable.pushparajan.com',
  locale: 'en',
  author: 'Pushparajan Ramar',
  pagination_size: 6,
  post_fields: ['title', 'description', 'date', 'image', 'tags', 'slug'],
  sections: [
    {
      name: 'Composable Architecture',
      slug: 'composablearchitecture',
      title: 'Composable Microservices-Based Architectures Distilled',
      description:
        'Find out how microservice-based architectures provide the foundation for composable commerce solutions',
      contentDir: '_content/composablearchitecture',
    },
    {
      name: 'TOGAF',
      slug: 'togaf',
      title: 'TOGAF Enterprise Architecture Framework',
      description:
        'Learn about The Open Group Architecture Framework for enterprise architecture',
      contentDir: '_content/togaf',
    },
    {
      name: 'AI',
      slug: 'ai',
      title: 'Artificial Intelligence & Machine Learning',
      description:
        'Explore AI and ML architectures, patterns, and implementations',
      contentDir: '_content/ai',
    },
    {
      name: 'AWS',
      slug: 'aws',
      title: 'Amazon Web Services Architecture',
      description:
        'AWS cloud architecture patterns, best practices, and solutions',
      contentDir: '_content/aws',
    },
  ] as SectionConfig[],
  getSectionBySlug(slug: string): SectionConfig | undefined {
    return this.sections.find((s) => s.slug === slug);
  },
};
