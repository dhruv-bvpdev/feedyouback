import NextLink from 'next/link'
import { Box, Link } from '@chakra-ui/react'
import { Table, Tr, Th, Td } from './Table'
import { parseISO, format } from 'date-fns'

const SiteTable = ({ sites }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map(site => (
          <Box as="tr" key={site.link}>
            <Td fontWeight="medium">{site.name}</Td>
            <Td>{site.link}</Td>
            <Td>
              <NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref>
                <Link color="blue.500" fontWeight="bold">
                  View Feedback
                </Link>
              </NextLink>
            </Td>
            <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  )
}

export default SiteTable
