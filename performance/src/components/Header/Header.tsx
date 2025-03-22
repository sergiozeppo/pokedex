import { memo } from 'react';

interface HeaderProps {
  searchTerm: string;
  selectedRegion: string;
  sortOrder: { key: string; asc: boolean };
  onSearch: (value: string) => void;
  onFilter: (value: string) => void;
  onSort: (key: string, asc: boolean) => void;
}

const Header = memo(
  ({
    searchTerm,
    selectedRegion,
    sortOrder,
    onSearch,
    onFilter,
    onSort,
  }: HeaderProps) => {
    const regions = [
      'Africa',
      'Americas',
      'Asia',
      'Europe',
      'Oceania',
      'Antarctic',
    ];

    return (
      <header className="flex flex-col md:flex-row justify-between items-center bg-gray-900 text-white p-4 shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold">VSESTRANY.RU</h1>

        <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-8 pr-4 py-2 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>

          <select
            value={selectedRegion}
            onChange={(e) => onFilter(e.target.value)}
            className="px-4 py-2 rounded-lg cursor-pointer bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <div
              onClick={() =>
                onSort('name', sortOrder.key === 'name' ? !sortOrder.asc : true)
              }
              className="px-3 py-2 cursor-pointer bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Sort by Name{' '}
              {sortOrder.key === 'name' ? (sortOrder.asc ? '⬆️' : '⬇️') : ''}
            </div>
            <div
              onClick={() =>
                onSort(
                  'population',
                  sortOrder.key === 'population' ? !sortOrder.asc : true
                )
              }
              className="px-3 py-2 cursor-pointer bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Sort by Population{' '}
              {sortOrder.key === 'population'
                ? sortOrder.asc
                  ? '⬆️'
                  : '⬇️'
                : ''}
            </div>
          </div>
        </div>
      </header>
    );
  }
);

export default Header;
