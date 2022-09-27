import { Box, Button, Heading, Text } from '@chakra-ui/react'
import DashboardShell from './DashboardShell'

export default function FreePlanEmptyState() {
  return (
    <DashboardShell>
      <Box width="100%" backgroundColor="white" borderRadius={8} p={8}>
        <Heading size="md">Get feedback on your sites instantly</Heading>
        <Text>Start today, then grow with us</Text>
        <Button variant="solid" size="md">
          Upgrade to starter
        </Button>
      </Box>
    </DashboardShell>
  )
}
