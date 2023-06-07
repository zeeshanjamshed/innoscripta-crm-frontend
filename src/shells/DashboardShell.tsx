import {
  AppShell,
  Avatar,
  Burger,
  Flex,
  Group,
  Header,
  MediaQuery,
  Menu,
  Navbar,
  ScrollArea,
  Text,
  TextInput,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme
} from '@mantine/core';
import {
  IconChevronDown,
  IconDashboard,
  IconInbox,
  IconLogout,
  IconSearch,
  IconSettings,
  IconUser
} from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

const LINKS = [
  { id: 1, label: 'Home', href: '/', icon: <IconDashboard color='black' size='1rem' /> },
  { id: 2, label: 'Leads', href: '/leads', icon: <IconInbox color='black' size='1rem' /> },
  { id: 3, label: 'Accounts', href: '/accounts', icon: <IconDashboard color='black' size='1rem' /> },
  { id: 4, label: 'Contacts', href: '/contacts', icon: <IconDashboard color='black' size='1rem' /> },
  { id: 5, label: 'Opportunities', href: '/opportunities', icon: <IconDashboard color='black' size='1rem' /> },
  { id: 6, label: 'Cases', href: '/cases', icon: <IconDashboard color='black' size='1rem' /> },
  { id: 7, label: 'Reports', href: '/reports', icon: <IconDashboard color='black' size='1rem' /> },
  { id: 7, label: 'Analytics', href: '/analytics', icon: <IconDashboard color='black' size='1rem' /> },
  { id: 8, label: 'User Management', href: '/user-management', icon: <IconDashboard color='black' size='1rem' /> }
];

export function DashboardShell ({ children }: { children: ReactNode }) {
  const theme = useMantineTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint='md'
      navbar={isOpen ? <MobileNavigation /> : undefined}
      header={<HeaderComponent isOpen={isOpen} setIsOpen={setIsOpen} />}
    >
      {children}
    </AppShell>
  )
}

function MobileNavigation () {
  return (
    <Navbar p='md' width={{ sm: 300 }}>
      <Navbar.Section>
        <TextInput placeholder="Search" icon={<IconSearch size="0.8rem" />} />
      </Navbar.Section>
      <Navbar.Section grow my='xs' component={ScrollArea}>
        {
          LINKS.map((link) => (
            <MainLink key={link.id} {...link} hasIcon />
          ))
        }
      </Navbar.Section>
    </Navbar>
  )
}

function HeaderComponent ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>>; }) {
  const theme = useMantineTheme();

  return (
    <Header height={{ base: 55, md: 65 }} p='sm'>
      <Flex align='center' justify='space-between'>
        <Group>
          <Image
            src='/logo.svg'
            alt='Logo'
            width={32}
            height={32}
            priority
          />
          <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
            <Flex>
              {
                LINKS.map((link) => (
                  <MainLink key={link.id} {...link} />
                ))
              }
            </Flex>
          </MediaQuery>
        </Group>
        <Group>
          <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
            <Menu shadow='md' withArrow width={200}>
              <Menu.Target>
                <UnstyledButton>
                  <Group>
                    <Avatar
                      src="./avatar.png"
                      radius="xl"
                    />
                    <Text>George</Text>
                    <IconChevronDown color='black' size='1rem' />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item icon={<IconSettings size='1rem' />}>Settings</Menu.Item>
                <Menu.Divider />
                <Menu.Label>User</Menu.Label>
                <Menu.Item icon={<IconUser size='1rem' />}>Profile</Menu.Item>
                <Menu.Item color='red' icon={<IconLogout size='1rem' />}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </MediaQuery>
          <MediaQuery largerThan='md' styles={{ display: 'none' }}>
            <Burger
              opened={isOpen}
              onClick={() => setIsOpen((o) => !o)}
              size='sm'
              color={theme.colors.gray[6]}
            />
          </MediaQuery>
        </Group>
      </Flex>
    </Header>
  )
}

function MainLink ({ hasIcon = false, label, href, icon }: { id: number; hasIcon?: boolean; label: string, href: string; icon: React.ReactNode }) {
  const router = useRouter();

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        fontSize: theme.fontSizes.sm,
        color: router.asPath === href ? theme.colors.brand : theme.black,
        '&:hover': {
          backgroundColor:
            theme.colors.gray[0],
        },
      })}
      onClick={() => router.push(href)}
    >
      <Group>
        {
          hasIcon && <ThemeIcon variant='light'>{icon}</ThemeIcon>
        }
        <Text size='sm'>{label}</Text>
      </Group>
    </UnstyledButton>
  )
}
