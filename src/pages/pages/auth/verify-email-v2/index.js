// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Styled Components
const VerifyEmailIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const VerifyEmailIllustration = styled('img')(({ theme }) => ({
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

const VerifyEmailV2 = () => {
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const imageSource =
    skin === 'bordered' ? 'auth-v2-verify-email-illustration-bordered' : 'auth-v2-verify-email-illustration'

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <VerifyEmailIllustrationWrapper>
            <VerifyEmailIllustration
              alt='verify-email-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </VerifyEmailIllustrationWrapper>
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
            <Box sx={{ mb: 8 }}>
              <Typography variant='h5' sx={{ mb: 2 }}>
                Verify your email ✉️
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Account activation link sent to your email address: <strong>john.doe@email.com</strong> Please follow
                the link inside to continue.
              </Typography>
            </Box>
            <Button fullWidth variant='contained'>
              Skip for now
            </Button>
            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>Didn't get the mail?</Typography>
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
VerifyEmailV2.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default VerifyEmailV2
