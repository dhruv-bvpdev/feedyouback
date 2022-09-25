import { theme as chakraTheme, extendTheme } from '@chakra-ui/react'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const fonts = {
  ...chakraTheme.fonts,
  body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  heading: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
}

const overrides = {
  ...chakraTheme,
  config,
  fonts,
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  }
}

const customTheme = extendTheme(overrides)
export default customTheme
