/*
 * @file: /react-2022/src/main.jsx
 * @author: zhongweichao(zhongwei.chao@derbysoft.net)
 */
import React from 'react'
import {createRoot} from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'jotai';

// Antd + Dayjs
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
dayjs.locale('en');

// styles
import 'normalize.css';
import './style.global.less';

// components
import { ErrorBoundary } from '@/components/ErrorBoundary';
import AppLayout from '@/layouts';






createRoot(document.getElementById('root')).render(
    <ConfigProvider locale={enUS}>
      <ErrorBoundary>
        <Provider>
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </ConfigProvider>,
);
