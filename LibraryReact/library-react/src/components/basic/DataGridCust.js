import DataGrid from 'react-data-grid';

function DataGridCust({columns, rows}){

    return(
        <div>
            <DataGrid columns={columns} rows={rows}/>
        </div>
    )
}

export default DataGridCust;