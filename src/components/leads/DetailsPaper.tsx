import { Button, Flex, Grid, Paper, Text } from '@mantine/core'
import React from 'react'

interface DetailsPaperProps {
  title: string,
  children: React.ReactNode
}

export function DetailsPaper ({ title, children }: DetailsPaperProps) {
  return (
    <Paper shadow="sm" bg='#F8F9FA' p='md' style={{ height: '100%' }}>
      <Flex justify='space-between' align='center' mb='sm'>
        <Text>{title}</Text>
        <Button variant='light' color='gray' size='xs'>Edit</Button>
      </Flex>
      <Grid gutter='md'>
        {children}
      </Grid>
    </Paper>
  )
}
