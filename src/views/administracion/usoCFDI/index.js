import React, {useCallback, useEffect, useMemo, useState} from "react";

import MaterialReactTable from 'material-react-table';

// components
import MainCard from "../../../ui-component/cards/MainCard";

// config
import config from "../../../config";
import {Typography} from "@mui/material";

export default function UsoCFDI() {
    const [listaUsoCFDI, setlistaUsoCFDI] = useState(() => []);
    const baseResource = config.baseResource;

    // Columnas
    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "ID",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: true,
                size: 30,
            },
            {
                accessorKey: "claveCFDI",
                header: "Clave CFDI",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "descripcion",
                header: "Descripción",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: true,
                size: 400,
            },
            {
                accessorKey: "isEnabledForFisica",
                header: "P. Física",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: true,
                Cell: ({ cell }) => (
                    <Typography>{cell.getValue()?'Si':'No'}</Typography>
                ),
            },
            {
                accessorKey: "isEnabledForMoral",
                header: "P. Moral",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: true,
                Cell: ({ cell }) => (
                    <Typography>{cell.getValue()? 'Si': 'No'}</Typography>
                ),
            }
        ], []);

    useEffect(() => {
        fetch(baseResource + '/admin/usoCFDI/all')
            .then(response => response.json())
            .then(data => {
                setlistaUsoCFDI([...data]);
                console.log(listaUsoCFDI);
            })
    }, []);

    return (
        <>
            <MainCard title="Tipos de Contrato">
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
                    data={listaUsoCFDI}
                    enableColumnOrdering
                />
            </MainCard>
        </>
    );
}
