import { Settings, Task, PriceCheck, MapsHomeWork, AddHomeWork } from "@mui/icons-material";

const icons = {
    Settings, Task, PriceCheck, MapsHomeWork, AddHomeWork
}

// ==============================|| ADMIN PAGES MENU ITEMS ||============================== //

const inmuebles = {
    id: 'inmuebles',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Inmuebles',
            type: 'collapse',
            icon: icons.MapsHomeWork,

            children: [
                {
                    id: 'inmueblesDisponibles',
                    title: 'Inmuebles Disponibles',
                    type: 'item',
                    icon: icons.AddHomeWork,
                    url: '/inmuebles/inmueblesDisponibles',
                    target: false
                },
            ]
        }
    ]
};

export default inmuebles;