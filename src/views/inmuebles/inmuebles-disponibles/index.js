import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    Box,
    IconButton,
    Tooltip
} from "@mui/material";
import MaterialReactTable from 'material-react-table';
import { Visibility } from '@mui/icons-material';

// components
import MainCard from "../../../ui-component/cards/MainCard";

// config
import config from "../../../config";
import {EditInmuebleDisponibleModal} from "./edit";

export default function InmueblesDisponibles() {

    const [inmuebles, setInmuebles] = useState(() => []);
    const [isLoading, setIsLoading] = useState(false);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    let initialValues = {
        'id': "",
        'calle': "",
        'numExterior': "",
        'numInterior': "",
        'colonia': "",
        'delegacion': "",
        'descripcion': "",
        'notas': "",
        'inventario': "",
        'estacionamiento': "",
        'telefono': ""
    };

    const [inmuebleToEdit, setInmuebleToEdit] = useState(initialValues);
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
            accessorKey: "calle",
            header: "Calle",
            enableColumnOrdering: false,
            enableEditing: true, //disable editing on this column
            enableSorting: true,
        },
        {
            accessorKey: "numExterior",
            header: "Num. Ext.",
            enableColumnOrdering: false,
            enableEditing: true, //disable editing on this column
            enableSorting: true,
        },
        {
            accessorKey: "numInterior",
            header: "Num. Int.",
            enableColumnOrdering: false,
            enableEditing: true, //disable editing on this column
            enableSorting: true,
        },
        {
            accessorKey: "colonia",
            header: "Colonia",
            enableColumnOrdering: false,
            enableEditing: true, //disable editing on this column
            enableSorting: true,
        },
        {
            accessorKey: "delegacion",
            header: "Alcaldía",
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
                inmuebles.push(data);
                setIsLoading(false);
                setInmuebles([...inmuebles]);
            });
    };

    const handleEditRowDialog = (row) =>
    {
        setIsLoading(true);
        // get the data from backend
        fetch(baseResource + '/inmuebles/get/' + row.getValue('id'))
            .then(response => response.json())
            .then(data => {
                initialValues = data; //todo: maybe we don't need two variables here
                setInmuebleToEdit(initialValues);
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
                inmuebles[rowIndex] = data;
                setIsLoading(false);
                setInmuebles([...inmuebles]);
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
                inmuebles.splice(rowIndex, 1);
                setInmuebles([...inmuebles]);
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
                    inmuebles[row.index] = data;
                    setIsLoading(false);
                    setInmuebles([...inmuebles]);
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
        [inmuebles],
    );

    useEffect(() => {
        setIsLoading(true);

        fetch(baseResource + '/inmuebles/disponibles/all')
            .then(response => response.json())
            .then(data => {
                setInmuebles([...data]);
                setIsLoading(false);
            })
    }, []);

    return (
        <>
          <MainCard title="Inmuebles Disponibles">
              <MaterialReactTable
                  columns={columns}
                  data={inmuebles}
                  editingMode={"modal"} //default
                  enableColumnOrdering
                  enableEditing={true}
                  onEditingRowSave={handleSaveRowEdits}
                  onEditingRowCancel={handleCancelRowEdits}
                  displayColumnDefOptions={{
                      'mrt-row-actions': {
                          header: 'Acciones', //change header text
                          size: 60,
                          muiTableHeadCellProps: {
                              align: 'center',
                          },
                      },
                  }}
                  renderRowActions={({ row, table }) => (
                      <Box sx={{ display: 'flex', gap: '1rem' }}>
                          <Tooltip arrow placement="left" title="Ver">
                              <IconButton color="primary" onClick={() => handleEditRowDialog(row)}>
                                  <Visibility />
                              </IconButton>
                          </Tooltip>
                      </Box>
                  )}
                  positionActionsColumn="last"
              />
              {editModalOpen ?
                  <EditInmuebleDisponibleModal
                      rowData={inmuebleToEdit}
                      open={editModalOpen}
                      onClose={() => setEditModalOpen(false)}
                      onSubmit={handleSaveChanges}
                  /> : <></>
              }
          </MainCard>
        </>
    );
}
