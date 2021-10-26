// Net.js
// 数据获取的窗口
import System from "./System.js";

export default{
    getLocal(uri, {setting}){
    },
    getNetWork(url, {setting}){
    },
    getData(url, {setting}){
    },
    info(){
        return System.G.version;
    },
    test(code) {
        switch (code) {
            case 'setting':
                return [
                    ['测试1', 'setting'],
                    ['测试2', 'context'],
                    ['测试3', 'info'],
                    ['测试4', 'home'],
                    ['测试5', 'null'],
                ]
                break;
        
            default:
                break;
        }
    }
}