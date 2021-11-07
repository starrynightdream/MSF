// util.js
// 工具方法的集合

export default {
whenIsType (val, type, callback) {
    switch (type) {
        case 'list':
        case 'array':
            if (Array.isArray(val)){
                callback();
                return true;
            } else {
                return false;
            }
            break;
        case 'obj':
            if (!Array.isArray(val) && typeof val == 'object'){
                callback();
                return true;
            } else {
                return false;
            }
            break;
        default:
            if (typeof val == type){
                callback();
                return true;
            } else {
                return false;
            }
            break;
    }
}
}