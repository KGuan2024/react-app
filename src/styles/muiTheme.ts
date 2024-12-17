import { createTheme } from "@mui/material/styles";
import { checkboxClasses, PaletteColorOptions } from "@mui/material";

interface PalleteExtension {
  tertiary?: PaletteColorOptions;
}

//extending palette by adding a tertiary option
declare module "@mui/material/styles" {
  interface Palette extends PalleteExtension {}
  interface PaletteOptions extends PalleteExtension {}
}

//extending buttons by saying they can have a tertiary variant
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    customVariant: true;
  }

  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

export const MuiTheme = createTheme({
  // can't use css/scss vars in palette and can't use scss when overiding component themes in here
  palette: {
    primary: {
      main: "#2f6789",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#007d9e",
    },
    // we're not currently using a tertiary palette, it's just here to show that you can if you want to :)
    tertiary: {
      main: "#592D5E",
    },
    text: {
      primary: "#3b3b3b",
      secondary: "#414141",
    },
  },
  shape: {
    borderRadius: 4, // the default, only some components use this. BorderRadius property in sx overrides multiplies this property
  },
  spacing: 16, // spacings: (factor) => `${0.25 * factor}rem`,
  // but we can use css vars here!
  components: {
    MuiCheckbox: {
      defaultProps: {
        size: "medium",
        disableRipple: true,
      },
      styleOverrides: {
        colorSecondary: {
          [`&.${checkboxClasses.checked}`]: {
            color: "var(--brand-secondary)",
          },
        },
      },
    },
    MuiButton: {
      variants: [
        // any custom variants/colour pallettes go in here
        // not using these atm, just here an an example
        {
          props: { variant: "customVariant", color: "tertiary" },
          style: {},
        },
        {
          props: { color: "tertiary" },
          style: {
            backgroundColor: "var(-bg-light)",
            color: "var(--text-dark)",
            border: "2px solid var(--brand-secondary)",
            "&:hover": {
              backgroundColor: "var(--bg-light)",
              border: "2px solid var(--brand-secondary-light)",
            },
          },
        },
      ],
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          // applies to all buttons unless overridden by a specific variant/type/size
        },
        sizeSmall: {},
        text: {},
        textPrimary: {},
        textSecondary: {},
        contained: {},
      },
    },
  },

  typography: {
    fontFamily: "var(--font-family)",
    // fontSize: 16, // this adjusts the size of the components due to mui being rem based
    fontWeightLight: "var(--regular)",
    fontWeightRegular: "var(--medium)",
    fontWeightBold: "var(--bold)",
  },
});
