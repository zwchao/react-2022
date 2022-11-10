/*
 * @file: /react-2022/src/pages/exception.jsx
 * @author: zhongweichao(zhongwei.chao@derbysoft.net)
 */
import { Exception } from '@/components/Exception';

export function Page403() {
    return (
        <div>
            <Exception type={403} />
        </div>
    );
}

export function Page404() {
    return (
        <div>
            <Exception type={404} />
        </div>
    );
}

export function Page500() {
    return (
        <div>
            <Exception type={500} />
        </div>
    );
}