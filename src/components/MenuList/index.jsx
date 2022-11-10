/*
 * @file: /react-2022/src/components/MenuList/index.jsx
 * @author: zhongweichao(zhongwei.chao@derbysoft.net)
 */
import { Menu } from 'antd';
import { useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useHasPermission } from '@/components/Auth';

import styles from './style.module.less';


export function MenuList(props) {
  const { className, list, menuPosition, ...restProps } = props;

  const location = useLocation();
  const hasPermission = useHasPermission();
  const [innerOpenKeys, setInnerOpenKeys] = useState([]);
  const [innerSelectedKeys, setInnerSelectedKeys] = useState([]);
  const keyRef = useRef();
  keyRef.current = { innerOpenKeys, innerSelectedKeys };

  // 根据路由动态设置菜单的打开与选中
  useLayoutEffect(() => {
    let shouldOpenKeys = [];
    let shouldSelectedKeys = [];

    list.forEach((el) => {
      if (menuPosition === 'top' && el.link && location.pathname.startsWith(el.link)) {
        shouldSelectedKeys = [el.key || el.label];
      } else if (
        el.link === location.pathname ||
        (el.link && location.pathname.startsWith(el.link))
      ) {
        shouldSelectedKeys = [el.key || el.label];
      }

      (el.children || []).forEach((el2) => {
        if (el2.link && location.pathname.startsWith(el2.link)) {
          shouldOpenKeys = [el.key || el.label];
          shouldSelectedKeys = [el2.key || el2.label];
        }
      });
    });

    if (
      shouldOpenKeys.join(',') !== keyRef.current.innerOpenKeys.join(',') ||
      shouldSelectedKeys.join(',') !== keyRef.current.innerSelectedKeys.join(',')
    ) {
      setInnerOpenKeys(shouldOpenKeys);
      setInnerSelectedKeys(shouldSelectedKeys);
    }
  }, [list, location.pathname, menuPosition]);

  const items = list
    .filter((menu) => {
      if (!menu.children) return hasPermission(menu.auth);
      return menu.children.filter((el) => hasPermission(el.auth)).length !== 0;
    })
    .map((menu) => {
      const children = menu.children || [];
      if (children.length === 0) {
        return {
          key: menu.key || menu.label,
          label: (
            <Link title={menu.label} to={menu.link}>
              <span data-menukey={menu.key || menu.label}>{menu.label}</span>
            </Link>
          ),
        };
      } else {
        return {
          key: menu.key || menu.label,
          label: (
            <span>
              <span>{menu.label}</span>
            </span>
          ),
          children: children
            .filter((child) => hasPermission(child.auth))
            .map((child) => {
              return {
                key: child.key || child.label,
                label: (
                  <Link to={child.link } data-menukey={child.key || child.label}>
                    {child.label}
                  </Link>
                ),
              };
            }),
        };
      }
    });

  return (
    <Menu
        {...restProps}
        className={styles.menuList}
        openKeys={innerOpenKeys}
        selectedKeys={innerSelectedKeys}
        onOpenChange={(keys) => setInnerOpenKeys(keys)}
        onSelect={({ selectedKeys }) => setInnerSelectedKeys(selectedKeys)}
        items={items}
    />
  );
}