import { useMemo, useState } from 'react'
import { IReferralResponse } from '../types/referrals'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import Link from 'next/link';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface IReferralTable {
  referrals: IReferralResponse[],
  isAdmin: boolean;
  setDeleteModalOpen: Function;
}

const ReferralTable = ({ referrals, isAdmin, setDeleteModalOpen }: IReferralTable) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const columns = useMemo<ColumnDef<IReferralResponse>[]>(
    () => [
      {
        accessorFn: row => row.fullname,
        id: 'Full Name',
        sortDescFirst: true, // This column will sort in descending order first (default for number columns anyway)
      },
      {
        accessorFn: row => row.company,
        id: 'Company',
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.job_title,
        id: 'Job Title',
      },
      {
        accessorFn: row => row.job_field,
        id: 'Job Field',
      },
      {
        accessorFn: row => row.mobile,
        id: 'Mobile',
      },
      {
        accessorFn: row => row.email,
        id: 'Email'
      },
      {
        accessorFn: row => `${row.street_address}, ${row.city}, ${row.province}`,
        id: 'Address'
      },
      {
        id: 'Actions',
        cell: (props) => <div className='flex flex-row gap-4'>
          <button><Link href={`/add-referral/${props.row.original.id}?admin=true`} passHref><FiEdit cursor='pointer' className='text-blue-500'/></Link></button>
          <button><FiTrash2 cursor='pointer' className='text-red-500' onClick={() => setDeleteModalOpen(props.row.original.id)}/></button>
        </div>
      }
    ],
    []
  )

  const table = useReactTable({
    data: referrals,
    columns,
    state: {
      sorting
    },
    initialState: {
      columnVisibility: {
        Actions: isAdmin
      },
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })
  return (
    <div className="overflow-x-auto mt-5">
      <table className='table'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none flex flex-row'
                            : 'flex flex-row'
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Sort ascending'
                              : header.column.getNextSortingOrder() === 'desc'
                                ? 'Sort descending'
                                : 'Clear sort'
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <span className='mt-0.5 ml-1'><FaArrowDown/></span>,
                          desc: <span className='mt-0.5 ml-1'><FaArrowUp/></span>,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
    
  )
}

export default ReferralTable