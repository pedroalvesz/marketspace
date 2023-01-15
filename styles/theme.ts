import { extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    blue: {
      primary: '#EE7979',
      secondary: '#EE7979',
    },

    blue_primary: '#364D9D',
    blue_secondary: '#647AC7',

    red_secondary: '#EE7979',

    gray: {
      1: '#1A181B',
      2: '#3E3A40',
      3: '#5F5B62',
      4: '#9F9BA1',
      5: '#D9D8DA',
      6: '#EDECEE',
      7: '#F7F7F8',
    },
  },
  fonts: {
    heading: 'Karla_700Bold',
    body: 'Karla_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  components: {
    Button: {
      baseStyle: () => ({
        rounded: 'md',
        h: '48px',
        p: 3,
      }),
      defaultProps: () => ({
        variant: 'blue',
      }),
      variants: {
        black: (props: any) => ({
          bg: 'gray.1',
          _pressed: {
            bg: 'gray.2'
          },
          _text: {
            color: 'gray.7',
            fontFamily: 'heading',
            fontSize: 'sm',
          },
          ...props
        }),
        gray: (props: any) => ({
          bg: 'gray.5',
          _pressed: {
            bg: 'gray.6'
          },
          _text: {
            color: 'gray.2',
            fontFamily: 'heading',
            fontSize: 'sm',
          },
          ...props
        }),
        blue: (props: any) => ({
          bg: 'blue_secondary',
          _pressed: {
            bg: 'blue_primary'
          },
          _text: {
            color: 'gray.7',
            fontFamily: 'heading',
            fontSize: 'sm',
          },
          ...props
        })
      }
    },
    Checkbox: {
      baseStyle: () => ({
        _checked: {
          borderColor: 'blue_secondary',
          bg: 'blue_secondary',
        }
      })
    },
    Switch: {
      baseStyle: () => ({
        onTrackColor: 'blue_secondary',
      })
    },
    Radio: {
      baseStyle: () => ({
        _checked: {
          borderColor: 'blue_secondary',
          _icon: {
            color: 'blue_secondary',
          }
        }
      })
    }
  }
})