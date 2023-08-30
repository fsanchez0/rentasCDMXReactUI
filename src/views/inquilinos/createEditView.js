import React, {useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel, MenuItem, Select,
    TextField, Typography
} from "@mui/material";

import {useFormik} from "formik";
import * as yup from 'yup';
import {switchModeToSpanish} from "../utilities/CommonFunctions";
import config from "../../config";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";

export const CreateEditViewModal = ({ open, mode, rowData, onClose, onSubmit}) => {
    // CONFIGURATION
    const baseResource = config.baseResource;
    // DATE
    let dateFromFechaNacimiento = new Date(0);
    dateFromFechaNacimiento.setUTCSeconds(rowData.fechaNacimiento);
    // DIALOG MODE VALIDATION
    let modo = switchModeToSpanish(mode);
    let isInViewMode = mode==='view';
    // INITIAL INQUILINO
    const [fechaNacimiento, setFechaNacimiento] = useState(mode==='create'?dayjs('2000-01-01'):dayjs(rowData.fechaNacimiento));
    // LISTS
    const [listaPaises, setListaPaises] = useState(() => []);
    const [listaEstados, setListaEstados] = useState(() => []);
    const [listaRegimenFiscal, setListaRegimenFiscal] = useState(() => []);
    const [listaActividadEconomica, setListaActividadEconomica] = useState(() => []);
    const [listaUsoCFDI, setListaUsoCFDI] = useState(() => []);
    // CONTROL OF DATA: INITIAL VALUES AND DATA TO SUBMIT. SEE FORMIK DOCS FOR MORE
    const formik = useFormik({
        initialValues: rowData,
        validationSchema: null,
        onSubmit: (values) => {
            values.fechaNacimiento = fechaNacimiento.unix()*1000; //convert to milliseconds
            onSubmit(values);
        },
    });

    // LIST OF REGIMEN FISCAL
    useEffect(() => {
        fetch(baseResource + '/admin/regimenFiscal/all')
            .then(response => response.json())
            .then(data => {
                setListaRegimenFiscal([...data]);
            })
    }, [])
    // LIST OF PAISES
    // not sure if we can create inmuebles outside mexico
    useEffect(() => {
        fetch(baseResource + '/region/paises')
            .then(response => response.json())
            .then(data => {
                setListaPaises([...data]);
            })
    }, []);
    // LIST OF ESTADOS
    useEffect(() => {
        fetch(baseResource + '/region/estados')
            .then(response => response.json())
            .then(data => {
                setListaEstados([...data]);
            })
    }, []);
    // LIST OF ACTIVIDADES ECONOMICAS
    useEffect(() => {
        fetch(baseResource + '/admin/actividadEconomica/all')
            .then(response => response.json())
            .then(data => {
                setListaActividadEconomica([...data]);
            })
    }, []);
    // LIST OF USO DE CFDI
    useEffect(() => {
        fetch(baseResource + '/admin/usoCFDI/all')
            .then(response => response.json())
            .then(data => {
                setListaUsoCFDI([...data]);
            })
    }, []);

    return (
        <Dialog open={open}>
            <form onSubmit={formik.handleSubmit} id="masterForm">
                <DialogTitle textAlign="center" variant="h3">{modo} Inquilino</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {mode === "create" ? <></> :
                            <Grid item xs={12}>
                                <TextField
                                    label="ID"
                                    value={formik.values.id}
                                    disabled
                                    margin="dense"
                                    fullWidth
                                    inputProps={{
                                        readOnly: isInViewMode,
                                    }}
                                />
                            </Grid>
                        }
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth={true}
                                margin="dense"
                                name="nombre"
                                label="Nombre / Empresa (completo)"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth={true}
                                margin="dense"
                                name="nombre2"
                                label="Segundo Nombre"
                                value={formik.values.nombre2}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="apaterno"
                                label="Apellido Paterno"
                                value={formik.values.apaterno}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="amaterno"
                                label="Apellido Materno"
                                value={formik.values.amaterno}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    margin="dense"
                                    components={['DatePicker']}>
                                    <DatePicker
                                        sx={{width: "100%"}}
                                        margin="dense"
                                        label="Fecha de Nacimiento/Constitución"
                                        value={fechaNacimiento}
                                        onChange={(newValue) => setFechaNacimiento(newValue)}
                                        inputProps={{
                                            readOnly: isInViewMode,
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="curp"
                                label="CURP"
                                value={formik.values.curp}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
                                    maxLength: 18
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="rfc"
                                label="RFC"
                                value={formik.values.rfc}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
                                    maxLength: 13
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="dense" id="regimenFiscalFormControl">
                                <InputLabel id="demo-simple-select-label">Régimen Fiscal</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="regimen-fiscal-select"
                                    name="regimenFiscal"
                                    value={formik.values.regimenFiscal}
                                    label="Régimen Fiscal"
                                    onChange={formik.handleChange}
                                    inputProps={{
                                        readOnly: isInViewMode,
                                    }}
                                >
                                    <MenuItem value={0}>Sin Régimen Fiscal</MenuItem>
                                    {listaRegimenFiscal.length > 0 ?
                                        listaRegimenFiscal.map(option => {
                                            return (
                                                <MenuItem key={option.id} value={option.claveRegimenFiscal}>
                                                    {option.claveRegimenFiscal + ": " + option.nombreRegimenFiscal}
                                                </MenuItem>
                                            )
                                        })
                                        ://todo: solve issue here
                                        <MenuItem key={0} value={0}>
                                            <em>Cargando...</em>
                                        </MenuItem>
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="dense" id="paisFormControl">
                                <InputLabel id="demo-simple-select-label">Nacionalidad</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="regimen-fiscal-select"
                                    name="nacionalidad"
                                    value={formik.values.nacionalidad}
                                    label="Nacionalidad"
                                    onChange={formik.handleChange}
                                    inputProps={{
                                        readOnly: isInViewMode,
                                    }}
                                >
                                    <MenuItem value={110}>MÉXICO</MenuItem>
                                    {listaPaises.map(option => {
                                        return (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.pais}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="nombreNegocio"
                                label="Nombre del Negocio"
                                value={formik.values.nombreNegocio}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth margin="dense" id="actividadEconomicaFormControl">
                                <InputLabel id="demo-simple-select-label">Actividad Económica</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="regimen-fiscal-select"
                                    name="actividadEconomica"
                                    value={formik.values.actividadEconomica}
                                    label="Actividad Económica"
                                    onChange={formik.handleChange}
                                    inputProps={{
                                        readOnly: isInViewMode,
                                    }}
                                >
                                    {listaActividadEconomica.length > 0 ?
                                        listaActividadEconomica.map(option => {
                                            return (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.nombre}
                                                </MenuItem>
                                            )
                                        })
                                        ://todo: solve issue here
                                        <MenuItem key={0} value={0}>
                                            <em>Cargando...</em>
                                        </MenuItem>
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="tipoFactura"
                                label="Tipo de Facturación"
                                value={formik.values.tipoFactura}
                                disabled
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="email1"
                                label="Correo Electrónico 1"
                                value={formik.values.email1}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="email2"
                                label="Correo Electrónico 2"
                                value={formik.values.email2}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="email3"
                                label="Correo Electrónico 3"
                                value={formik.values.email3}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="telefono"
                                label="Teléfono"
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="direccionFiscal"
                                label="Dirección"
                                value={formik.values.direccionFiscal}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="delegacion"
                                label="Alcaldía/Municipio"
                                value={formik.values.delegacion}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="colonia"
                                label="Colonia"
                                value={formik.values.colonia}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="codigoPostal"
                                label="Código Postal"
                                value={formik.values.codigoPostal}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
                                    maxLength: 5
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="dense" id="estadoFormControl">
                                <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="regimen-fiscal-select"
                                    name="idEstado"
                                    value={formik.values.idEstado}
                                    label="Estado"
                                    onChange={formik.handleChange}
                                    inputProps={{
                                        readOnly: isInViewMode,
                                    }}
                                >
                                    <MenuItem value={9}>Ciudad de México</MenuItem>
                                    {listaEstados.map(option => {
                                        return (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.estado}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="cfdi-simple-select-label">Uso de CFDI</InputLabel>
                                <Select
                                    labelId="cfdi-simple-select-label"
                                    id="usocfdiselect"
                                    name="usoCFDI"
                                    value={formik.values.usoCFDI}
                                    label="Age"
                                    onChange={formik.handleChange}
                                    inputProps={{
                                        readOnly: isInViewMode
                                    }}
                                >
                                    {listaUsoCFDI.map(option => {
                                        return (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.claveCFDI + ": " + option.descripcion}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center">Domicilio Fiscal</Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="calleDomicilioFiscal"
                                label="Calle"
                                value={formik.values.calleDomicilioFiscal}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="numeroExteriorFiscal"
                                label="Número Exterior"
                                value={formik.values.numeroExteriorFiscal}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="numeroInteriorFiscal"
                                label="Número Interior"
                                value={formik.values.numeroInteriorFiscal}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="coloniaFiscal"
                                label="Colonia"
                                value={formik.values.coloniaFiscal}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="codigoPostalFiscal"
                                label="Código Postal"
                                value={formik.values.codigoPostalFiscal}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
                                    maxLength: 5
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="delegacionFiscal"
                                label="Alcaldía/Municipio"
                                value={formik.values.delegacionFiscal}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="localidadFiscal"
                                label="Localidad"
                                value={formik.values.localidadFiscal}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="referenciaDomicilioFiscal"
                                label="Referencia"
                                value={formik.values.referenciaDomicilioFiscal}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="dense" id="paisFormControlTwo">
                                <InputLabel id="demo-simple-select-label">País</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="regimen-fiscal-select"
                                    name="paisDomicilioFiscal"
                                    value={formik.values.paisDomicilioFiscal}
                                    label="País"
                                    onChange={formik.handleChange}
                                    defaultValue={"MÉXICO"}
                                    inputProps={{
                                        readOnly: isInViewMode,
                                    }}
                                    disabled
                                >
                                    <MenuItem value={"MÉXICO"}>MÉXICO</MenuItem>
                                    {listaPaises.map(option => {
                                        return (
                                            <MenuItem key={option.id} value={option.pais}>
                                                {option.pais}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="dense" id="estadoFormControlTwo">
                                <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="regimen-fiscal-select"
                                    name="estadoDomicilioFiscal"
                                    value={formik.values.estadoDomicilioFiscal}
                                    label="Estado"
                                    onChange={formik.handleChange}
                                    inputProps={{
                                        readOnly: isInViewMode,
                                    }}
                                >
                                    <MenuItem value={9}>Ciudad de México</MenuItem>
                                    {listaEstados.map(option => {
                                        return (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.estado}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions sx={{ p: '1.25rem' }}>
                    <Button
                        onClick={onClose}
                        variant={isInViewMode?"contained":""}
                    >
                        {mode==='view'?"Cerrar":"Cancelar"}
                    </Button>
                    { mode !== "view"?
                        <Button color="primary" type="submit" variant="contained">
                            Guardar
                        </Button>:<></>
                    }
                </DialogActions>
            </form>
        </Dialog>
    )
}