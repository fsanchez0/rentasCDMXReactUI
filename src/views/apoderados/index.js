import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    Box,
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton, TextField,
    Tooltip
} from "@mui/material";
import MaterialReactTable from 'material-react-table';
import { Add, Delete, Edit } from '@mui/icons-material';

// components
import MainCard from "../../ui-component/cards/MainCard";

// config
import config from "../../config";

export default function Apoderados(){

    const [apoderados, setApoderados] = useState(() => []);

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    let initialValues = {
        "id": "",
        "idDuenio": "",
        "nombre": "",
        "segundoNombre": "",
        "apellidoPaterno": "",
        "apellidoMaterno": "",
        "facultades": "",
        "telefono": "",
        "correo": ""
    };

    const [apoderadoToEdit, setApoderadoToEdit] = useState(initialValues);
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
                accessorKey: "segundoNombre",
                header: "Segundo Nombre",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "apellidoPaterno",
                header: "Apellido Paterno",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "apellidoMaterno",
                header: "Apellido Materno",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "facultades",
                header: "Facultades",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: true,
                size: 400,
            },
            {
                accessorKey: "correo",
                header: "Correo",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "telefono",
                header: "Teléfono",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            }
        ], []);

    useEffect(() => {

        fetch(baseResource + '/apoderados/all')
            .then(response => response.json())
            .then(data => {
                setApoderados([...data]);
            })
    }, []);

    const handleEditRowDialog = (row) =>
    {
        // get the data from backend
        fetch(baseResource + '/apoderados/get/' + row.getValue('id'))
            .then(response => response.json())
            .then(data => {
                initialValues = data; //todo: maybe we don't need two variables here
                setApoderadoToEdit(initialValues);
                setRowIndex(row.index); // to get the position of the array to replace later
            }).finally(() => {
            // open dialog
            setEditModalOpen(true);
        });
    }

    const handleDeleteRowDialog = (row) =>
    {
        setCurrentRow(row);
        setRowIndex(row.index);
        setDeleteModalOpen(true);
    }

    return (
        <>
            <MainCard title={"Apoderados"}>
                <MaterialReactTable
                    data={apoderados}
                    columns={columns}
                    enableColumnOrdering
                    enableEditing
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            header: 'Acciones', //change header text
                            size: 120,
                            muiTableHeadCellProps: {
                                align: 'center',
                            },
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
                            Nuevo Apoderado
                        </Button>
                    )}
                />
                {createModalOpen ?
                    <></>
                    : <></>
                }
            </MainCard>
        </>
    );

}