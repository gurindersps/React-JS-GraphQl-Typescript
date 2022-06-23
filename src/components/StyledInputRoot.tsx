import * as React from "react"
import ButtonUnstyled from "@mui/base/ButtonUnstyled"
import InputUnstyled, { InputUnstyledProps, inputUnstyledClasses } from "@mui/base/InputUnstyled"
import { styled } from "@mui/system"

const grey = {
    50: "#F3F6F9",
    100: "#E7EBF0",
    200: "#E0E3E7",
    300: "#CDD2D7",
    400: "#B2BAC2",
    500: "#A0AAB4",
    600: "#6F7E8C",
    700: "#3E5060",
    800: "#2D3843",
    900: "#1A2027",
}

const StyledInputRoot = styled("div")(
    ({ theme }) => `
  background: #FFFFFF;
    border: 1px solid #838383;
    border-radius: 5px;
    height: 54px;
    margin-top: 10px;
    padding-left: 15px;
    font-family: 'Inter';
    font-size: 14px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  &.${inputUnstyledClasses.focused} {
    outline: 1px solid #2E68BB;
  }
  &:hover {
    background: #ffffff;
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }
`,
)
const StyledInputElement = styled("input")(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ theme }) => `
  background: transparent;
    border: none;
    border-radius: 5px;
    height: 51px;
    font-family: 'Inter';
    font-size: 14px;
    width: 90%;
  &.${inputUnstyledClasses.focused} {
    outline: 1px solid transparent;
  }
  &:hover {
    background: transparent;
    border-color: transparent;
  }
`,
)

const IconButton = styled(ButtonUnstyled)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: inherit;
    cursor: pointer;
`

const InputAdornment = styled("div")`
    margin: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`

const CustomInput = React.forwardRef(
    (props: InputUnstyledProps, ref: React.ForwardedRef<HTMLDivElement>) => {
        const { components, ...other } = props
        return (
            <InputUnstyled
                components={{
                    Root: StyledInputRoot,
                    Input: StyledInputElement,
                    ...components,
                }}
                {...other}
                ref={ref}
            />
        )
    },
)

export { CustomInput, IconButton, InputAdornment }
