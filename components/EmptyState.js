import { Flex, Heading, Text } from '@chakra-ui/react'
import AddSiteModal from './AddSiteModal'
import DashboardShell from './DashboardShell'

export default function EmptyState() {
  return (
    <DashboardShell>
      <Flex
        width="100%"
        backgroundColor="white"
        borderRadius={8}
        p={16}
        justify="center"
        align="center"
        direction="column"
      >
        <Heading size="lg" mb={2}>
          You haven&apos;t added any sites
        </Heading>
        <Text mb={4}>Welcome, Lets get started</Text>
        <AddSiteModal />
      </Flex>
    </DashboardShell>
  )
}
