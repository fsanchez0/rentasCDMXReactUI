// assets
import { LibraryBooks, Groups, Groups3, Gavel, HomeWork, HolidayVillage } from "@mui/icons-material";

// constant
const icons = {
    LibraryBooks, Groups, Groups3, Gavel, HomeWork, HolidayVillage
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const catalogos = {
    id: 'catalogos',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Catálogos',
            type: 'collapse',
            icon: icons.LibraryBooks,

            children: [
                {
                    id: 'inmuebles',
                    title: 'Inmuebles',
                    type: 'item',
                    icon: icons.HomeWork,
                    url: '/catalogos/inmuebles',
                    target: false
                },
                {
                    id: 'tiposInmueble',
                    title: 'Tipos de Inmueble',
                    type: 'item',
                    icon: icons.HolidayVillage,
                    url: '/catalogos/tiposInmueble',
                    target: false
                },
                {
                    id: 'login3',
                    title: 'Asesores',
                    type: 'item',
                    icon: icons.Groups,
                    url: '/catalogos/asesores',
                    target: false
                },
                {
                    id: 'register3',
                    title: 'Dueños',
                    type: 'item',
                    icon: icons.Groups3,
                    url: '/catalogos/duenios',
                    target: false
                },
                {
                    id: 'apoderados',
                    title: 'Apoderados',
                    type: 'item',
                    icon: icons.Gavel,
                    url: '/catalogos/apoderados',
                    target: false
                }
            ]
        }
    ]
};

export default catalogos;
