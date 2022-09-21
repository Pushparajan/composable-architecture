import React from 'react';

type IHeroProps = {
  title: string;
  description: string;
};

const Hero = (props: IHeroProps) => (
  <div className="w-full bg-blue-400">
    <header className="max-w-screen-xl text-center py-16 px-3 mx-auto">
      <h1 className="text-4xl text-gray-100 font-semibold">{props.title}</h1>
      <div className="text-2xl text-gray-100 mt-1">{props.description}</div>
    </header>
  </div>
);

export { Hero };
