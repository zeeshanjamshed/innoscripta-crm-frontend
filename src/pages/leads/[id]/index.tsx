import { Button, Flex, Grid, Group, Paper, Select, Stack, Stepper, StepperProps, Text, rem } from '@mantine/core'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import leads from '../leads.json';
import { getName } from '@/utils/leadsUtil';
import { IconChevronRight } from '@tabler/icons-react';
import { DetailsPaper } from '@/components/leads/DetailsPaper';

function StyledStepper (props: StepperProps) {
  return (
    <Stepper
      styles={{
        stepBody: {
          display: 'none',
        },

        step: {
          padding: 0,
        },

        stepIcon: {
          borderWidth: rem(4),
        },

        separator: {
          marginLeft: rem(-2),
          marginRight: rem(-2),
          height: rem(10),
        },
      }}
      {...props}
    />
  );
}

function LeadDetails () {
  const router = useRouter();
  const [active, setActive] = useState(1);

  const lead = leads.find(lead => typeof router.query.id === 'string' && lead.id.toString() === router.query.id);
  if (!lead) return null;

  return (
    <Flex direction='column'>
      <Flex align='center' gap='md'>
        <Text>Lead Inbox</Text>
        <IconChevronRight size='1rem' />
        <Text weight='bold'>{getName(lead, false)}</Text>
      </Flex>
      <Paper shadow="sm" p="md" mt='md'>
        <Flex justify='space-between' align='center' pb='lg'>
          <Text size='xl'>{getName(lead, false)}</Text>
          <Button variant='outline' color='gray' size='xs'>Edit</Button>
        </Flex>
        <Grid gutter='md'>
          <Grid.Col span={4}>
            <DetailsPaper title='Professional Information'>
              <Grid.Col span={6}>
                <Text size='xs' color='gray'>Company</Text>
                <Text size='xs'>{lead.company}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size='xs' color='gray'>Title</Text>
                <Text size='xs'>{lead.job_title}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size='xs' color='gray'>Industry</Text>
                <Text size='xs'>{lead.insurance}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size='xs' color='gray'>Annual Revenue</Text>
                <Text size='xs'>{lead.annual_revenue}</Text>
              </Grid.Col>
            </DetailsPaper>
          </Grid.Col>

          <Grid.Col span={4}>
            <DetailsPaper title='Contact Information'>
              <Grid.Col span={6}>
                <Text size='xs' color='gray'>Phone</Text>
                <Text size='xs'>{lead.phone}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size='xs' color='gray'>Email</Text>
                <Text size='xs'>{lead.email}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size='xs' color='gray'>Address</Text>
                <Text size='xs'>{lead.street_address}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size='xs' color='gray'>Website</Text>
                <Text size='xs'>{lead.website}</Text>
              </Grid.Col>
            </DetailsPaper>
          </Grid.Col>

          <Grid.Col span={4}>
            <DetailsPaper title='Ownership'>
              <Grid.Col span={6}>
                <Text size='xs' color='gray'>Lead Owners</Text>
                <Text size='xs'>{lead.user.name}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size='xs' color='gray'>Lead Source</Text>
                <Text size='xs'>{lead.source}</Text>
              </Grid.Col>
            </DetailsPaper>
          </Grid.Col>

          <Grid.Col span={8}>
            <DetailsPaper title='Description'>
              <Grid.Col span={6}>
                <Text size='xs'>{lead.description}</Text>
              </Grid.Col>
            </DetailsPaper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Flex align='flex-end' justify='flex-end' style={{ height: '100%' }}><Button variant='outline' color='gray'>See more</Button></Flex>
          </Grid.Col>
        </Grid>
      </Paper>

      <Paper shadow="sm" p="md" mt='md'>
        <Flex justify='space-between' align='center' pb='lg'>
          <Stack spacing='xs'>
            <Text>Lead Status</Text>
            <Text size='xs'>Start Date: {lead.created_at}</Text>
          </Stack>
          <Flex gap='md'>
            <Select
              size='sm'
              label="Lead Pipeline"
              placeholder="Select"
              data={[]}
            />
            <Select
              size='sm'
              label="Lead Rating"
              placeholder="Select"
              data={[]}
            />
          </Flex>
        </Flex>
        <StyledStepper active={active} onStepClick={setActive}>
          <Stepper.Step label="Step 1" description="Create an account" />
          <Stepper.Step label="Step 2" description="Verify email" />
          <Stepper.Step label="Step 3" description="Get full access" />
        </StyledStepper>
      </Paper>
    </Flex >
  )
}

export default LeadDetails
