import React, { useState } from 'react'
import { IReviewerResponse } from '../types/reviewers'
import Reviewer from './Reviewer'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

interface IReviewerListProps {
  reviewers: IReviewerResponse[];
  viewMode: boolean;
}

const ReviewerList = ({ reviewers, viewMode }: IReviewerListProps) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState({})

  const columns = React.useMemo<ColumnDef<IReviewerResponse>[]>(
    () => [
      {
        accessorFn: row => row.fullname,
        id: 'Full Name',
        cell: info => info.getValue(),
        footer: props => props.column.id,
        sortDescFirst: true, // This column will sort in descending order first (default for number columns anyway)
      },
      {
        accessorFn: row => row.company,
        id: 'Company',
        cell: info => info.getValue(),
        header: () => <span>Company</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.job_title,
        id: 'Title',
        header: () => 'Job Title',
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.job_field,
        id: 'Field',
        header: () => <span>Field</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.mobile,
        id: 'Mobile',
        header: 'Mobile',
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.email,
        id: 'Email',
        header: 'Email',
        footer: props => props.column.id,
      },
      {
        accessorFn: row => `${row.street_address}, ${row.city}, ${row.province}`,
        id: 'Address',
        header: 'Address',
        width: 5000
      },
    ],
    []
  )

  const table = useReactTable({
    data: reviewers,
    columns,
    state: {
      sorting,
      columnVisibility
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })
  return (
    <div className="overflow-x-auto mt-4">
      {/* <div className="inline-block border border-black shadow rounded">
        <select
          className="select select-bordered">
          <option disabled value=''>Toggle Columns</option>
          <option value=''>
            <label>
              <input
                {...{
                  type: 'checkbox',
                  className: 'checkbox',
                  checked: table.getIsAllColumnsVisible(),
                  onChange: table.getToggleAllColumnsVisibilityHandler(),
                }}
              />{' '}
              Toggle All
            </label>
          </option>
          {table.getAllLeafColumns().map(column => {
            return (
              <option value=''>
                <label>
                  <input
                    {...{
                      type: 'checkbox',
                      className: 'checkbox',
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                    }}
                  />{' '}
                  {column.id}
                </label>
              </option>
            )
          })}
        </select>
        <div className="px-1 border-b border-black">
          <label>
            <input
              {...{
                type: 'checkbox',
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{' '}
            Toggle All
          </label>
        </div>
        {table.getAllLeafColumns().map(column => {
          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                  {...{
                    type: 'checkbox',
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{' '}
                {column.id}
              </label>
            </div>
          )
        })}
      </div> */}
      {viewMode && <div className="overflow-x-auto mt-5">
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
                            asc: <span className='mt-0.5 ml-1'><FaArrowDown /></span>,
                            desc: <span className='mt-0.5 ml-1'><FaArrowUp /></span>,
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
      </div>}
      {!viewMode && (reviewers.length > 0 ? reviewers.map(reviewer => (
        <div className='mt-5' key={reviewer.id}>
          <Reviewer reviewer={reviewer} />
        </div>
      )) : 
      <div>No results found</div>)}
    </div>
  )
}

export default ReviewerList