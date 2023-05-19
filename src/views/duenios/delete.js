import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export const DeleteDuenioModal = ({ open, rowData, onClose, onSubmit}) => {

    const handleDelete = () => {
        onSubmit(rowData.getValue('id'));
    }

    return(
        <Dialog open={open}>
            <DialogTitle textAlign="center" variant="h3">Eliminar Dueño</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Seguro que desea eliminar al dueño {rowData.getValue('nombre')}?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Cancelar</Button>
                <Button color="error" variant="contained" onClick={handleDelete}>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
};