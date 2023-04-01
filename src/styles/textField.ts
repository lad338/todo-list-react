export const appBarInputFieldStyle = {
  components: {
    MuiInputLabel: {
      defaultProps: {
        style: {
          color: '#fefefe',
        },
      },
    },
    MuiFilledInput: {
      defaultProps: {
        autoComplete: 'off',
        style: {
          color: '#fefefe',
        },
      },
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottom: `2px solid #ababab`,
          },
          '&:after': {
            borderBottom: `2px solid #fefefe`,
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: '2px solid #cdcdcd',
          },
        },
      },
    },
  },
}
