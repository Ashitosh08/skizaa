// ** React Imports
import { useState } from 'react'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Custom Styled Component
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styles
import 'cleave.js/dist/addons/cleave-phone.us'

// ** Styled Components
const TwoStepsIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const TwoStepsIllustration = styled('img')(({ theme }) => ({
  maxWidth: '46rem',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '35rem'
  }
}))

const TreeIllustration = styled('img')(({ theme }) => ({
  bottom: 0,
  left: '1.875rem',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    left: 0
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    width: '100%'
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  marginLeft: theme.spacing(1),
  color: theme.palette.primary.main
}))

const CleaveInput = styled(Cleave)(({ theme }) => ({
  maxWidth: 50,
  textAlign: 'center',
  height: '50px !important',
  fontSize: '150% !important',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:not(:last-child)': {
    marginRight: theme.spacing(2)
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    margin: 0,
    WebkitAppearance: 'none'
  }
}))

const defaultValues = {
  val1: '',
  val2: '',
  val3: '',
  val4: '',
  val5: '',
  val6: ''
}

const TwoStepsV2 = () => {
  // ** State
  const [isBackspace, setIsBackspace] = useState(false)

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Vars
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const imageSource = skin === 'bordered' ? 'auth-v2-two-steps-illustration-bordered' : 'auth-v2-two-steps-illustration'

  // ** Vars
  const errorsArray = Object.keys(errors)

  const handleChange = (event, onChange) => {
    if (!isBackspace) {
      onChange(event)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (form[index].value && form[index].value.length) {
        form.elements[index + 1].focus()
      }
      event.preventDefault()
    }
  }

  const handleKeyDown = event => {
    if (event.key === 'Backspace') {
      setIsBackspace(true)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (index >= 1) {
        if (!(form[index].value && form[index].value.length)) {
          form.elements[index - 1].focus()
        }
      }
    } else {
      setIsBackspace(false)
    }
  }

  const renderInputs = () => {
    return Object.keys(defaultValues).map((val, index) => (
      <Controller
        key={val}
        name={val}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <Box
            type='tel'
            value={value}
            autoFocus={index === 0}
            component={CleaveInput}
            onKeyDown={handleKeyDown}
            onChange={event => handleChange(event, onChange)}
            options={{ blocks: [1], numeral: true, numeralPositiveOnly: true }}
            sx={{ [theme.breakpoints.down('sm')]: { px: `${theme.spacing(2)} !important` } }}
          />
        )}
      />
    ))
  }

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <TwoStepsIllustrationWrapper>
            <TwoStepsIllustration
              alt='two-steps-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </TwoStepsIllustrationWrapper>
          <FooterIllustrationsV2 image={<TreeIllustration alt='tree' src='/images/pages/tree-2.png' />} />
        </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 12,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2567_9921)">
<path d="M40.618 53.2058C47.6068 53.2058 53.2723 47.5268 53.2723 40.521C53.2723 33.5155 47.6068 27.8364 40.618 27.8364C33.6291 27.8364 27.9635 33.5155 27.9635 40.521C27.9635 47.5268 33.6291 53.2058 40.618 53.2058Z" fill="#5062FF"/>
<path d="M0 40.4752V20.2842C11.0509 20.2842 20.1428 29.3978 20.1428 40.4752C20.1428 51.5523 11.0509 60.6659 0 60.6659V40.4752Z" fill="#5062FF"/>
<path d="M80.9998 40.4752V20.2842C69.9489 20.2842 60.8571 29.3978 60.8571 40.4752C60.8571 51.5523 69.9489 60.6659 80.9998 60.6659V40.4752Z" fill="#5062FF"/>
<path d="M40.4287 0H20.2859C20.2859 11.0773 29.3778 20.191 40.4287 20.191C51.4796 20.191 60.5714 11.0773 60.5714 0H40.4287Z" fill="#5062FF"/>
<path d="M40.4287 80.9999H20.2859C20.2859 69.9225 29.3778 60.8091 40.4287 60.8091C51.4796 60.8091 60.5714 69.9225 60.5714 80.9999H40.4287Z" fill="#5062FF"/>
</g>
<defs>
<clipPath id="clip0_2567_9921">
<rect width="81" height="81" fill="white"/>
</clipPath>
</defs>
</svg>

              <Typography
                variant='h6'
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ mb: 2 }}>
                Two Step Verification 💬
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                We sent a verification code to your mobile. Enter the code from the mobile in the field below.
              </Typography>
              <Typography sx={{ mt: 2, fontWeight: 700 }}>******1234</Typography>
            </Box>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>Type your 6 digit security code</Typography>
            <form onSubmit={handleSubmit(() => true)}>
              <CleaveWrapper
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...(errorsArray.length && {
                    '& .invalid:focus': {
                      borderColor: theme => `${theme.palette.error.main} !important`,
                      boxShadow: theme => `0 1px 3px 0 ${hexToRGBA(theme.palette.error.main, 0.4)}`
                    }
                  })
                }}
              >
                {renderInputs()}
              </CleaveWrapper>
              {errorsArray.length ? (
                <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid OTP</FormHelperText>
              ) : null}
              <Button fullWidth type='submit' variant='contained' sx={{ mt: 4 }}>
                Verify My Account
              </Button>
            </form>
            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>Didn't get the code?</Typography>
              <LinkStyled href='/' onClick={e => e.preventDefault()}>
                Resend
              </LinkStyled>
            </Box>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}
TwoStepsV2.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default TwoStepsV2
