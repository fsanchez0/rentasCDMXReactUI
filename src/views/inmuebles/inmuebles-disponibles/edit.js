import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from 'yup';

export const EditInmuebleDisponibleModal = ({ open, rowData, onClose, onSubmit }) => {

    const formik = useFormik({
        initialValues: rowData,
        validationSchema: null,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    return (
        <Dialog open={open}>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle textAlign="center" variant="h3">Detalles del Inmueble</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={2}>
                            <TextField
                                label="ID"
                                value={formik.values.id}
                                disabled
                                margin="dense"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="dense"
                                name="calle"
                                label="Calle"
                                fullWidth
                                value={formik.values.calle}
                                onChange={formik.handleChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                margin="dense"
                                name="numExterior"
                                label="Número Exterior"
                                fullWidth
                                value={formik.values.numExterior}
                                onChange={formik.handleChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                margin="dense"
                                name="numInterior"
                                label="Número Interior"
                                fullWidth
                                value={formik.values.numInterior}
                                onChange={formik.handleChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                                margin="dense"
                                name="colonia"
                                label="Colonia"
                                fullWidth
                                value={formik.values.colonia}
                                onChange={formik.handleChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="dense"
                                name="delegacion"
                                label="Delegación/Municipio"
                                fullWidth
                                value={formik.values.delegacion}
                                onChange={formik.handleChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <TextField
                                margin="dense"
                                name="codigoPostal"
                                label="C.P."
                                fullWidth
                                value={formik.values.codigoPostal}
                                onChange={formik.handleChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                margin="dense"
                                name="predial"
                                label="Predial"
                                fullWidth
                                value={formik.values.predial}
                                onChange={formik.handleChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                margin="dense"
                                name="descripcion"
                                label="Descripción"
                                fullWidth
                                value={formik.values.descripcion}
                                onChange={formik.handleChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: '1.25rem' }}>
                    <Button onClick={onClose}>Cerrar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};