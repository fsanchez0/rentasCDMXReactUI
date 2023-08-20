import React from "react";
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, FormControlLabel,
    FormGroup,
    FormLabel,
    TextField
} from "@mui/material";
import {useFormik} from "formik";
import * as yup from 'yup';
import {Stack} from "@mui/system";

export const EditAsesorModal = ({ open, rowData, onClose, onSubmit }) => {

    const [state, setState] = React.useState({
        fiscal: false,
        noFiscal: false
    });

    const {fiscal, noFiscal} = state;

    const formik = useFormik({
        initialValues: rowData,
        validationSchema: null,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    const handleCheckBoxChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

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
                        <FormControl sx={{ m: 1.5 }} component="fieldset" variant="standard">
                            <FormLabel component="legend">Categorías</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={fiscal} onChange={handleCheckBoxChange} name="rcAdmin" />
                                    }
                                    label="RC Administración"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={noFiscal} onChange={handleCheckBoxChange} name="rcRenta" />
                                    }
                                    label="RC Renta"
                                />
                            </FormGroup>
                        </FormControl>
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