import React, {useEffect} from "react";
import {useTable, usePagination} from "react-table";
import {Link} from "react-router-dom";

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
                pageSize: 3,
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
                        <td>
                            <button class="btn btn-primary" onClick={() => {
                                deleteHandler(row.values.id);
                            }}>Delete
                            </button>
                        </td>
                    </tr>);
                })}

                </tbody>
            </table>
            <nav aria-label="Search results pages">
                <ul className="pagination justify-content-center">
                    <li className="page-item"><button className="btn btn-outline-primary" onClick={() => gotoPage(0)}
                                                 disabled={!canPreviousPage} aria-label="First">
                        <span aria-hidden="true">&laquo;</span>
                    </button></li>
                    <li className="page-item"><button className="btn btn-outline-primary" onClick={() => previousPage()}
                                                 disabled={!canPreviousPage}>Previous</button></li>
                    <li className="page-item"><button className="btn btn-outline-primary" onClick={() => nextPage()}
                                                 disabled={!canNextPage}>Next</button></li>
                    <li className="page-item"><button className="btn btn-outline-primary" onClick={() => gotoPage(pageCount - 1)}
                                                 disabled={!canNextPage} aria-label="Last">
                        <span aria-hidden="true">&raquo;</span>
                    </button></li>
                </ul>
                <div class="container">
                    <div class="row justify-content-md-center">
                        <div class="col-2">
                            <p>Page{' '}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}</p>
                        </div>
                        <div class="col-2">
                            <input className="form-control" type="number" defaultValue={pageIndex + 1}
                                   onChange={e => {
                                       const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                       gotoPage(page)
                                   }}/>
                        </div>
                        <div class="col-3">
                            <select className="form-select" value={pageSize} onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}>
                                {[3, 10, 20, 30, 40, 50].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

            </nav>
        </>);
}

export default Table;