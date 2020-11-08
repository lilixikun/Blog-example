import { ELEMENT_TEXT } from './constance'

/**
 * 创建虚拟元素的方法
 * @param {*} type 
 * @param {*} config 
 * @param  {...any} children 
 */
function createElement(type, config, ...children) {
    delete config.__source;
    delete config.__self; // 表示这个元素是在哪行那个文件生成的

    return {
        type,
        props: {
            ...config,
            children: children.map(child => {
                // 做一个基本兼容处理 如果是文本就返回文本
                return typeof child === "object" ? child : {
                    type: ELEMENT_TEXT,
                    props: {
                        text: child,
                        children: []
                    }
                }
            })
        }
    }
}

const React = {
    createElement
}

export default React