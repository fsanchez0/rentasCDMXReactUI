import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Box, Button, IconButton, Tooltip} from "@mui/material";
import MaterialReactTable from 'material-react-table';
import {Add, Block, CheckCircle, Delete, Edit} from '@mui/icons-material';

// components
import MainCard from "../../ui-component/cards/MainCard";

// config
import config from "../../config";
import {CreateNewDuenioModal} from "./create";
import {DeleteDuenioModal} from "./delete";
import {EditDuenioModal} from "./edit";

export default function Duenios() {

    const [duenios, setDuenios] = useState(() => []);
    const [isLoading, setIsLoading] = useState(false);

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    let initialValues = {
        "id": "",
        "nombre": "",
        "nombre2": "",
        "apaterno": "",
        "amaterno": "",
        "telefonos": "",
        "usuario": "",
        "password": "",
        "email": "",
        "rfcd": "",
        "banco": "",
        "titularBanco": "",
        "cuenta": "",
        "clabe": "",
        "calleDomicilioFiscal": "",
        "numeroExteriorDomicilioFiscal": "",
        "numeroInteriorDomicilioFiscal": "",
        "coloniaDomicilioFiscal": "",
        "delegacionDomicilioFiscal": "",
        "estadoDomicilioFiscal": "",
        "paisDomicilioFiscal": "México",
        "codigoPostalDomicilioFiscal": "",
        "calleDomicilioParticular": "",
        "numeroExteriorDomicilioParticular": "",
        "numeroInteriorDomicilioParticular": "",
        "coloniaDomicilioParticular": "",
        "delegacionDomicilioParticular": "",
        "estadoDomicilioParticular": "",
        "paisDomicilioParticular": "México",
        "codigoPostalDomicilioParticular": "",
        "porcentaje": 50.0,
        "honorarios": 10.0,
        "iva": 16.0,
        "curp": "",
        "idUsuario": "",
        "diasAPagar": "Dentro de los 10 primeros días siguientes al mes que corresponda",
        "idNacionalidad": 110,
        "isActivo": true,
        "regimenFiscal": 12,
        "usoCFDIid": 3,
        "apoderados": [],
        "cuentasBancarias": [],
        "contactos": [],
    };

    const [duenioToEdit, setDuenioToEdit] = useState(initialValues);
    const [rowIndex, setRowIndex] = useState(0);
    const [currentRow, setCurrentRow] = useState(null);

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
                accessorFn: (row) => `${row.nombre} ${row.nombre2} ${row.apaterno} ${row.amaterno}`,
                header: "Nombre",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
                size: 300,
            },
            {
                accessorKey: "rfcd",
                header: "RFC",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "codigoPostalDomicilioParticular",
                header: "C.P.",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "usuario",
                header: "Usuario",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            }
        ], []);

    const handleCreateNewRow = (values) => {
        setIsLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };
        fetch(baseResource + '/duenios/create', requestOptions)
            .then(response => response.json())
            .then(data => {
                duenios.push(data);
                setIsLoading(false);
                setDuenios([...duenios]);
                setCreateModalOpen(false);
            });
    };

    const handleEditRowDialog = (row) =>
    {
        // get the data from backend
        fetch(baseResource + '/duenios/get/' + row.getValue('id'))
            .then(response => response.json())
            .then(data => {
                initialValues = data; //todo: maybe we don't need two variables here
                setDuenioToEdit(initialValues);
                setRowIndex(row.index); // to get the position of the array to replace later
            }).finally(() => {
            // open dialog
            setEditModalOpen(true);
        });
    }

    const handleSaveChanges = (data) =>
    {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        console.log(JSON.stringify(data));
        fetch(baseResource + '/duenios/edit', requestOptions)
            .then(response => response.json())
            .then(data => {
                duenios[rowIndex] = data;
                setIsLoading(false);
                setDuenios([...duenios]);
            }).finally(() => {
            setEditModalOpen(false);
        });
    }

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            setIsLoading(true);
            console.log(values);
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            };
            fetch(baseResource + '/duenios/edit', requestOptions)
                .then(response => response.json())
                .then(data => {
                    duenios[row.index] = data;
                    setIsLoading(false);
                    setDuenios([...duenios]);
                });
            exitEditingMode();
        }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRowDialog = (row) =>
    {
        setCurrentRow(row);
        setRowIndex(row.index);
        setDeleteModalOpen(true);
    }

    const handleDeleteRow = (id) =>
    {
        setIsLoading(true);
        const requestOptions = {
            method: 'DELETE',
        };
        fetch(baseResource + '/duenios/delete/' + id, requestOptions)
            .then(function (response){
                if(response.ok){
                    duenios.splice(rowIndex, 1);
                    setDuenios([...duenios]);
                }
            }).finally(() => {
            setDeleteModalOpen(false);
        } );
    }

    const handleChangeStatusRow = useCallback(
        (row, status) => {
            if (
                !window.confirm(`Seguro que deseas ${status?'ACTIVAR':'DESACTIVAR'} al Dueño ${row.original.nombre} ?`)
            ) {
                return;
            }else {
                const duenioToSave = duenios[row.index];
                duenioToSave.isActivo = status;
                setIsLoading(true);
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(duenioToSave)
                };
                fetch(baseResource + '/duenios/edit/', requestOptions)
                    .then(function (response){
                        if(response.ok){
                            duenios[row.index] = duenioToSave;
                            setIsLoading(false);
                            setDuenios([...duenios]);
                        }
                    });
            }
        },
        [duenios],
    );

    useEffect(() => {
        setIsLoading(true);

        fetch(baseResource + '/duenios/all')
            .then(response => response.json())
            .then(data => {
                setDuenios([...data.content]);
                setIsLoading(false);
            })
    }, []);

    return (
        <>
            <MainCard title="Dueños">
                <MaterialReactTable
                    columns={columns}
                    data={duenios}
                    editingMode={"modal"} //default
                    enableColumnOrdering
                    enableEditing={true}
                    onEditingRowSave={handleSaveRowEdits}
                    onEditingRowCancel={handleCancelRowEdits}
                    initialState={{ columnPinning: { right: ['mrt-row-actions'] } }}
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            header: 'Acciones', //change header text
                            size: 120,
                            muiTableHeadCellProps: {
                                align: 'center',
                            },
                            enablePinning: true,
                        },
                    }}
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <Tooltip arrow placement="left" title="Editar">
                                <IconButton color="primary" onClick={() => handleEditRowDialog(row)}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow placement="right" title="Eliminar">
                                <IconButton color="error" onClick={() => handleDeleteRowDialog(row)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                            { duenios[row.index].isActivo?
                                <Tooltip arrow placement="right" title="Desactivar">
                                    <IconButton color="error" onClick={() => handleChangeStatusRow(row, false)}>
                                        <Block />
                                    </IconButton>
                                </Tooltip>:
                                <Tooltip arrow placement="right" title="Activar">
                                    <IconButton color="success" onClick={() => handleChangeStatusRow(row, true)}>
                                        <CheckCircle />
                                    </IconButton>
                                </Tooltip>
                            }

                        </Box>
                    )}
                    positionActionsColumn="last"
                    renderTopToolbarCustomActions={() => (
                        <Button
                            color="primary"
                            onClick={() => setCreateModalOpen(true)}
                            variant="contained"
                            startIcon={<Add/>}
                        >
                            Nuevo Dueño
                        </Button>
                    )}
                />
                {createModalOpen?
                    <CreateNewDuenioModal
                        rowData={initialValues}
                        open={createModalOpen}
                        onClose={() => setCreateModalOpen(false)}
                        onSubmit={handleCreateNewRow}
                    /> : <></>
                }
                {editModalOpen?
                    <EditDuenioModal
                        rowData={duenioToEdit}
                        open={editModalOpen}
                        onClose={() => setEditModalOpen(false)}
                        onSubmit={handleSaveChanges}
                    /> : <></>
                }
                {deleteModalOpen ?
                    <DeleteDuenioModal
                        rowData={currentRow}
                        open={deleteModalOpen}
                        onClose={() => setDeleteModalOpen(false)}
                        onSubmit={handleDeleteRow}
                    /> : <></>
                }
            </MainCard>
        </>
    );
}