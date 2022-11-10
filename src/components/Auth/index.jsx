/*
 * @file: /react-2022/src/components/Auth/index.jsx
 * @author: zhongweichao(zhongwei.chao@derbysoft.net)
 */

import { useAtomValue } from 'jotai';
import { userPermissionAtom } from '@/store/user';


// 用于判断当前用户是否拥有指定的单个权限或拥有指定权限集合中的某个权限
export function useHasPermission() {

    const permissions = useAtomValue(userPermissionAtom);

    return (auth) => {
        if(!auth) {
            return true;
        }
        if(typeof auth === 'string') {
            return permissions.includes(auth);
        }

        return !!auth.find(item => permissions.includes(item));
    }
}

// 根据是否有权限渲染不同的组件

export function RenderByAuth(props) {
    const hasPermission = useHasPermission();
    return <>
        {
            hasPermission(props.auth) ? props.children : props.fallback
        }
    </>
}