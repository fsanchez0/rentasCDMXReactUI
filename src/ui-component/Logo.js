// material-ui
import { useTheme } from '@mui/material/styles';
import {Typography} from "@mui/material";

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

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Berry" width="100" />
         *
         */
        <h2>Padilla&Bujalil</h2>
    );
};

export default Logo;
