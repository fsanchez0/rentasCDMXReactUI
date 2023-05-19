// assets
import { LibraryBooks, Groups, Groups3, Gavel } from "@mui/icons-material";

// constant
const icons = {
    LibraryBooks, Groups, Groups3, Gavel
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Catálogos',
            type: 'collapse',
            icon: icons.LibraryBooks,

            children: [
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

export default pages;
