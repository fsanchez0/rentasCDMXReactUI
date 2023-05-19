import React, {useEffect, useMemo, useState} from "react";

import MaterialReactTable from "material-react-table";

import MainCard from "../../../ui-component/cards/MainCard";

import config from "../../../config";

export default function RegimenFiscal() {
    const [listaRegimenFiscal, setListaRegimenFiscal] = useState(() => []);

    const baseResource = config.baseResource;

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "ID",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: true,
                size: 20
            },
            {
                accessorKey: "claveRegimenFiscal",
                header: "Clave del Régimen Fiscal",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "nombreRegimenFiscal",
                header: "Régimen Fiscal",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: true,
                size: 300
            },
        ], []);

    useEffect(() => {
        fetch(baseResource + '/admin/regimenFiscal/all')
            .then(response => response.json())
            .then(data => {
                setListaRegimenFiscal([...data]);
            })
    }, []);

    return (
        <>
            <MainCard title="Lista de Régimen Fiscal">
                <MaterialReactTable
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            muiTableHeadCellProps: {
                                align: 'center',
                            },
                            size: 120,
                        },
                    }}
                    columns={columns}
                    data={listaRegimenFiscal}
                    enableColumnOrdering
                />
            </MainCard>
        </>
    );
}