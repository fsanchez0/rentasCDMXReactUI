import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as yup from 'yup';
import {Stack} from "@mui/system";

// Custom utils
import {switchModeToSpanish} from "../../utilities/CommonFunctions";

export const CreateEditViewModal = ({ open, mode, rowData, onClose, onSubmit }) => {

    let modo = switchModeToSpanish(mode);

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
                <DialogTitle textAlign="center" variant="h3">{modo} Tipo de Inmueble</DialogTitle>
                <DialogContent>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                        }}
                    >
                        {mode === "create"?<></>:
                            <TextField
                                label="ID"
                                value={formik.values.id}
                                disabled
                                margin="dense"
                            />
                        }
                        <TextField
                            margin="dense"
                            name="tipoInmueble"
                            label="Tipo de Inmueble"
                            value={formik.values.tipoInmueble}
                            onChange={formik.handleChange}
                            InputProps={{
                                readOnly: mode==='view',
                            }}
                        />
                        <TextField
                            margin="dense"
                            name="clave"
                            label="Clave"
                            value={formik.values.clave}
                            onChange={formik.handleChange}
                            InputProps={{
                                readOnly: mode==='view',
                            }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: '1.25rem' }}>
                    <Button onClick={onClose}>{mode==='view'?"Cerrar":"Cancelar"}</Button>
                    { mode !== "view"?
                        <Button color="primary" type="submit" variant="contained">
                            Guardar
                        </Button>:<></>
                    }
                </DialogActions>
            </form>
        </Dialog>
    );
};