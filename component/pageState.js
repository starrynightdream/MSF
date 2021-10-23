// pageState.js
// 确定各类页面转换时进行何种变化

export default {
    states: {
        'defaultHome': {
            class: 'homePage', // 为页面添加的类名
            state: {} // 数值的变化
        },
        'setting': {

        },
        'info': {

        },
        'context': {

        }
    },
    get pages() {
        return Object.keys(this.states).filter(item => {
            return !this.states[item].hidden;
        });
    }
}