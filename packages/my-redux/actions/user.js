function setName() {
    return {
        type: 'CHANGE_NAME',
        name: '张三'
    }
}

function setAge() {
    return {
        type: 'CHANGE_AGE',
        name: '李四'
    }
}

export { setName, setAge }