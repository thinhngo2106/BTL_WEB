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
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Quản lý loại hàng',
        path: '/productsType/productsTypeManage',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'sub-nav'
      },
      {
        title: 'Thêm loại hàng',
        path: '/productsType/addProductsType',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Nhãn hàng',
    path: '/brands',
    icon: <IoIcons.IoMdHelpCircle />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Quản lý nhãn hàng',
        path: '/brands/brandsManage',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'sub-nav'
      },
      {
        title: 'Thêm nhãn hàng',
        path: '/brands/addBrands',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'sub-nav'
      }
    ]
  }
];