import React from "react";

/**
 * Simply switch and return the string in english
 * @param modeInEnglish
 * @constructor
 */
export const switchModeToSpanish = (modeInEnglish) => {
    switch (modeInEnglish){
        case "edit":
            return "Editar";
        case "create":
            return "Nuevo";
        case "view":
            return "Ver";
        default:
            return modeInEnglish;
    }
}