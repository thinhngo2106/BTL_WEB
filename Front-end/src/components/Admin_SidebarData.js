import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Orders Manage',
        path: '/orders/ordersManage',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Delete Orders',
        path: '/reports/deleteOrders',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Products',
    path: '/products',
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Products Manage',
        path: '/products/productsManage',
        icon: <FaIcons.FaCartPlus />,
        cName: 'sub-nav'
      },
      {
        title: 'Add Products',
        path: '/products/addProducts',
        icon: <FaIcons.FaCartPlus />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Users Manage',
    path: '/usersManage',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Products Type',
    path: '/productsType',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Brands Manage',
    path: '/brandsManage',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];