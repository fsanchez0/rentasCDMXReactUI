import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export const DeleteModal = ({ open, className, objectName, rowId, onClose, onSubmit}) => {

    const handleDelete = () => {
        onSubmit(rowId);
    }

    return(
        <Dialog open={open}>
            <DialogTitle textAlign="center" variant="h3">Eliminar</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Seguro que desea eliminar {className} {objectName}?
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