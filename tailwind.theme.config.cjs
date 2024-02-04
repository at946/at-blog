const colors = require('tailwindcss/colors')

module.exports = {
    default: {
        colors: {
            primary: colors.purple[700],
            secondary: colors.purple[500],
            dark: {
                primary: colors.teal[500],
                secondary: colors.teal[300]
            },
            accent: {
                gray: {
                    light: colors.gray[200],
                    dark: colors.gray[500]
                },
                default: colors.blue[700]
            }
        }
    }
}
