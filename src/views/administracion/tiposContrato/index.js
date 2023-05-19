import React, {useCallback, useEffect, useMemo, useState} from "react";

import MaterialReactTable from 'material-react-table';

// components
import MainCard from "../../../ui-component/cards/MainCard";

// config
import config from "../../../config";

export default function TiposContrato() {

    const [tiposContrato, setTiposContrato] = useState(() => []);
    const [isLoading, setIsLoading] = useState(false);

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
            },
            {
                accessorKey: "tipoContrato",
                header: "Tipo de Contrato",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "textoContrato",
                header: "Texto de Contrato",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: true,
            },
        ], []);

    useEffect(() => {
        setIsLoading(true);
        fetch(baseResource + '/admin/tipoContrato/all')
            .then(response => response.json())
            .then(data => {
                setTiposContrato([...data]);
                setIsLoading(false);
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
                    data={tiposContrato}
                    enableColumnOrdering
                />
            </MainCard>
        </>
    );
}
