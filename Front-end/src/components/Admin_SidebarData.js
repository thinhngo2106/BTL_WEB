import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Trang chủ',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    
    title: 'Quản lý đơn hàng',
    path: '/ordersManage',
    icon: <IoIcons.IoIosPaper />,
    cName: 'sub-nav'
  },
  {
    title: 'Sản phẩm',
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Quản lý sản phẩm',
        path: '/products/productsManage',
        icon: <FaIcons.FaCartPlus />,
        cName: 'sub-nav'
      },
      {
        title: 'Thêm sản phẩm',
        path: '/products/addProducts',
        icon: <FaIcons.FaCartPlus />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Quản lý người dùng',
    path: '/usersManage',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Phân loại sản phẩm',
    path: '/productsType',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Quản lý nhãn hàng',
    path: '/brandsManage',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];