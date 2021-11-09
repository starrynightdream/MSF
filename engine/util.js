// util.js
// 工具方法的集合

const path = {
    CHAR_FORWORD_SLASH : 47, // /
    CHAR_BACKWORD_SLASH : 92,// \
    CHAR_DOT : 46, // .
    allSlashCheck(code){
        return code === path.CHAR_FORWORD_SLASH || code === path.CHAR_BACKWORD_SLASH;
    },
    normal(url){
        if (url.length === 0){
            return '.';
        }
        let isAbsolute = url.charCodeAt(0) === path.CHAR_FORWORD_SLASH;
        let endWithSeparator = url.charCodeAt( url.length - 1) === path.CHAR_FORWORD_SLASH;

        let _url = this.normalString(url, !isAbsolute);
        if (_url.length === 0 && !isAbsolute) {
            _url = '.';
        } 
        if (_url.length > 0 && endWithSeparator) {
            _url += '/';
        } 
        if (isAbsolute) {
            _url = '/' + _url;
        }
        return _url;
    },
    normalString(url, allowAbsolute){
        // todo: finish the string computed
    },
    join(...paths){
        if (paths.length === 0){
            return '.';
        }
        let slash = paths.indexOf('/') === -1? '\\': '/';
        let firstPath = undefined;
        let joined = undefined;
        for (let _path of paths) {

            if (_path.length !== 0){

                if (joined) {
                    joined = firstPath = _path;
                } else {
                    joined += slash + _path;
                }
            }
        }

        if (joined.length === 0){
            return '.'
        }

        let needReplace = true;
        let slashCount = 0;
        if (path.allSlashCheck( joined.charCodeAt(0))) {
            slashCount++;
            if (joined.length > 1 && path.allSlashCheck( joined.charCodeAt(1))) {
                slashCount++;
                if (joined.length > 2 && path.allSlashCheck( joined.charCodeAt(1))) {
                    slashCount++;
                } else { // unc path like \\servername\path not change
                    needReplace = false;
                }
            }
        }

        if (needReplace){
            // replace head to once slash
            for (;slashCount < joined.length; ++slashCount){
                // search all slash
                if (!path.allSlashCheck(joined.charCodeAt(slashCount))){
                    break;
                }
            }
            if (slashCount > 1){
                joined = slash + joined.split(slashCount)
            }
        }
        return path.normal(joined);
    }
}

export default {
path,
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