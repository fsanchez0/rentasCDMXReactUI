import React, {useEffect, useMemo, useState} from "react";
import {
    Box,
    Button,
    IconButton,
    Tooltip
} from "@mui/material";
// MUI TABLE
import MaterialReactTable from 'material-react-table';
// ICONS
import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
// MUI COMPONENTS
import MainCard from "../../../ui-component/cards/MainCard";
// CONFIGURATION
import config from "../../../config";
// DIALOGS
import {CreateEditViewModal} from "./createEditView";
import {DeleteModal} from "../../common/delete";
// STYLES
import {blueGrey} from "@mui/material/colors";

export default function Inmuebles() {

    // CONFIGURATION
    const baseResource = config.baseResource;
    // TABLE DATA
    const [inmuebles, setInmuebles] = useState(() => []);
    // LOADING VAR --- NOT WORKING YET
    const [isLoading, setIsLoading] = useState(false);
    // DIALOG CONTROL VARIABLES
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    // ERRORS VALIDATION
    const [validationErrors, setValidationErrors] = useState({});

    // INITIAL VALUES FOR DIALOGS, THEY FILL ON DIALOG OPEN
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
        'telefono': "",
        "idTipoInmueble": "",
        "idAsesor": "",
        "idPais": 110,
        "idEstado": 9,
        "codigoPostal": "",
        "tamanio": "",
        "predial": "",
        "duenios": [],
        "cuentasAsociadas": []
    };

    // DIALOG DATA VARIABLES
    const [inmuebleToEdit, setInmuebleToEdit] = useState(initialValues);
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
        fetch(baseResource + '/inmuebles/create', requestOptions)
            .then(response => response.json())
            .then(data => {
                inmuebles.push(data);
                setIsLoading(false);
                setInmuebles([...inmuebles]);
                setCreateModalOpen(false);
            });
    };

    /** GET BY ID **/
    const handleViewEditRowDialog = (row, isEditEnabled) =>
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
            isEditEnabled?setEditModalOpen(true):setViewModalOpen(true);
        });
    }

    /** EDIT **/
    const handleSaveChanges = (data) =>
    {
        setIsLoading(true);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(baseResource + '/inmuebles/edit', requestOptions)
            .then(response => response.json())
            .then(data => {
                inmuebles[rowIndex] = data;
                setIsLoading(false);
                setInmuebles([...inmuebles]);
            }).finally(() => {
            setEditModalOpen(false);
        });
    }

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

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
        fetch(baseResource + '/inmuebles/delete/' + id, requestOptions)
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

    useEffect(() => {
        setIsLoading(true);

        fetch(baseResource + '/inmuebles/all')
            .then(response => response.json())
            .then(data => {
                setInmuebles([...data]);
                setIsLoading(false);
            })
    }, []);

    return (
        <>
          <MainCard title="Inmuebles">
              <MaterialReactTable
                  columns={columns}
                  data={inmuebles}
                  editingMode={"modal"} //default
                  enableColumnOrdering
                  enableEditing={true}
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
                              <IconButton sx={{color: blueGrey[500]}} onClick={() => handleViewEditRowDialog(row,0)}>
                                  <Visibility />
                              </IconButton>
                          </Tooltip>
                          <Tooltip arrow placement="right" title="Eliminar">
                              <IconButton color="error" onClick={() => handleDeleteRowDialog(row)}>
                                  <Delete />
                              </IconButton>
                          </Tooltip>
                          <Tooltip arrow placement="right" title="Editar">
                              <IconButton color="primary" onClick={() => handleViewEditRowDialog(row,1)}>
                                  <Edit />
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
                          Nuevo Inmueble
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
              {editModalOpen ?
                  <CreateEditViewModal
                      mode="edit"
                      rowData={inmuebleToEdit}
                      open={editModalOpen}
                      onClose={() => setEditModalOpen(false)}
                      onSubmit={handleSaveChanges}
                  /> : <></>
              }
              {viewModalOpen ?
                  <CreateEditViewModal
                      mode="view"
                      rowData={inmuebleToEdit}
                      open={viewModalOpen}
                      onClose={() => setViewModalOpen(false)}
                      onSubmit={handleSaveChanges}
                  /> : <></>
              }
              {deleteModalOpen?
                  <DeleteModal
                      className="el Inmueble"
                      objectName={currentRow.getValue('calle') + ' ' + currentRow.getValue('numExterior')}
                      rowId={currentRow.getValue('id')}
                      open={deleteModalOpen}
                      onClose={() => setDeleteModalOpen(false)}
                      onSubmit={handleDeleteRow}
                      />:<></>
              }
          </MainCard>
        </>
    );
}
