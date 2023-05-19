// assets
//import { IconBrandChrome, IconHelp } from '@tabler/icons';
import { Public, Mail} from "@mui/icons-material";

// constant
const icons = { Public, Mail };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Inmobiliaria',
            type: 'item',
            url: 'https://www.padilla-bujalil.com.mx/',
            icon: icons.Public,
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: 'Correo',
            type: 'item',
            url: 'http://mail.padilla-bujalil.com.mx/',
            icon: icons.Mail,
            external: true,
            target: true
        }
    ]
};

export default other;
