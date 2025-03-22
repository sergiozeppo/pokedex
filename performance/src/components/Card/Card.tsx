import { memo } from 'react';

interface CardProps {
  name: string;
  flag: string;
  population: number;
  region: string;
  visited: boolean;
  onToggleVisited: (name: string) => void;
}

const Card = memo(
  ({ name, flag, population, region, visited, onToggleVisited }: CardProps) => {
    const cardClasses =
      'relative bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 box-border border-4';
    const visitedClasses = 'border-green-500 shadow-green-500/50';
    const standartClasses = 'border-gray-500';
    return (
      <div
        className={
          cardClasses + `${visited ? visitedClasses : standartClasses}`
        }
        onClick={() => onToggleVisited(name)}
      >
        <img src={flag} alt={name} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">{name}</h3>
          <p className="text-gray-700">Population: {population}</p>
          <p className="text-gray-700">Region: {region}</p>
          <p className="absolute bottom-2 right-2 text-green-600 font-bold">
            {visited && '✅ Visited'}
          </p>
        </div>
      </div>
    );
  }
);

export default Card;
