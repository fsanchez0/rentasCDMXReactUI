// assets
//import { IconDashboard } from '@tabler/icons';
import { Home as IconDashboard} from "@mui/icons-material";

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Favoritos',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Inicio',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
