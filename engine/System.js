// System.js
// 系统功能

// 全局函数
const G = {
    version: "1.0",
};

// 总理页面变化的数据结构
let _idx = 0;
let _pageArr = [];
const _pageChange = {
    _coverO = {},
    _nodeArr = [],
    getVal(key){},
    setVal(key, value){},
}

function toPage(pid) {
    if (_idx < _pageArr.length){
        _pageArr.splice(_idx+1);
    }
    _pageArr.push({
        pid
    })

}

export default {
    history(idx = 0) {
        // 导航页面
    },
    toPage,
    G
}