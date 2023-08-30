// material-ui
import { useTheme } from '@mui/material/styles';
import {Typography} from "@mui/material";
import config from '../config';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();
    const companyName = config.companyName;

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Berry" width="100" />
         *
         */
        <Typography variant="h2">{companyName}</Typography>
    );
};

export default Logo;
