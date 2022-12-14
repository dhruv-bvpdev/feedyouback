import Head from 'next/head'
import { useAuth } from '@/lib/auth'
import { Button, Code, Flex, Stack, Text } from '@chakra-ui/react'
import Logo from '@/icons/Logo'
import GithubLogo from '@/icons/GithubLogo'
import GoogleLogo from '@/icons/GoogleLogo'

export default function Home() {
  const auth = useAuth()
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('feed-you-back-auth')) {
            window.location.href = "/dashboard"
          }
        `
          }}
        />
        <title>FeedYouBack</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Logo boxSize="65px" mb={2} />

      <Text mb={4} fontSize="lg" p={6}>
        <Text as="span" fontWeight="bold" display="inline">
          Feed You Back
        </Text>{' '}
        is the easiest way to add comments or reviews to your <br /> static site
        . It&apos;s still a work-in-progress, but you can try it out by logging
        in.
      </Text>

      {auth.user ? (
        <Button
          as="a"
          href="/dashboard"
          backgroundColor="white"
          color="gray.900"
          variant="outline"
          mt={4}
          size="lg"
          fontWeight="medium"
          _hover={{ bg: 'gray.100' }}
          _active={{
            bg: 'gray.100',
            transform: 'scale(0.95)'
          }}
        >
          View Dashboard
        </Button>
      ) : (
        <Stack>
          <Button
            leftIcon={<GithubLogo />}
            onClick={e => auth.signInWithGithub()}
            backgroundColor="gray.900"
            color="white"
            mt={4}
            size="lg"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)'
            }}
          >
            Sign In With Github
          </Button>
          <Button
            leftIcon={<GoogleLogo />}
            onClick={e => auth.signInWithGoogle()}
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            mt={4}
            size="lg"
            fontWeight="medium"
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.100',
              transform: 'scale(0.95)'
            }}
          >
            Sign In With Google
          </Button>
        </Stack>
      )}
    </Flex>
  )
}
