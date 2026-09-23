import React from 'react';

type PdfEmbedProps = {
  src: string;
  title: string;
};

const PdfEmbed = ({ src, title }: PdfEmbedProps) => (
  <div className="w-full mb-8">
    <iframe
      src={src}
      title={`${title} PDF carousel`}
      className="w-full h-[80vh] rounded-lg shadow-md border border-gray-200"
    />
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-2 text-blue-600 hover:underline"
    >
      Download the PDF carousel
    </a>
  </div>
);

export { PdfEmbed };
