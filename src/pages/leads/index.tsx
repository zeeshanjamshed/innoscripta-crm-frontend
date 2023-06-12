import { Accordion, Badge, Button, Checkbox, Divider, Flex, Grid, Group, Input, Menu, Modal, Pagination, Paper, SegmentedControl, Select, Table, Text, TextInput, Textarea } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import leads from './leads.json';
import React, { useState } from 'react'
import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import { getName } from '@/utils/leadsUtil';

export default function Leads () {
  const [selected, setSelected] = useState<number[]>([]);
  const [opened, { open, close }] = useDisclosure(false);

  const getRating = (rating: number) => {
    switch (rating) {
      case 1: return { color: "blue", value: "Cold" };
      case 2: return { color: "yellow", value: "Warm" };
      case 3: return { color: "red", value: "Hot" };
      default: return null;
    }
  }

  const handleLeadSelection = (value: boolean, id: number): void => {
    setSelected((prev) => {
      if (value) {
        return [...prev, id];
      } else {
        return prev.filter(x => x !== id);
      }
    });
  }

  return (
    <Paper shadow="xs">
      <Flex align='center' justify='space-between' p="md">
        <Flex align='center' gap='lg'>
          <Text size='lg'>Lead Inbox</Text>
          <SegmentedControl
            size='xs'
            radius='lg'
            // value={'list'}
            // onChange={setValue}
            data={[
              { label: 'List', value: 'list' },
              { label: 'Kanban', value: 'kanban' }
            ]}
          />
        </Flex>
        <Flex gap='md'>
          <Button variant='outline' color='gray'>Import</Button>
          <Menu shadow='md' withArrow width={200}>
            <Menu.Target>
              <Button variant='outline' color='gray'>
                <Flex gap='md' align='center'>
                  <Text>Customize</Text>
                  <IconChevronDown size='1rem' />
                </Flex>
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Add Lead Pipeline</Menu.Item>
              <Menu.Item>Edit Stages</Menu.Item>
              <Menu.Item>Edit Field</Menu.Item>
              <Menu.Item>Create Field</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Flex>
      <Divider />
      <Flex p="md" direction='column'>
        <Flex justify='space-between' pb='md'>
          <Button radius='md' onClick={open}>Create Lead</Button>
          <Flex gap='md'>
            <Button variant='outline' color='gray' radius='md'>Edit</Button>
            <Button color='red' radius='md'>Delete</Button>
          </Flex>
        </Flex>
        <Table verticalSpacing="md">
          <thead>
            <tr>
              <th></th>
              <th>Lead name</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Owner</th>
              <th>Lead Pipeline</th>
              <th>Status</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td><Checkbox checked={selected.includes(lead.id)} onChange={(e) => handleLeadSelection(e.target.checked, lead.id)} /></td>
                  <td><Link href={`/leads/${lead.id}`}><Text weight='500'>{getName(lead)}</Text></Link></td>
                  <td>{lead.company}</td>
                  <td>{lead.phone}</td>
                  <td><Badge color='gray'>{lead.user.name}</Badge></td>
                  <td>{lead.pipeline.name}</td>
                  <td>{lead.status}</td>
                  <td><Badge color={getRating(lead.rating)?.color}>{getRating(lead.rating)?.value}</Badge></td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={8}>
                <Divider />
                <Flex justify='flex-end' pt='md'>
                  <Pagination total={10} />
                </Flex>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Flex>
      <Modal opened={opened} onClose={close} title="Create a new lead" centered size="50%">
        <Text size='xs' pb='xs'>Enter details about the lead below</Text>
        <Divider />
        <Accordion defaultValue="personal_info">
          <Accordion.Item value="personal_info">
            <Accordion.Control style={{ border: '0' }} px='0'>Personal Information</Accordion.Control>
            <Accordion.Panel>
              <Grid gutter="md">
                <Grid.Col span={3}>
                  <TextInput label="Salutation" required placeholder="Ms." />
                </Grid.Col>
              </Grid>
              <Grid gutter="md">
                <Grid.Col span={6}>
                  <TextInput label="First Name" required placeholder="Emily" />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput label="Last Name" required placeholder="Smith" />
                </Grid.Col>
              </Grid>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item style={{ borderBottom: '0' }} value="professional_info">
            <Accordion.Control px='0'>Professional Information</Accordion.Control>
            <Accordion.Panel>
              <Flex gap='md' direction='column'>
                <TextInput label="Job title" placeholder="i.e Purchasing Director" />
                <TextInput label="Industry" placeholder="i.e Telecommunications" />
                <TextInput label="Company" required placeholder="i.e United Partners Inc." />
              </Flex>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item style={{ borderBottom: '0' }} value="contact_details">
            <Accordion.Control px='0'>Contact Details</Accordion.Control>
            <Accordion.Panel>
              <Grid gutter="md">
                <Grid.Col span={6}>
                  <TextInput label="Email address" required placeholder="i.e emily@hello.com" />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput label="Phone number" required placeholder="i.e +1 (111) 111-1111" />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput label="Website" placeholder="i.e https://www.hello.com" />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput label="Website" placeholder="i.e https://www.hello.com" />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput label="City" placeholder="i.e Chicago" />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Select
                    label="State/Province"
                    placeholder="Select"
                    data={[
                      { value: 'Punjab', label: 'Punjab' },
                    ]}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput label="Postal Code" placeholder="i.e 12345-6789" />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Select
                    label="Country"
                    placeholder="Select"
                    data={[
                      { value: 'PK', label: 'Pakistan' },
                    ]}
                  />
                </Grid.Col>
              </Grid>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item style={{ borderBottom: '0' }} value="lead_status">
            <Accordion.Control px='0'>Lead status</Accordion.Control>
            <Accordion.Panel>
              <Grid gutter="md">
                <Grid.Col span={5}>
                  <Select
                    required
                    label="Rating"
                    placeholder="Hot, Warm, Cold"
                    data={[
                      { value: '1', label: 'Cold' },
                      { value: '2', label: 'Warm' },
                      { value: '3', label: 'Hot' },
                    ]}
                  />
                </Grid.Col>
                <Grid.Col span={5}>
                  <Select
                    required
                    label="Lead status"
                    placeholder="i.e New"
                    data={[
                      { value: '1', label: 'New' }
                    ]}
                  />
                </Grid.Col>
                <Grid.Col span={2}>
                  <Text align='right' size='sm' mt='30px'>Add status</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                  <Select
                    required
                    label="Lead pipeline"
                    placeholder="i.e Standard"
                    data={[]}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text align='right' size='sm' mt='30px'>Add pipeline</Text>
                </Grid.Col>

                <Grid.Col span={8}>
                  <Select
                    required
                    label="Loss reason"
                    placeholder="i.e Stale lead"
                    data={[]}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text align='right' size='sm' mt='30px'>Add reason</Text>
                </Grid.Col>
              </Grid>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item style={{ borderBottom: '0' }} value="lead_ownership">
            <Accordion.Control px='0'>Lead ownership</Accordion.Control>
            <Accordion.Panel>
              <Grid gutter="md">
                <Grid.Col span={8}>
                  <Select
                    label="Lead Owner"
                    placeholder="Select a user"
                    data={[]}
                  />
                </Grid.Col>
                <Grid.Col span={8}>
                  <Select
                    label="Lead Source"
                    placeholder="Select a source"
                    data={[]}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text align='right' size='sm' mt='30px'>Add source</Text>
                </Grid.Col>
              </Grid>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item style={{ borderBottom: '0' }} value="description">
            <Accordion.Control px='0'>Description</Accordion.Control>
            <Accordion.Panel>
              <Textarea
                placeholder="Enter details about the lead here"
                withAsterisk
              />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <Divider />
        <Flex justify='space-between' pt='md'>
          <Button radius='md' color='gray' variant='outline'>Create field</Button>
          <Button radius='md'>Save lead</Button>
        </Flex>
      </Modal>
    </Paper>
  )
}
