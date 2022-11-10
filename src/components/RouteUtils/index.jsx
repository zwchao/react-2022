/*
 * @file: /react-2022/src/components/RouteUtils/index.jsx
 * @author: zhongweichao(zhongwei.chao@derbysoft.net)
 */

import { Spin } from 'antd';
import { Suspense, useLayoutEffect } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';

import { RenderByAuth } from '@/components/Auth';
import { Page403 } from '@/pages/exception';


/**
 * 用单独的组件容纳 useRoutes 返回的内容。因为 useRoutes 会随着路由的变动而触发
 * 当前组件重新渲染，这样做可以最小化减少重新渲染的内容。
 */
export function RouteTree({data}) {
    return useRoutes(data)
}

// 监听处理路由变化，执行相应操作
export function RouteListener({onChange}) {

    const location = useLocation();
    useLayoutEffect(() => {
        if (onChange) onChange();
    }, [location, onChange]);
    return <></>;
}

// 路由懒加载
export function LazyRoute(props) {

    const { auth, lazy: LazyComponent } = props;

    return (
        <Suspense
            fallback={
                <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Spin spinning />
                </div>
            }>
            <RenderByAuth auth={auth} fallback={<Page403 />}>
                <LazyComponent />
            </RenderByAuth>
        </Suspense>
    )
}


// 重定向
export const navigateTo = (path, replace=true) => {
    return <Navigate to={path} replace={replace} />
}

// 封装返回懒加载组件
export const lazyWithAuth = (lazy, auth) => (
    <LazyRoute lazy={lazy} auth={auth} />
)
