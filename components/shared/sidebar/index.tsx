import { cn } from '@/lib/utils';
import { HomeIcon, SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import SidebarLink from './sidebar-link';

const SIDEBAR_MENUS = [
  { title: "home", path: "/dashboard", active: true, icon: HomeIcon },
  { title: "settings", path: "/settings", active: true, icon: SettingsIcon },
]

export default function Sidebar() {
  return (
    <aside className='w-[70px] shadow-md h-screen'>
      <Link href="/" className="font-semibold text-xl uppercase tracking-tighter w-full h-14 flex items-center justify-center">Logo</Link>

      <ul className='list-none p-0 m-0 flex flex-col gap-5 py-5'>
        {SIDEBAR_MENUS.map(({icon: Icon, ...item}) => (
          <li key={item.title} className='w-full h-10 flex items-center justify-center'>
            <SidebarLink
              path={item.path}
            >
              <Icon className='size-7' />
            </SidebarLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}