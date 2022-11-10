/*
 * @file: /react-2022/src/layouts/AppLayout/layout.jsx
 * @author: zhongweichao(zhongwei.chao@derbysoft.net)
 */

import { createElement, useState } from 'react';
import PropTypes from 'prop-types';

import {  Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { MenuList } from '@/components/MenuList';
import { RouteTree } from '@/components/RouteUtils';
import { Page500 } from '@/pages/exception';

import { menuList } from '../config.menu';
import { routeList } from '../config.routes';

const { Header, Content, Sider} = Layout;

import styles from './style.module.less';

const AppLayout = props => {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className={styles.appMainLayout}>
            <Fragment>
                <Header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div className={styles.logo}>
                            <Link to="/" style={{ cursor: 'pointer' }}>
                                Test
                            </Link>
                        </div>
                    </div>
                    <div className={styles.headerRight}>
                        Right
                    </div>
                </Header>
                <Layout className={styles.content}>
                    <Sider
                        width={256}
                        collapsedWidth={46}
                        trigger={null}
                        collapsible
                        collapsed={collapsed}>
                        <MenuList
                            mode="inline"
                            style={{ height: '100%', borderRight: 0, paddingBottom: 50 }}
                            list={menuList}
                            menuPosition="side"
                            inlineIndent={16}
                            className={styles.menus}
                            />
                        <div className={styles.trigger}>
                            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                onClick: () => setCollapsed((v) => !v),
                            })}
                        </div>
                    </Sider>

                    <ErrorBoundary fallback={<Page500 />}>
                        <Content>
                            <RouteTree data={routeList} />
                        </Content>
                    </ErrorBoundary>
                </Layout>
            </Fragment>
        </Layout>
    );
};

AppLayout.propTypes = {
    
};

export default AppLayout;