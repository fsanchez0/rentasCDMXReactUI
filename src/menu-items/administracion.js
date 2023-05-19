import { Settings, Task, PriceCheck, RequestQuote } from "@mui/icons-material";

const icons = {
    Settings, Task, PriceCheck, RequestQuote
}

// ==============================|| ADMIN PAGES MENU ITEMS ||============================== //

const administracion = {
    id: 'administracion',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Administración',
            type: 'collapse',
            icon: icons.Settings,

            children: [
                {
                    id: 'tiposContrato',
                    title: 'Tipos de Contrato',
                    type: 'item',
                    icon: icons.Task,
                    url: '/administracion/tiposContrato',
                    target: false
                },
                {
                    id: 'regimenFiscal',
                    title: 'Régimen Fiscal',
                    type: 'item',
                    icon: icons.PriceCheck,
                    url: '/administracion/regimenFiscal',
                    target: false
                },
                {
                    id: 'usoCFDI',
                    title: 'Uso de CFDI',
                    type: 'item',
                    icon: icons.RequestQuote,
                    url: '/administracion/usoCFDI',
                    target: false
                },
            ]
        }
    ]
};

export default administracion;