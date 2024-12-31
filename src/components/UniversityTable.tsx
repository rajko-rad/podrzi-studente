import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState
} from '@tanstack/react-table';
import { Instagram, ExternalLink, Mail } from 'lucide-react';

interface University {
  grad: string;
  ime_institucije: string;
  link_za_uputstva: string;
  email: string;
  instagram: string;
}

const columnHelper = createColumnHelper<University>();

const columns = [
  columnHelper.accessor('grad', {
    header: 'Grad',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('ime_institucije', {
    header: 'Ustanova',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('link_za_uputstva', {
    header: 'Uputstva',
    cell: info => info.getValue() ? (
      <a 
        href={info.getValue()}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 inline-flex items-center"
      >
        <ExternalLink className="w-4 h-4" />
      </a>
    ) : null,
  }),
  columnHelper.accessor('email', {
    header: 'Kontakt',
    cell: info => info.getValue() ? (
      <a 
        href={`mailto:${info.getValue()}`}
        className="text-blue-600 hover:text-blue-800 inline-flex items-center"
      >
        <Mail className="w-4 h-4" />
      </a>
    ) : null,
  }),
  columnHelper.accessor('instagram', {
    header: 'Instagram',
    cell: info => info.getValue() ? (
      <a 
        href={info.getValue()}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 hover:text-purple-800 inline-flex items-center"
      >
        <Instagram className="w-4 h-4" />
      </a>
    ) : null,
  }),
];

export const UniversityTable = ({ data }: { data: University[] }) => {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'ime_institucije', desc: false }
  ]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td 
                  key={cell.id} 
                  className={`px-2 sm:px-6 py-2 sm:py-4 whitespace-normal ${
                    cell.column.id === 'ime_institucije' ? 'max-w-[150px] sm:max-w-none' : ''
                  }`}
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 