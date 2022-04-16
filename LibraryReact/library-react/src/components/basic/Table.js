import React, {useEffect} from "react";
import {useTable, usePagination} from "react-table";

function Table({columns, data, fetchDataHandler, deleteHandler, pageCount: controlledPageCount}) {
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        page, // page for the table based on the data passed
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)

        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setHiddenColumns,
        state: {pageIndex, pageSize},
    } = useTable({
            columns,
            data: data,
            initialState: {
                pageIndex: 0,
                pageSize: 1,
                hiddenColumns: columns
                    .filter((column) => !column.show)
                    .map((column) => column.id),
            },
            manualPagination: true,
            pageCount: controlledPageCount
        },
        usePagination);

    useEffect(() => {
        fetchDataHandler && fetchDataHandler({pageIndex, pageSize})
    }, [fetchDataHandler, pageIndex, pageSize])

    return (
        <>
                  <pre>
        <code>
          {JSON.stringify(
              {
                  pageIndex,
                  pageSize,
                  pageCount,
                  canNextPage,
                  canPreviousPage,
              },
              null,
              2
          )}
        </code>
      </pre>
            <table class="table table-hover" {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (<tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render("Header")}</th>))}
                </tr>))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row);
                    return (<tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                        })}
                        <td><button class="btn btn-primary" onClick={() => {
                            deleteHandler(row.values.id);
                        }}>Delete
                        </button></td>
                    </tr>);
                })}

                </tbody>
            </table>
            <nav aria-label="Search results pages">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
          Page{' '}
                    <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
                <span>
          | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
        </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[1, 2, 3, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </nav>
        </>);
}

export default Table;