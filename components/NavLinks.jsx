import { sidebarLinks } from '@/data/data';
import Link from 'next/link';
import React from 'react';

const NavLinks = () => {
    return (
        <ul className="menu text-base-content">
             {sidebarLinks.map((link, idx) => {
                const {href, label} = link;
                return (
                    <li key={idx}>
                        <Link href={href} className='capitalize'>
                            {label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    );
};

export default NavLinks;