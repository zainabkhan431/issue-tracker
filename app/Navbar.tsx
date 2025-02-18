'use client';
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';

const Navbar = () => {
    const currentPath=usePathname();
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issue', href: '/issue' },
    ];

    return (
        <nav className='flex space-x-8 mb-2 pl-2 border-b-2 h-20 items-center text-xl'>
            <Link href="/"><FaBug /></Link>
            <ul className='flex space-x-6'>
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            className={classnames({
                                'text-zinc-900': link.href=== currentPath,
                                'text-zinc-500': link.href !==currentPath,
                                 'hover:text-zinc-900 transition-colors': true
                            })}
                            
                            href={link.href}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
