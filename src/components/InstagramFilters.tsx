import { FC } from 'react';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';

interface FilterOption {
  value: string;
  label: string;
  count: number;
}

type FilterType = 'vrstaNaloga' | 'vrstaUstanove' | 'grad' | 'imeInstitucije';

interface FiltersProps {
  options: {
    vrstaNaloga: FilterOption[];
    vrstaUstanove: FilterOption[];
    grad: FilterOption[];
    imeInstitucije: FilterOption[];
  };
  selectedFilters: {
    vrstaNaloga: string[];
    vrstaUstanove: string[];
    grad: string[];
    imeInstitucije: string[];
  };
  onFilterChange: (filterType: FilterType, value: string[]) => void;
}

const InstagramFilters: FC<FiltersProps> = ({ options, selectedFilters, onFilterChange }) => {
  const [searchTerms, setSearchTerms] = useState<Record<FilterType, string>>({
    vrstaNaloga: '',
    vrstaUstanove: '',
    grad: '',
    imeInstitucije: ''
  });

  const renderFilter = (
    filterType: FilterType,
    label: string,
    options: FilterOption[]
  ) => {
    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(searchTerms[filterType].toLowerCase())
    );

    return (
      <div className="w-full sm:w-48">
        <span className="block text-xs text-gray-500 mb-1 font-medium">{label}</span>
        <Select.Root
          value={selectedFilters[filterType][0] || 'all'}
          onValueChange={(value) => onFilterChange(filterType, value === 'all' ? [] : [value])}
        >
          <Select.Trigger 
            className="inline-flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <Select.Value placeholder="All" />
            <Select.Icon>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content 
              className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200 min-w-[200px] max-h-[300px]"
              position="popper"
              sideOffset={5}
            >
              <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                <ChevronDown className="w-4 h-4 rotate-180" />
              </Select.ScrollUpButton>
              
              {(filterType === 'grad' || filterType === 'imeInstitucije') && (
                <div className="flex items-center px-3 py-2 border-b border-gray-100">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    className="w-full text-sm bg-transparent outline-none"
                    placeholder="Search..."
                    value={searchTerms[filterType]}
                    onChange={(e) => setSearchTerms(prev => ({
                      ...prev,
                      [filterType]: e.target.value
                    }))}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              <Select.Viewport className="p-1 overflow-auto max-h-[200px]">
                <Select.Item
                  value="all"
                  className="relative flex items-center px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-sm"
                >
                  <Select.ItemText>All</Select.ItemText>
                </Select.Item>

                {filteredOptions.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="relative flex items-center justify-between px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-sm"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <span className="text-xs text-gray-400 ml-2">({option.count})</span>
                    <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                      <Check className="w-4 h-4" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}

                {filteredOptions.length === 0 && (
                  <div className="px-8 py-2 text-sm text-gray-500">
                    No results found
                  </div>
                )}
              </Select.Viewport>

              <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                <ChevronDown className="w-4 h-4" />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center gap-2 sm:gap-4 p-4 mb-8">
      {renderFilter('vrstaNaloga', 'Vrsta Naloga', options.vrstaNaloga)}
      {renderFilter('vrstaUstanove', 'Vrsta Ustanove', options.vrstaUstanove)}
      {renderFilter('grad', 'Grad', options.grad)}
      {renderFilter('imeInstitucije', 'Ime Institucije', options.imeInstitucije)}
    </div>
  );
};

export default InstagramFilters;