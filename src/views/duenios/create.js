import React, {useState, useEffect, useMemo} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    OutlinedInput,
    IconButton,
    Divider,
    Chip,
    Tooltip, Checkbox, FormControlLabel, Alert, AlertTitle
} from "@mui/material";

import {useFormik} from "formik";

import config from "../../config";
import {Add, Block, CheckCircle, Delete, Edit, Visibility, VisibilityOff} from "@mui/icons-material";
import MaterialReactTable from "material-react-table";

export const CreateNewDuenioModal = ({ open, rowData, onClose, onSubmit}) => {

    // Columnas
    const apoderadoColumns = useMemo(
        () => [
            {
                accessorFn: (row) => `${row.nombre} ${row.segundoNombre} ${row.apellidoPaterno} ${row.apellidoMaterno}`,
                header: "Nombre",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "facultades",
                header: "Facultades",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: true,
                size: 300,
            },
            {
                accessorKey: "correo",
                header: "Correo",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "telefono",
                header: "Teléfono",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            }
        ], []);

    const cuentaBancariaColumns = useMemo(
        () => [
            {
                accessorKey: "banco",
                header: "Banco",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "titular",
                header: "Titular",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "rfc",
                header: "RFC",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "cuenta",
                header: "Cuenta",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "clabe",
                header: "CLABE",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "idbanco",
                header: "ID Banorte",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "porcentaje",
                header: "Porcentaje",
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: true,
            },
            {
                accessorKey: "notas",
                header: "Notas",
                enableColumnOrdering: false,
                enableEditing: true, //disable editing on this column
                enableSorting: true,
            },
        ], []);

    const [listaRegimenFiscal, setListaRegimenFiscal] = useState(() => []);
    const [listaUsoCFDI, setListaUsoCFDI] = useState(() => []);
    const [showPassword, setShowPassword] = React.useState(false);
    const [listaTelefonos, setListaTelefonos] = React.useState(() => []);
    const [listaCorreos, setListaCorreos] = React.useState(() => []);

    const [telefono, setTelefono] = React.useState("");
    const [notas, setNotas] = React.useState("");
    const [correo, setCorreo] = React.useState("");
    const [notasCorreo, setNotasCorreo] = React.useState("");

    // apoderados
    const [listaApoderados, setListaApoderados] = React.useState(() => []);
    const [nombreApoderado, setNombreApoderado] = React.useState("");
    const [segundoNombreApoderado, setSegundoNombreApoderado] = React.useState("");
    const [apellidoPaternoApoderado, setApellidoPaternoApoderado] = React.useState("");
    const [apellidoMaternoApoderado, setApellidoMaternoApoderado] = React.useState("");
    const [correoApoderado, setCorreoApoderado] = React.useState("");
    const [telefonoApoderado, setTelefonoApoderado] = React.useState("");
    const [facultadesApoderado, setFacultadesApoderado] = React.useState("");

    // domiclios
    const [domicilioFiscalIgualParticular, setDomicilioFiscalIgualParticular] = React.useState(false);

    // cuentas bancarias
    const [listaCuentasBancarias, setListaCuentasBancarias] = React.useState(() => []);
    const [titularCuentaBancaria, setTitularCuentaBancaria] = React.useState("");
    const [porcentajeCuentaBancaria, setPorcentajeCuentaBancaria] = React.useState(100);
    const [bancoCuentaBancaria, setBancoCuentaBancaria] = React.useState("");
    const [cuentaBancaria, setCuentaBancaria] = React.useState("");
    const [clabeCuentaBancaria, setClabeCuentaBancaria] = React.useState("");
    const [idBancoCuentaBancaria, setIdBancoCuentaBancaria] = React.useState("");
    const [rfcCuentaBancaria, setRfcCuentaBancaria] = React.useState("");
    const [notasCuentaBancaria, setNotasCuentaBancaria] = React.useState("");

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onChangeTelefono = (e) => {
        setTelefono(e.target.value);
    };

    const onChangeNotas = (e) => {
        setNotas(e.target.value);
    };

    const onChangeCorreo = (e) => {
        setCorreo(e.target.value);
    };

    const onChangeNotasCorreo = (e) => {
        setNotasCorreo(e.target.value);
    };

    const handleAgregarTelefono = () => {
        const newId = listaTelefonos.length + 1;
        const newContacto = {
            "id": newId,
            "tipoDeContacto": 1,
            "contacto": telefono,
            "nota": notas,
            "usar": true
        };
        if(telefono !== '')
            listaTelefonos.push(newContacto);
        setTelefono('');
        setNotas('');
    }

    const handleAgregarCorreo = () => {
        const newId = listaCorreos.length + 1;
        const newContacto = {
            "id": newId,
            "tipoDeContacto": 2,
            "contacto": correo,
            "nota": notasCorreo,
            "usar": true
        };
        if(correo !== '')
            listaCorreos.push(newContacto);
        setCorreo('');
        setNotasCorreo('');
    }

    const handleAgregarApoderado = () => {
        const newId = listaApoderados.length + 1;
        const newApoderado = {
            "id": newId,
            "idDuenio": "",
            "nombre": nombreApoderado,
            "segundoNombre": segundoNombreApoderado,
            "apellidoPaterno": apellidoPaternoApoderado,
            "apellidoMaterno": apellidoMaternoApoderado,
            "facultades": facultadesApoderado,
            "telefono": telefonoApoderado,
            "correo": correoApoderado
        }
        listaApoderados.push(newApoderado);
        setListaApoderados([...listaApoderados]);
        setNombreApoderado('');
        setSegundoNombreApoderado('');
        setApellidoPaternoApoderado('');
        setApellidoMaternoApoderado('');
        setTelefonoApoderado('');
        setCorreoApoderado('');
        setFacultadesApoderado('');
    }

    const handleAgregarCuentaBancaria = () => {
        const newId = listaCuentasBancarias.length + 1;
        const newCuentaBancaria = {
            "id": newId,
            "idDuenio": null,
            "titular": titularCuentaBancaria,
            "porcentaje": porcentajeCuentaBancaria,
            "banco": bancoCuentaBancaria,
            "cuenta": cuentaBancaria,
            "clabe": clabeCuentaBancaria,
            "idbanco": idBancoCuentaBancaria,
            "rfc": rfcCuentaBancaria,
            "notas": notasCuentaBancaria
        }
        listaCuentasBancarias.push(newCuentaBancaria);
        setListaCuentasBancarias([...listaCuentasBancarias]);
        setTitularCuentaBancaria('');
        setPorcentajeCuentaBancaria(100);
        setBancoCuentaBancaria('');
        setCuentaBancaria('');
        setClabeCuentaBancaria('');
        setIdBancoCuentaBancaria('');
        setRfcCuentaBancaria('');
        setNotasCuentaBancaria('');
    }

    const handleDeleteTelefono = (item) => {
        listaTelefonos.pop(item);
        console.log(listaTelefonos);
        setNotas('borrado');
    }

    const handleDeleteCorreo = (item) => {
        listaCorreos.pop(item);
        console.log(listaCorreos);
        setNotasCorreo('borrado');
    }

    const handleDeleteApoderado = (row) => {
        listaApoderados.splice(row.index, 1);
        setListaApoderados([...listaApoderados]);
    }

    const handleDeleteCuentaBancaria = (row) => {
        listaCuentasBancarias.splice(row.index, 1);
        setListaCuentasBancarias([...listaCuentasBancarias]);
    }

    const handleCopiarDomicilios = (event) => {
        const isChecked = event.target.checked;
        setDomicilioFiscalIgualParticular(isChecked);
        if(isChecked){
            formik.setFieldValue("calleDomicilioFiscal", formik.values.calleDomicilioParticular);
            formik.setFieldValue("numeroExteriorDomicilioFiscal", formik.values.numeroExteriorDomicilioParticular);
            formik.setFieldValue("numeroInteriorDomicilioFiscal", formik.values.numeroInteriorDomicilioParticular);
            formik.setFieldValue("coloniaDomicilioFiscal", formik.values.coloniaDomicilioParticular);
            formik.setFieldValue("delegacionDomicilioFiscal", formik.values.delegacionDomicilioParticular);
            formik.setFieldValue("estadoDomicilioFiscal", formik.values.estadoDomicilioParticular);
            formik.setFieldValue("paisDomicilioFiscal", formik.values.paisDomicilioParticular);
            formik.setFieldValue("codigoPostalDomicilioFiscal", formik.values.codigoPostalDomicilioParticular);
        }else{
            formik.setFieldValue("calleDomicilioFiscal", "");
            formik.setFieldValue("numeroExteriorDomicilioFiscal", "");
            formik.setFieldValue("numeroInteriorDomicilioFiscal", "");
            formik.setFieldValue("coloniaDomicilioFiscal", "");
            formik.setFieldValue("delegacionDomicilioFiscal", "");
            formik.setFieldValue("estadoDomicilioFiscal", "");
            formik.setFieldValue("paisDomicilioFiscal", "");
            formik.setFieldValue("codigoPostalDomicilioFiscal", "");
        }
    }

    const baseResource = config.baseResource;

    // CREATEE FROM PARENT
    const formik = useFormik({
        initialValues: rowData,
        validationSchema: null,
        onSubmit: (values) => {
            console.log("submitting");
            values.apoderados = listaApoderados;
            values.cuentasBancarias = listaCuentasBancarias;
            values.contactos = listaTelefonos.concat(listaCorreos);
            onSubmit(values);
        },
    });

    useEffect(() => {
        fetch(baseResource + '/admin/regimenFiscal/all')
            .then(response => response.json())
            .then(data => {
                setListaRegimenFiscal([...data]);
            })
    }, []);

    useEffect(() => {
        fetch(baseResource + '/admin/usoCFDI/all')
            .then(response => response.json())
            .then(data => {
                setListaUsoCFDI([...data]);
            })
    }, []);

    return (
        <Dialog
            open={open}
            maxWidth="lg"
            fullWidth={true}>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle textAlign="center" variant="h2">Nuevo Dueño</DialogTitle>
                <DialogContent>
                    <Typography variant="h4">Datos Generales</Typography>
                    <Divider/>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth={true}
                                margin="dense"
                                name="nombre"
                                label="Nombre"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth={true}
                                margin="dense"
                                name="nombre2"
                                label="Segundo Nombre"
                                value={formik.values.nombre2}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="apaterno"
                                label="Apellido Paterno"
                                value={formik.values.apaterno}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="amaterno"
                                label="Apellido Materno"
                                value={formik.values.amaterno}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="rfcd"
                                label="RFC"
                                value={formik.values.rfcd}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="demo-simple-select-label">Régimen Fiscal</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="regimen-fiscal-select"
                                    name="regimenFiscal"
                                    value={formik.values.regimenFiscal}
                                    label="Age"
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value={null}>Sin Régimen Fiscal</MenuItem>
                                    {listaRegimenFiscal.map(option => {
                                        return (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.claveRegimenFiscal + ": " + option.nombreRegimenFiscal}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="curp"
                                label="CURP"
                                value={formik.values.curp}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="honorarios"
                                label="Honorarios"
                                type="number"
                                InputProps={{
                                    shrink: "true",
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>
                                }}
                                value={formik.values.honorarios}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="iva"
                                label="I.V.A"
                                type="number"
                                InputProps={{
                                    shrink: "true",
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>
                                }}
                                value={formik.values.iva}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="usuario"
                                label="Usuario"
                                value={formik.values.usuario}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="password"
                                label="Contraseña"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="diasAPagar"
                                label="Días a Pagar"
                                value={formik.values.diasAPagar}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="cfdi-simple-select-label">Uso de CFDI</InputLabel>
                                <Select
                                    labelId="cfdi-simple-select-label"
                                    id="usocfdiselect"
                                    name="usoCFDIid"
                                    value={formik.values.usoCFDIid}
                                    label="Age"
                                    onChange={formik.handleChange}
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
                    </Grid>
                    <Typography variant="h4">Teléfonos</Typography>
                    <Divider/>
                    <Grid container spacing={2} alignItems="center" justifyItems={'center'} style={{width: "100%"}}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="telefono"
                                label="Teléfono"
                                value={telefono}
                                onChange={onChangeTelefono}
                            />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="notas"
                                label="Notas"
                                value={notas}
                                onChange={onChangeNotas}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button
                                fullWidth
                                margin="dense"
                                size="medium"
                                variant="contained"
                                onClick={handleAgregarTelefono}
                            >Agregar</Button>
                        </Grid>
                    </Grid>
                    {
                        listaTelefonos.length > 0?
                            <Grid container spacing={2} alignItems="center" justifyItems={'center'} style={{width: "100%"}}>
                                {listaTelefonos.map(item => {
                                    return (
                                        <Grid item key={item.id} >
                                            <Chip label={item.contacto + ': ' + item.nota} onDelete={() => handleDeleteTelefono(item)} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                            :
                            <></>
                    }
                    <Typography variant="h4">Correos</Typography>
                    <Divider/>
                    <Grid container spacing={2} alignItems="center" justifyItems={'center'} style={{width: "100%"}}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="correo"
                                label="Correo"
                                value={correo}
                                onChange={onChangeCorreo}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="notasCorreo"
                                label="Notas"
                                value={notasCorreo}
                                onChange={onChangeNotasCorreo}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button
                                fullWidth
                                margin="dense"
                                size="medium"
                                variant="contained"
                                onClick={handleAgregarCorreo}
                            >Agregar</Button>
                        </Grid>
                    </Grid>
                    {
                        listaCorreos.length > 0?
                            <Grid container spacing={2} alignItems="center" justifyItems={'center'} style={{width: "100%"}}>
                                {listaCorreos.map(item => {
                                    return (
                                        <Grid item key={item.id} >
                                            <Chip label={item.contacto + ': ' + item.nota} onDelete={() => handleDeleteCorreo(item)} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                            :
                            <></>
                    }
                    <Typography variant="h4">Apoderados</Typography>
                    <Divider/>
                    <Grid container spacing={2} alignItems="center" justifyItems={'center'} style={{width: "100%"}}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="nombreApoderado"
                                label="Nombre"
                                value={nombreApoderado}
                                onChange={(e) => setNombreApoderado(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="segundoNombreApoderado"
                                label="Segundo Nombre"
                                value={segundoNombreApoderado}
                                onChange={(e) => setSegundoNombreApoderado(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="apellidoPApoderado"
                                label="Apellido Paterno"
                                value={apellidoPaternoApoderado}
                                onChange={(e) => setApellidoPaternoApoderado(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="apellidoMApoderado"
                                label="Apellido Materno"
                                value={apellidoMaternoApoderado}
                                onChange={(e) => setApellidoMaternoApoderado(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="telefonoApoderado"
                                label="Teléfono"
                                value={telefonoApoderado}
                                onChange={(e) => setTelefonoApoderado(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="correoApoderado"
                                label="Correo"
                                value={correoApoderado}
                                onChange={(e) => setCorreoApoderado(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="facultades"
                                label="Facultades"
                                value={facultadesApoderado}
                                onChange={(e) => setFacultadesApoderado(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button
                                fullWidth
                                margin="dense"
                                size="medium"
                                variant="contained"
                                onClick={handleAgregarApoderado}
                            >Agregar</Button>
                        </Grid>
                    </Grid>
                    {listaApoderados.length > 0 ?
                        <Grid container spacing={2} alignItems="center" justifyItems={'center'} style={{width: "100%"}}>
                            <Grid item xs={12} md={12}>
                                <MaterialReactTable
                                    columns={apoderadoColumns}
                                    data={listaApoderados}
                                    editingMode={"modal"} //default
                                    enableColumnActions={false}
                                    enableColumnFilters={false}
                                    enablePagination={false}
                                    enableSorting={false}
                                    enableBottomToolbar={false}
                                    enableTopToolbar={false}
                                    enableEditing={true}
                                    initialState={{columnPinning: {right: ['mrt-row-actions']}}}
                                    displayColumnDefOptions={{
                                        'mrt-row-actions': {
                                            header: 'Acciones', //change header text
                                            size: 50,
                                            muiTableHeadCellProps: {
                                                align: 'center',
                                            },
                                            enablePinning: true,
                                        },
                                    }}
                                    renderRowActions={({row, table}) => (
                                        <Box sx={{display: 'flex', gap: '1rem'}}>
                                            <Tooltip arrow placement="right" title="Eliminar">
                                                <IconButton color="error" onClick={() => handleDeleteApoderado(row)}>
                                                    <Delete/>
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    )}
                                    positionActionsColumn="last"
                                />
                            </Grid>
                        </Grid>
                        : <></>
                    }
                    <Typography variant="h4">Domicilio Particular</Typography>
                    <Divider/>
                    <Grid container spacing={2} alignItems="center" justifyItems={'center'} style={{width: "100%"}}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="calleDomicilioParticular"
                                label="Calle"
                                value={formik.values.calleDomicilioParticular}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="numeroExteriorDomicilioParticular"
                                label="Número Exterior"
                                value={formik.values.numeroExteriorDomicilioParticular}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="numeroInteriorDomicilioParticular"
                                label="Número Interior"
                                value={formik.values.numeroInteriorDomicilioParticular}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="coloniaDomicilioParticular"
                                label="Colonia"
                                value={formik.values.coloniaDomicilioParticular}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="delegacionDomicilioParticular"
                                label="Alcaldía/Municipio"
                                value={formik.values.delegacionDomicilioParticular}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="estadoDomicilioParticular"
                                label="Estado"
                                value={formik.values.estadoDomicilioParticular}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="paisDomicilioParticular"
                                label="País"
                                value={formik.values.paisDomicilioParticular}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="codigoPostalDomicilioParticular"
                                label="Código Postal"
                                value={formik.values.codigoPostalDomicilioParticular}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Typography variant="h4">Domicilio Fiscal</Typography>
                    <Divider/>
                    <Grid container spacing={2} alignItems="center" justifyItems={'center'} style={{width: "100%"}}>
                        <Grid item xs={12} md={12}>
                            <FormControlLabel control={<Checkbox
                                checked={domicilioFiscalIgualParticular}
                                onChange={handleCopiarDomicilios}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />} label="Mismo que el Domicilio Particular" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="calleDomicilioFiscal"
                                label="Calle"
                                value={formik.values.calleDomicilioFiscal}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="numeroExteriorDomicilioFiscal"
                                label="Número Exterior"
                                value={formik.values.numeroExteriorDomicilioFiscal}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="numeroInteriorDomicilioFiscal"
                                label="Número Interior"
                                value={formik.values.numeroInteriorDomicilioFiscal}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="coloniaDomicilioFiscal"
                                label="Colonia"
                                value={formik.values.coloniaDomicilioFiscal}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="delegacionDomicilioFiscal"
                                label="Alcaldía/Municipio"
                                value={formik.values.delegacionDomicilioFiscal}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="estadoDomicilioFiscal"
                                label="Estado"
                                value={formik.values.estadoDomicilioFiscal}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="paisDomicilioFiscal"
                                label="País"
                                value={formik.values.paisDomicilioFiscal}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="codigoPostalDomicilioFiscal"
                                label="Código Postal"
                                value={formik.values.codigoPostalDomicilioFiscal}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Typography variant="h4">Datos de Transferencia</Typography>
                    <Divider/>
                    <Grid container spacing={2} alignItems="center" justifyItems={'center'} style={{width: "100%"}}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="bancoCuentaBancaria"
                                label="Banco"
                                value={bancoCuentaBancaria}
                                onChange={(e) => {setBancoCuentaBancaria(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="titularCuentaBancaria"
                                label="Titular en el banco"
                                value={titularCuentaBancaria}
                                onChange={(e) => {setTitularCuentaBancaria(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="rfcCuentaBancaria"
                                label="RFC"
                                value={rfcCuentaBancaria}
                                onChange={(e) => {setRfcCuentaBancaria(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="cuentaBancaria"
                                label="Cuenta"
                                value={cuentaBancaria}
                                onChange={(e) => {setCuentaBancaria(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="clabeCuentaBancaria"
                                label="CLABE"
                                value={clabeCuentaBancaria}
                                onChange={(e) => {setClabeCuentaBancaria(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="idBancoCuentaBancaria"
                                label="ID Banorte"
                                value={idBancoCuentaBancaria}
                                onChange={(e) => {setIdBancoCuentaBancaria(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="porcentajeCuentaBancaria"
                                label="Porcentaje"
                                InputProps={{
                                    shrink: "true",
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>
                                }}
                                type="number"
                                value={porcentajeCuentaBancaria}
                                onChange={(e) => {setPorcentajeCuentaBancaria(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                margin="dense"
                                name="notasCuentaBancaria"
                                label="Notas"
                                value={notasCuentaBancaria}
                                onChange={(e) => {setNotasCuentaBancaria(e.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button
                                fullWidth
                                margin="dense"
                                size="medium"
                                variant="contained"
                                onClick={handleAgregarCuentaBancaria}
                            >Agregar</Button>
                        </Grid>
                    </Grid>
                    {listaCuentasBancarias.length > 0 ?
                        <Grid container spacing={2} alignItems="center" justifyItems={'center'} style={{width: "100%"}}>
                            <Grid item xs={12} md={12}>
                                <MaterialReactTable
                                    columns={cuentaBancariaColumns}
                                    data={listaCuentasBancarias}
                                    editingMode={"modal"} //default
                                    enableColumnActions={false}
                                    enableColumnFilters={false}
                                    enablePagination={false}
                                    enableSorting={false}
                                    enableBottomToolbar={false}
                                    enableTopToolbar={false}
                                    enableEditing={true}
                                    initialState={{columnPinning: {right: ['mrt-row-actions']}}}
                                    displayColumnDefOptions={{
                                        'mrt-row-actions': {
                                            header: 'Acciones', //change header text
                                            size: 50,
                                            muiTableHeadCellProps: {
                                                align: 'center',
                                            },
                                            enablePinning: true,
                                        },
                                    }}
                                    renderRowActions={({row, table}) => (
                                        <Box sx={{display: 'flex', gap: '1rem'}}>
                                            <Tooltip arrow placement="right" title="Eliminar">
                                                <IconButton color="error" onClick={() => handleDeleteCuentaBancaria(row)}>
                                                    <Delete/>
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    )}
                                    positionActionsColumn="last"
                                />
                            </Grid>
                        </Grid>
                        : <></>
                    }
                </DialogContent>
                <DialogActions sx={{ p: '1.25rem' }}>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                        size="large">
                        Crear
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}