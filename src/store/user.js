/**
 * @file: /react-2022/src/store/user.js
 * @author: zhongweichao(zhongwei.chao@derbysoft.net)
 */

import { atom } from "jotai";

export const userInfoAtom = atom({
    key: "useInfo",
    default: {}
});

export const userPermissionAtom = atom((get) =>{
    return get(userInfoAtom).permissions || [];
})