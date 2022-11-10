/*
 * @file: /react-2022/src/layouts/AppLayout/index.jsx
 * @author: zhongweichao(zhongwei.chao@derbysoft.net)
 */
import React from 'react';
import { lazy, useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';

import { lazyWithAuth, navigateTo, RouteListener } from '@/components/RouteUtils';

const AppLayout = props => {

    // const isLogin = !!getAuthToken();

    return (
        <>
          {/* <RouteListener onChange={onRouteChange} /> */}
          <Routes>
                <Route
                    path="*"
                    element={lazyWithAuth(lazy(() => import('./layout')))}>
                </Route>
                {/* <Route path="/login" element={lazyWithAuth(lazy(() => import('@/pages/login')))} /> */}
          </Routes>
        </>
    );
};

AppLayout.propTypes = {
    
};

export default AppLayout;