import React, {useEffect, useState} from "react";
import {
    Box,
    Button, Chip,
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
import {switchModeToSpanish} from "../../utilities/CommonFunctions";
import config from "../../../config";

export const CreateEditViewModal = ({ open, mode, rowData, onClose, onSubmit }) => {

    // CONFIGURATION
    const baseResource = config.baseResource;
    // DIALOG MODE VALIDATION
    let modo = switchModeToSpanish(mode);
    let isInViewMode = mode==='view';
    // INITIAL DUENIO
    let defaultDuenio = {
        "id": 0,
        "nombre": "Cargando...",
        "nombre2": "",
        "apaterno": "",
        "amaterno": "",
        "porcentaje": "0"
    }
    // INITIAL CUENTA
    let defaultCuenta = {
        "id": 0,
        "tipoCuenta": 0,
        "numeroDeCuenta": "",
        "notas": ""
    }
    // LISTS USED IN SELECT ELEMENTS
    const [listaDuenios, setListaDuenios] = useState(() => []);
    const [listaTiposInmueble, setListaTiposInmueble] = useState(() => []);
    const [listaTiposCuenta, setListaTiposCuenta] = useState(() => []);
    const [listaAsesores, setListaAsesores] = useState(() => []);
    const [listaPaises, setListaPaises] = useState(() => []);
    const [listaEstados, setListaEstados] = useState(() => []);
    // LIST OF CURRENT INMUEBLE DUENIOS // when edit or view -> fill this list
    const [listaDueniosInmueble, setListaDueniosInmueble] = useState(() => rowData.duenios);
    // LIST OF CURRENT INMUEBLE CUENTAS ASOCIADAS // when edit or view -> fill this list
    const [listaCuentasAsociadas, setListaCuentasAsociadas] = useState(() => rowData.cuentasAsociadas);
    // DEFAULT DUENIO
    const [duenioToAdd, setDuenioToAdd] = useState(() => defaultDuenio);
    // DEFAULT CUENTA
    const [cuentaToAdd, setCuentaToAdd] = useState(() => defaultCuenta);
    const [idTipoCuenta, setIdTipoCuenta] = useState( 0);
    const [numeroCuenta, setNumeroCuenta] = useState("");
    const [notasCuenta, setNotasCuenta] = useState("");
    // CONTROL OF DATA: INITIAL VALUES AND DATA TO SUBMIT. SEE FORMIK DOCS FOR MORE
    const formik = useFormik({
        initialValues: rowData,
        validationSchema: null,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });
    // LIST OF ALL DUENIOS
    useEffect(() => {
        fetch(baseResource + '/duenios/allNameAndId')
            .then(response => response.json())
            .then(data => {
                setListaDuenios([...data.content]);
            })
    }, []);
    // LIST OF TIPOS DE INMUEBLE
    useEffect(() => {
        fetch(baseResource + '/inmuebles/tiposInmueble/all')
            .then(response => response.json())
            .then(data => {
                setListaTiposInmueble([...data]);
            })
    }, []);
    // LIST OF TIPOS DE CUENTA
    useEffect(() => {
        fetch(baseResource + '/inmuebles/tiposCuenta/all')
            .then(response => response.json())
            .then(data => {
                setListaTiposCuenta([...data]);
            })
    }, []);
    // LIST OF ASESORES
    useEffect(() => {
        fetch(baseResource + '/asesores/allNamesAndIdAdmin')
            .then(response => response.json())
            .then(data => {
                setListaAsesores([...data]);
            })
    }, []);
    // LIST OF PAISES
    // not sure if we can create inmuebles outside mexico
    /*
    useEffect(() => {
        fetch(baseResource + 'region/paises')
            .then(response => response.json())
            .then(data => {
                setListaPaises([...data]);
            })
    }, []);
    */
    // LIST OF ESTADOS
    useEffect(() => {
        fetch(baseResource + '/region/estados')
            .then(response => response.json())
            .then(data => {
                setListaEstados([...data]);
            })
    }, []);
    // DUENIO SELECT STUFF
    const onChangeDuenio = (e) => {
        setDuenioToAdd(e.target.value);
    }

    const handleAgregarDuenio = () => {
        var duenioExists = false;
        // There is no "magic" way to check for something in an array without a loop
        for (var i = 0; i < listaDueniosInmueble.length; i++){
            if (listaDueniosInmueble[i].id === duenioToAdd.id) {
                duenioExists = true;
                break;
            }
        }
        if(!duenioExists)
            listaDueniosInmueble.push(duenioToAdd);
        setDuenioToAdd({});
    }

    const handleDeleteDuenio = (item) => {
        var index = listaDueniosInmueble.indexOf(item);
        if(index > -1)
            listaDueniosInmueble.splice(index,1);
        setDuenioToAdd({});
    }

    // CUENTAS STUFF
    const onChangeTipoCuenta = (e) => {
        setIdTipoCuenta(e.target.value);
    }
    const onChangeNumeroCuenta = (e) => {
        setNumeroCuenta(e.target.value);
    }
    const onChangeNotasCuenta = (e) => {
        setNotasCuenta(e.target.value);
    }
    const handleAgregarCuenta = () => {
        let tempCuenta = {
            "id": listaCuentasAsociadas.length,
            "tipoCuenta": idTipoCuenta,
            "numeroDeCuenta": numeroCuenta,
            "notas": notasCuenta
        }
        var cuentaExists = false;
        for (var i = 0; i < listaCuentasAsociadas.length; i++){
            if (listaCuentasAsociadas[i].numeroDeCuenta === numeroCuenta) {
                cuentaExists = true;
                break;
            }
        }
        if(!cuentaExists) {
            listaCuentasAsociadas.push(tempCuenta);
            setNumeroCuenta("");
            setNotasCuenta("");
        }
        setCuentaToAdd({});
    }
    const handleDeleteCuenta = (item) => {
        var index = listaCuentasAsociadas.indexOf(item);
        if(index > -1)
            listaCuentasAsociadas.splice(index,1);
        setCuentaToAdd({});
    }

    return (
        <Dialog open={open}>
            <form onSubmit={formik.handleSubmit} id="masterForm">
                <DialogTitle textAlign="center" variant="h3">{modo} Inmueble</DialogTitle>
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
                        {isInViewMode ?
                            <></> :
                            <>
                            <Grid item xs={12} md={10}>
                                <FormControl fullWidth margin="dense" id="dueniosFormControl">
                                    <InputLabel id="demo-simple-select-label">Dueños</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="regimen-fiscal-select"
                                        value={duenioToAdd}
                                        label="Dueño"
                                        onChange={onChangeDuenio}
                                        defaultValue={defaultDuenio}
                                    >
                                        {listaDuenios.length > 0 ?
                                            listaDuenios.map(option => {
                                                return (
                                                    <MenuItem key={option.id} value={option}>
                                                        {option.nombre + " " + option.nombre2 + " " + option.apaterno + " " + option.amaterno}
                                                    </MenuItem>
                                                )
                                            })
                                            ://todo: solve issue here
                                            <MenuItem key={defaultDuenio.id} value={defaultDuenio}>
                                                <em>Cargando...</em>
                                            </MenuItem>
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Box alignItems="flex-end" justifyContent="center" marginTop={2}>
                                    <Button
                                        fullWidth
                                        margin="dense"
                                        size="medium"
                                        variant="contained"
                                        onClick={handleAgregarDuenio}
                                    >Agregar</Button>
                                </Box>
                            </Grid>
                            </>
                        }
                        {

                            listaDueniosInmueble.length > 0?
                                <Grid item xs={12}>
                                    <Typography variant="h4" align="center">Dueños</Typography>
                                    {listaDueniosInmueble.map(item => {
                                        return (
                                            <Grid item key={item.id} marginTop={2}>
                                                {isInViewMode?
                                                    <Chip label={item.nombre + ' ' + item.nombre2 + ' ' + item.apaterno + ' ' + item.amaterno + ' --> ' + item.porcentaje + '%'}/>
                                                    :
                                                    <Chip label={item.nombre + ' ' + item.nombre2 + ' ' + item.apaterno + ' ' + item.amaterno} title="El porcentaje será determinado al guardar"
                                                        onDelete={() => handleDeleteDuenio(item)}
                                                    />
                                                }
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                                :
                                <></>
                        }
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="dense" id="tipoInmuebleFormControl">
                                <InputLabel id="demo-simple-select-label">Tipo de Inmueble</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="regimen-fiscal-select"
                                    name="idTipoInmueble"
                                    value={formik.values.idTipoInmueble}
                                    label="Tipo de Inmueble"
                                    onChange={formik.handleChange}
                                    inputProps={{
                                        readOnly: isInViewMode,
                                    }}
                                >
                                    {listaTiposInmueble.length>0?
                                        listaTiposInmueble.map(option => {
                                            return (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.tipoInmueble}
                                                </MenuItem>
                                            )
                                        })
                                        :
                                            <MenuItem key={formik.values.idTipoInmueble} value={formik.values.idTipoInmueble}>
                                                {"Cargando..."}
                                            </MenuItem>
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="dense" id="asesorFormControl">
                                <InputLabel id="demo-simple-select-label">Asesor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="regimen-fiscal-select"
                                    name="idAsesor"
                                    value={formik.values.idAsesor}
                                    label="Asesor"
                                    onChange={formik.handleChange}
                                    inputProps={{
                                        readOnly: isInViewMode,
                                    }}
                                >
                                    {listaAsesores.length>0?
                                        listaAsesores.map(option => {
                                            return (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.nombre + " " + option.apellido}
                                                </MenuItem>
                                            )
                                        })
                                        :
                                            <MenuItem key={formik.values.idAsesor} value={formik.values.idAsesor}>
                                                {"Cargando..."}
                                            </MenuItem>
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={mode === "create" ?8:6}>
                            <TextField
                                margin="dense"
                                name="calle"
                                label="Calle"
                                fullWidth
                                value={formik.values.calle}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={mode === "create"?4:6}>
                            <TextField
                                margin="dense"
                                name="numExterior"
                                label="Número Exterior"
                                fullWidth
                                value={formik.values.numExterior}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
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
                                inputProps={{
                                    readOnly: isInViewMode,
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
                                inputProps={{
                                    readOnly: isInViewMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="dense"
                                name="delegacion"
                                label="Alcaldía/Municipio"
                                fullWidth
                                value={formik.values.delegacion}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="dense" id="paisFormControl">
                                <InputLabel id="demo-simple-select-label">País</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="regimen-fiscal-select"
                                    name="idPais"
                                    value={formik.values.idPais}
                                    label="País"
                                    onChange={formik.handleChange}
                                    disabled
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
                        <Grid item xs={12} md={3}>
                            <TextField
                                margin="dense"
                                name="codigoPostal"
                                label="C.P."
                                fullWidth
                                value={formik.values.codigoPostal}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                margin="dense"
                                name="tamanio"
                                label="Tamaño (m²)"
                                fullWidth
                                value={formik.values.tamanio}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="dense"
                                name="predial"
                                label="Cuenta Predial"
                                fullWidth
                                value={formik.values.predial}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="dense"
                                name="telefono"
                                label="Teléfono"
                                fullWidth
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
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
                                inputProps={{
                                    readOnly: isInViewMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                margin="dense"
                                name="notas"
                                label="Notas"
                                fullWidth
                                value={formik.values.notas}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                margin="dense"
                                name="inventario"
                                label="Inventario"
                                fullWidth
                                value={formik.values.inventario}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                margin="dense"
                                name="estacionamiento"
                                label="Estacionamiento"
                                fullWidth
                                value={formik.values.estacionamiento}
                                onChange={formik.handleChange}
                                inputProps={{
                                    readOnly: isInViewMode,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center">Cuentas Asociadas</Typography>
                        </Grid>
                        {isInViewMode ?
                            <></> :
                            <>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth margin="dense" id="cuentasFormControl">
                                        <InputLabel id="demo-simple-select-label">Tipo de Cuenta</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="regimen-fiscal-select"
                                            value={idTipoCuenta}
                                            label="Tipo de Cuenta"
                                            onChange={onChangeTipoCuenta}
                                        >
                                            {listaTiposCuenta.length > 0 ?
                                                listaTiposCuenta.map(option => {
                                                    return (
                                                        <MenuItem key={option.id} value={option.id}>
                                                            {option.tipoCuenta}
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
                                        label="Numero de cuenta"
                                        value={numeroCuenta}
                                        onChange={onChangeNumeroCuenta}
                                    />
                                </Grid>
                                <Grid item xs={12} md={10}>
                                    <TextField
                                        fullWidth
                                        margin="dense"
                                        label="Notas"
                                        value={notasCuenta}
                                        onChange={onChangeNotasCuenta}
                                    />
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Box alignItems="flex-end" justifyContent="center" marginTop={2}>
                                        <Button
                                            fullWidth
                                            margin="dense"
                                            size="medium"
                                            variant="contained"
                                            onClick={handleAgregarCuenta}
                                        >Agregar</Button>
                                    </Box>
                                </Grid>
                            </>
                        }
                        {
                            listaCuentasAsociadas.length > 0?
                                <Grid item xs={12}>
                                    {listaCuentasAsociadas.map(item => {
                                        return (
                                            <Grid item key={item.id} marginTop={2}>
                                                {isInViewMode && listaTiposCuenta.length > 0?
                                                    <Chip
                                                        sx={{
                                                            height: 'auto',
                                                            '& .MuiChip-label': {
                                                                display: 'block',
                                                                whiteSpace: 'normal',
                                                            }
                                                        }}
                                                        label={listaTiposCuenta.at(item.tipoCuenta-1).tipoCuenta + ' --> Num. Cuenta: ' + item.numeroDeCuenta + ' --> Notas: ' + item.notas}
                                                    />
                                                    :listaTiposCuenta.length > 0?
                                                    <Chip
                                                        sx={{
                                                            height: 'auto',
                                                            '& .MuiChip-label': {
                                                                display: 'block',
                                                                whiteSpace: 'normal',
                                                            }
                                                        }}
                                                        label={listaTiposCuenta.at(item.tipoCuenta-1).tipoCuenta + ' --> Num. Cuenta: ' + item.numeroDeCuenta + ' --> Notas: ' + item.notas}
                                                        onDelete={() => handleDeleteCuenta(item)}
                                                    />
                                                    :
                                                    <></>
                                                }
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                                :
                                <></>
                        }
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
    );
};