/*
 * @file: /react-2022/src/components/ErrorBoundary/index.jsx
 * @author: zhongweichao(zhongwei.chao@derbysoft.net)
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { WarningOutlined } from '@ant-design/icons';


// styles
import styles from './style.module.less';


export class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }
    
    componentDidCatch(error, errorInfo) {
        // 打印错误信息
        // 或者将错误日志上报给服务器
        console.log(error, errorInfo);
    }
    render() {
        const { children, fallback } = this.props;
        const { hasError } = this.state;

        if(!hasError) {
            return children;
        }
    
        return fallback ? 
            (fallback) 
            :
            (
                <div className={styles.errorBoundary}>
                    <WarningOutlined className={styles.errorIcon} />
                    <div>加载出错,请刷新页面</div>
                </div>
            );
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.any,
    fallback: PropTypes.func
};