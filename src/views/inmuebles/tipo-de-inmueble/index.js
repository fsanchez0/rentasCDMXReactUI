import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    Box, Button,
    IconButton,
    Tooltip
} from "@mui/material";
import MaterialReactTable from 'material-react-table';
import {Add, Delete, Edit, Visibility} from '@mui/icons-material';
import {blueGrey} from '@mui/material/colors'

// components
import MainCard from "../../../ui-component/cards/MainCard";

// config
import config from "../../../config";
import {CreateEditViewModal} from "./createEditView";
import {DeleteModal} from "../../common/delete";

export default function TipoDeInmueble(){
    const [tiposDeInmueble, setTiposDeInmueble] = useState(() => []);

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    let initialValues = {
        "id": null,
        "tipoInmueble": "",
        "clave": ""
    };

    const [tipoInmuebleToEdit, setTipoDeInmuebleToEdit] = useState(initialValues);
    const [rowIndex, setRowIndex] = useState(0);
    const [currentRow, setCurrentRow] = useState(null);

    const [validationErrors, setValidationErrors] = useState({});
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
                accessorKey: "tipoInmueble",
                header: "Tipo de Inmueble",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
                size: 240,
            },
            {
                accessorKey: "clave",
                header: "Clave",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
        ], []);

    /********* LOAD INITIAL DATA *********/
    useEffect(() => {
        fetch(baseResource + '/inmuebles/tiposInmueble/all')
            .then(response => response.json())
            .then(data => {
                setTiposDeInmueble([...data]);
            })
    }, []);

    /*********  DATA BINDING & DIALOGS CONTROL  **********/


    const handleDeleteRowDialog = (row) =>
    {
        setCurrentRow(row);
        setRowIndex(row.index);
        setDeleteModalOpen(true);
    }

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRowOld = useCallback(
        (row) => {
            if (
                !window.confirm(`Seguro que deseas borrar el tipo de inmueble ${row.getValue('tipoInmueble')} ?`)
            ) {
                return;
            }else {

            }
        },
        [tiposDeInmueble],
    );


    /*********  REST CALLS  **********/

    /** CREATE **/
    const handleCreateNewRow = (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };
        fetch(baseResource + '/inmuebles/tiposInmueble/create', requestOptions)
            .then(response => response.json())
            .then(data => {
                tiposDeInmueble.push(data);
                setTiposDeInmueble([...tiposDeInmueble]);
            }).finally(() => {
            setCreateModalOpen(false);
        });
    };

    /** GET BY ID **/
    const handleViewEditRowDialog = (row,isEditEnabled) =>
    {
        // get the data from backend
        fetch(baseResource + '/inmuebles/tiposInmueble/get/' + row.getValue('id'))
            .then(response => response.json())
            .then(data => {
                initialValues = data; //todo: maybe we don't need two variables here
                setTipoDeInmuebleToEdit(initialValues);
                setRowIndex(row.index); // to get the position of the array to replace later
            }).finally(() => {
            // open dialog
            // if isEditEnabled then open Edit Modal, otherwise open view
            isEditEnabled?setEditModalOpen(true):setViewModalOpen(true);
        });
    }

    /** EDIT **/
    const handleSaveChanges = (data) =>
    {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(baseResource + '/inmuebles/tiposInmueble/edit', requestOptions)
            .then(response => response.json())
            .then(data => {
                tiposDeInmueble[rowIndex] = data;
                setTiposDeInmueble([...tiposDeInmueble]);
            }).finally(() => {
            setEditModalOpen(false);
        });
    }

    /** DELETE **/
    const handleDeleteRow = (id) =>
    {
        const requestOptions = {
            method: 'DELETE',
        };
        fetch(baseResource + '/inmuebles/tiposInmueble/delete/' + id, requestOptions)
            .then(function (response){
                if(response.ok){
                    tiposDeInmueble.splice(rowIndex, 1);
                    setTiposDeInmueble([...tiposDeInmueble]);
                }
            }).finally(() => {
            setDeleteModalOpen(false);
        } );
    }

    /********** MAIN TABLE ************/
    return (
        <>
            <MainCard title="Tipos de Inmueble">
                <MaterialReactTable
                    columns={columns}
                    data={tiposDeInmueble}
                    editingMode={"modal"} //default
                    enableColumnOrdering
                    enableEditing={true}
                    onEditingRowSave={handleSaveChanges}
                    onEditingRowCancel={handleCancelRowEdits}
                    initialState={{ columnPinning: { right: ['mrt-row-actions'] } }}
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            header: 'Acciones', //change header text
                            size: 100,
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
                            <Tooltip arrow placement="left" title="Editar">
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
                            Nuevo Tipo de Inmueble
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
                        rowData={tipoInmuebleToEdit}
                        open={editModalOpen}
                        onClose={() => setEditModalOpen(false)}
                        onSubmit={handleSaveChanges}
                    /> : <></>
                }
                {viewModalOpen?
                    <CreateEditViewModal
                        mode="view"
                        rowData={tipoInmuebleToEdit}
                        open={viewModalOpen}
                        onClose={() => setViewModalOpen(false)}
                        onSubmit={handleSaveChanges}
                    /> : <></>
                }
                {deleteModalOpen ?
                    <DeleteModal
                        className="el Tipo de Inmueble"
                        objectName={currentRow.getValue('tipoInmueble')}
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