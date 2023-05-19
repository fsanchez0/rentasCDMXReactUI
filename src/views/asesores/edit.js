import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {Form, useFormik} from "formik";
import * as yup from 'yup';
import {Stack} from "@mui/system";

export const EditAsesorModal = ({ open, rowData, onClose, onSubmit }) => {

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
                <DialogTitle textAlign="center">Editar Asesor</DialogTitle>
                <DialogContent>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                        }}
                    >
                        <TextField
                            label="ID"
                            value={formik.values.id}
                            disabled
                            margin="dense"
                        />
                        <TextField
                            margin="dense"
                            name="nombre"
                            label="Nombre"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="apellido"
                            label="Apellido"
                            value={formik.values.apellido}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="correo"
                            label="Correo"
                            value={formik.values.correo}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="extension"
                            label="Extension"
                            value={formik.values.extension}
                            onChange={formik.handleChange}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: '1.25rem' }}>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button color="primary" type="submit" variant="contained">
                        Guardar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};