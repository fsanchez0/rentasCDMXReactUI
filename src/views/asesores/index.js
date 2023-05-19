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
import {CreateNewAsesorModal} from "./create";
import {Stack} from "@mui/system";

// config
import config from "../../config";
import {EditAsesorModal} from "./edit";
import {DeleteAsesorModal} from "./delete";

export default function Asesores() {

    const [asesores, setAsesores] = useState(() => []);
    const [isLoading, setIsLoading] = useState(false);

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    let initialValues = {
        'id': "",
        'nombre': "",
        'apellido': "",
        'correo': "",
        'extension': ""
    };

    const [asesorToEdit, setAsesorToEdit] = useState(initialValues);
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
            accessorKey: "apellido",
            header: "Apellido",
            enableColumnOrdering: false,
            enableEditing: true, //disable editing on this column
            enableSorting: true,
        },
        {
            accessorKey: "correo",
            header: "Correo",
            enableColumnOrdering: false,
            enableEditing: true, //disable editing on this column
            enableSorting: true,
        },
        {
            accessorKey: "extension",
            header: "Extensión",
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
        fetch(baseResource + '/asesores/create', requestOptions)
            .then(response => response.json())
            .then(data => {
                asesores.push(data);
                setIsLoading(false);
                setAsesores([...asesores]);
            });
    };

    const handleEditRowDialog = (row) =>
    {
        setIsLoading(true);
        // get the data from backend
        fetch(baseResource + '/asesores/get/' + row.getValue('id'))
            .then(response => response.json())
            .then(data => {
                initialValues = data; //todo: maybe we don't need two variables here
                setAsesorToEdit(initialValues);
                setRowIndex(row.index); // to get the position of the array to replace later
            }).finally(() => {
            // open dialog
            setEditModalOpen(true);
        });
    }

    const handleSaveChanges = (data) =>
    {
        setIsLoading(true);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(baseResource + '/asesores/edit', requestOptions)
            .then(response => response.json())
            .then(data => {
                asesores[rowIndex] = data;
                setIsLoading(false);
                setAsesores([...asesores]);
            }).finally(() => {
            setEditModalOpen(false);
        });
    }

    const handleDeleteRowDialog = (row) =>
    {
        setIsLoading(true);
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
        fetch(baseResource + '/asesores/delete/' + id, requestOptions)
        .then(function (response){
            if(response.ok){
                asesores.splice(rowIndex, 1);
                setAsesores([...asesores]);
            }
            setIsLoading(false);
        }).finally(() => {
            setDeleteModalOpen(false);
        } );
    }

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            setIsLoading(true);
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            };
            fetch(baseResource + '/asesores/edit', requestOptions)
                .then(response => response.json())
                .then(data => {
                    asesores[row.index] = data;
                    setIsLoading(false);
                    setAsesores([...asesores]);
                });
            exitEditingMode(); //required to exit editing mode and close modal
        }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRowOld = useCallback(
        (row) => {
            if (
                !window.confirm(`Seguro que deseas borrar al asesor ${row.getValue('nombre')} ?`)
            ) {
                return;
            }else {

            }
        },
        [asesores],
    );

    useEffect(() => {
        setIsLoading(true);

        fetch(baseResource + '/asesores/all')
            .then(response => response.json())
            .then(data => {
                setAsesores([...data]);
                setIsLoading(false);
            })
    }, []);

    return (
        <>
          <MainCard title="Asesores">
              <MaterialReactTable
                  columns={columns}
                  data={asesores}
                  editingMode={"modal"} //default
                  enableColumnOrdering
                  enableEditing={true}
                  onEditingRowSave={handleSaveRowEdits}
                  onEditingRowCancel={handleCancelRowEdits}
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
                          Nuevo Asesor
                      </Button>
                  )}
              />
              {editModalOpen ?
                  <EditAsesorModal
                      rowData={asesorToEdit}
                      open={editModalOpen}
                      onClose={() => setEditModalOpen(false)}
                      onSubmit={handleSaveChanges}
                  /> : <></>
              }
              {deleteModalOpen ?
                  <DeleteAsesorModal
                      rowData={currentRow}
                      open={deleteModalOpen}
                      onClose={() => setDeleteModalOpen(false)}
                      onSubmit={handleDeleteRow}
                  /> : <></>
              }
              <CreateNewAsesorModal
                  columns={columns}
                  open={createModalOpen}
                  onClose={() => setCreateModalOpen(false)}
                  onSubmit={handleCreateNewRow}
              />
          </MainCard>
        </>
    );
}
