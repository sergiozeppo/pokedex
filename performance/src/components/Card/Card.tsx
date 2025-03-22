import { memo } from 'react';

interface CardProps {
  name: string;
  flag: string;
  population: number;
  region: string;
}

const Card = memo(({ name, flag, population, region }: CardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <img src={flag} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{name}</h3>
        <p className="text-gray-700">Population: {population}</p>
        <p className="text-gray-700">Region: {region}</p>
      </div>
    </div>
  );
});

export default Card;
