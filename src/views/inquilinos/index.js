import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Box, Button, IconButton, Tooltip} from "@mui/material";
import MaterialReactTable from "material-react-table";
// ICONS
import {Add, Delete, Edit, Visibility} from "@mui/icons-material";
// MUI COMPONENTS
import MainCard from "../../ui-component/cards/MainCard";
// CONFIGURATION
import config from "../../config";
// STYLES
import {blueGrey} from "@mui/material/colors";
// DIALOGS
import {CreateEditViewModal} from "./createEditView";
import {DeleteModal} from "../common/delete";


export default function Inquilinos(){
    // CONFIGURATION
    const baseResource = config.baseResource;
    // TABLE DATA
    const [inquilinos, setInquilinos] = useState(() => []);
    const [isLoading, setIsLoading] = useState(false);
    // DIALOG CONTROL
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    // INITIAL VALUES
    let initialValues = {
            "id": null,
            "nombre": "",
            "nombre2": "",
            "apaterno": "",
            "amaterno": "",
            "nombreNegocio": "",
            "rfc": "",
            "direccionFiscal": "",
            "telefono": "",
            "email1": "",
            "colonia": "",
            "delegacion": "",
            "codigoPostal": "",
            "idEstado": 9,
            "calleDomicilioFiscal": "",
            "numeroExteriorFiscal": "",
            "numeroInteriorFiscal": "",
            "delegacionFiscal": "",
            "coloniaFiscal": "",
            "codigoPostalFiscal": "",
            "localidadFiscal": "",
            "referenciaDomicilioFiscal": "",
            "paisDomicilioFiscal": "MÉXICO",
            "estadoDomicilioFiscal": 9,
            "email2": "",
            "email3": "",
            "nacionalidad": 110,
            "actividadEconomica": 1,
            "giroComercial": 1,
            "fechaNacimiento": -2208964724000,
            "curp": "",
            "usoCFDI": 3,
            "tipoFactura": "PUE",
            "regimenFiscal": 0
        }
    // DIALOG DATA VARIABLES
    const [inquilinoToEdit, setInquilinoToEdit] = useState(initialValues);
    const [rowIndex, setRowIndex] = useState(0);
    const [currentRow, setCurrentRow] = useState(null);
    // TABLE COLUMNS
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
                accessorKey: "nombre",
                header: "Nombre",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "nombre2",
                header: "Segundo Nombre",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "apaterno",
                header: "A. Paterno",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "amaterno",
                header: "A. Materno",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "rfc",
                header: "RFC",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            }

        ], []);

    /** GET ALL RECORDS */
    useEffect(() => {
        setIsLoading(true);
        fetch(baseResource + '/inquilinos/all')
            .then(response => response.json())
            .then(data => {
                setInquilinos([...data]);
                setIsLoading(false);
            })
    }, []);

    /** GET BY ID **/
    const handleViewEditRowDialog = (row, isEditEnabled) =>
    {
        setIsLoading(true);
        // get the data from backend
        fetch(baseResource + '/inquilinos/get/' + row.getValue('id'))
            .then(response => response.json())
            .then(data => {
                initialValues = data; //todo: maybe we don't need two variables here
                // validate data coming from backend
                if(initialValues.regimenFiscal===null)
                    initialValues.regimenFiscal = 0;
                setInquilinoToEdit(initialValues);
                setRowIndex(row.index); // to get the position of the array to replace later
            }).finally(() => {
            // open dialog
            isEditEnabled?setEditModalOpen(true):setViewModalOpen(true);
        });
    }
    /** CREATE **/
    const handleCreateNewRow = (values) => {
        setIsLoading(true);
        console.log(values);
        console.log(JSON.stringify(values));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };
        fetch(baseResource + '/inquilinos/create', requestOptions)
            .then(response => response.json())
            .then(data => {
                inquilinos.push(data);
                setIsLoading(false);
                setInquilinos([...inquilinos]);
                setCreateModalOpen(false);
            });
    };
    /** EDIT **/
    const handleSaveChanges = (data) =>
    {
        setIsLoading(true);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(baseResource + '/inquilinos/edit', requestOptions)
            .then(response => response.json())
            .then(data => {
                inquilinos[rowIndex] = data;
                setIsLoading(false);
                setInquilinos([...inquilinos]);
            }).finally(() => {
            setEditModalOpen(false);
        });
    }
    /** DELETE **/
        // HANDLE DIALOG
    const handleDeleteRowDialog = (row) =>
    {
        setIsLoading(true);
        setCurrentRow(row);
        setRowIndex(row.index);
        setDeleteModalOpen(true);
    }
    // HANDLE REQUEST
    const handleDeleteRow = (id) =>
    {
        const requestOptions = {
            method: 'DELETE',
        };
        fetch(baseResource + '/inquilinos/delete/' + id, requestOptions)
            .then(function (response){
                if(response.ok){
                    inquilinos.splice(rowIndex, 1);
                    setInquilinos([...inquilinos]);
                }
                setIsLoading(false);
            }).finally(() => {
            setDeleteModalOpen(false);
        } );
    }

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    return (
        <>
            <MainCard title="Inquilinos">
                <MaterialReactTable
                    columns={columns}
                    data={inquilinos}
                    editingMode={"modal"} //default
                    enableColumnOrdering
                    enableEditing={true}
                    onEditingRowCancel={handleCancelRowEdits}
                    initialState={{ columnPinning: { right: ['mrt-row-actions'] } }}
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            header: 'Acciones', //change header text
                            size: 60,
                            muiTableHeadCellProps: {
                                align: 'center',
                            },
                            enablePinning: true,
                        },
                    }}
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <Tooltip arrow placement="left" title="Ver">
                                <IconButton sx={{color: blueGrey[500]}} onClick={() => handleViewEditRowDialog(row,0)}>
                                    <Visibility />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow placement="right" title="Editar">
                                <IconButton color="primary" onClick={() => handleViewEditRowDialog(row,1)}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow placement="right" title="Eliminar">
                                <IconButton color="error" onClick={() => handleDeleteRowDialog(row)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
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
                            Nuevo Inquilino
                        </Button>
                    )}
                />
                {createModalOpen?
                    <CreateEditViewModal
                        mode="create"
                        rowData={initialValues}
                        open={createModalOpen}
                        onClose={() => setCreateModalOpen(false)}
                        onSubmit={handleCreateNewRow}
                    /> : <></>
                }
                {editModalOpen?
                    <CreateEditViewModal
                        mode="edit"
                        rowData={inquilinoToEdit}
                        open={editModalOpen}
                        onClose={() => setEditModalOpen(false)}
                        onSubmit={handleSaveChanges}
                    />:<></>
                }
                {viewModalOpen?
                    <CreateEditViewModal
                        mode="view"
                        rowData={inquilinoToEdit}
                        open={viewModalOpen}
                        onClose={() => setViewModalOpen(false)}
                        onSubmit={handleSaveChanges}
                    /> : <></>
                }
                {deleteModalOpen?
                    <DeleteModal
                        className="el Inquilino"
                        objectName={currentRow.getValue('nombre') + ' ' + currentRow.getValue('nombre2') + ' ' + currentRow.getValue('apaterno') + ' ' + currentRow.getValue('amaterno')}
                        rowId={currentRow.getValue('id')}
                        open={deleteModalOpen}
                        onClose={() => setDeleteModalOpen(false)}
                        onSubmit={handleDeleteRow}
                    /> : <></>
                }
            </MainCard>
        </>
    );
}
