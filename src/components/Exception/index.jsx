/*
 * @file: /react-2022/src/components/Exception/index.jsx
 * @author: zhongweichao(zhongwei.chao@derbysoft.net)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

// styles
import styles from './style.module.less';


const typeMap = {
    403: {
        title: '403',
        desc: '403 Forbidden'
    },
    404: {
        title: '404',
        desc: '404 Not Found'
    },
    500: {
        title: '500',
        desc: '500 Internal Server Error'
    }
}

export function Exception ({type, style}) {

    const pageType = type in typeMap ? typeMap[type] : '404';
    const config = typeMap[pageType];

    return (
        <div className={styles.Exception} style={style}>
            <div className={styles.content}>
                <h1>{config.title}</h1>
                <div className={styles.desc}>{config.desc}</div>
                <div className={styles.actions}>
                    <Link to="/">
                        <Button type="primary">返回首页</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

Exception.propTypes = {
    type: PropTypes.string,
    style: PropTypes.any
};

;



