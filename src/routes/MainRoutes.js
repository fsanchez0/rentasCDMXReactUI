import { lazy } from 'react';

// project imports
import MainLayout from '../NewLayout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// catalogos routing
const Asesores      = Loadable(lazy( () => import ('../views/asesores')));
const Apoderados    = Loadable(lazy( () => import ('../views/apoderados')));
const Duenios       = Loadable(lazy( () => import ('../views/duenios')));

// admin routing
const TiposContrato = Loadable(lazy(() => import('../views/administracion/tiposContrato')));
const RegimenFiscal = Loadable(lazy(() => import('../views/administracion/regimenFiscal')));
const UsoCFDI       = Loadable(lazy(() => import('../views/administracion/usoCFDI')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'catalogos',
            children: [
                {
                    path: 'asesores',
                    element: <Asesores />
                }
            ]
        },
        {
            path: 'catalogos',
            children: [
                {
                    path: 'duenios',
                    element: <Duenios />
                }
            ]
        },
        {
            path: 'catalogos',
            children: [
                {
                    path: 'apoderados',
                    element: <Apoderados />
                }
            ]
        },
        {
            path: 'administracion',
            children: [
                {
                    path: 'tiposContrato',
                    element: <TiposContrato />
                },
                {
                    path: 'regimenFiscal',
                    element: <RegimenFiscal />
                },
                {
                    path: 'usoCFDI',
                    element: <UsoCFDI />
                }
            ]
        },
    ]
};

export default MainRoutes;