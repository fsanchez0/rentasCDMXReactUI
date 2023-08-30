const production = {
    // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: '/',
    defaultPath: '/dashboard/default',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    environment: 'Producción',
    baseResource: 'https://rentascdmx.com/newapi/RentasAdminBackend',
    authRedirectUri: 'https://app.rentascdmx.com/',
    companyName: 'Padilla&Bujalil'
};

const development = {
    basename: '/',
    defaultPath: '/dashboard/default',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    environment: 'Desarrollo',
    baseResource: 'http://localhost:10000/RentasAdminBackend',
    authRedirectUri: 'http://localhost:3000',
    companyName: 'FernandoSanchez'
};
// to change de env
const config = process.env.NODE_ENV === 'development' ? development : production;

export default config;
