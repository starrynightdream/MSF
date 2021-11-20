// util.js
// 工具方法的集合

const path = {
    CHAR_FORWORD_SLASH: 47, // '/'
    CHAR_BACKWORD_SLASH: 92, // '\'
    CHAR_DOT: 46, // '.'
    allSlashCheck(code) {
        return code === path.CHAR_FORWORD_SLASH || code === path.CHAR_BACKWORD_SLASH;
    },
    normal(url) {
        if (url.length === 0) {
            return '.';
        }
        let isAbsolute = url.charCodeAt(0) === path.CHAR_FORWORD_SLASH;
        let endWithSeparator = url.charCodeAt(url.length - 1) === path.CHAR_FORWORD_SLASH;

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
    normalString(url, allowAbsolute) {
        // todo: finish the string computed
        let ans = '';
        let code; // char code
        let dots = 0; // num of dot
        let lastSlash = -1; // lastest '/'
        let lastSeqlength = 0; // len of lastest path
        for (let idx = 0; idx <= url.length; ++idx) {
            // check code
            if (idx < url.length) {
                code = url.charCodeAt(idx);
            } else if (code === path.CHAR_FORWORD_SLASH) {
                break;
            } else { // more once at end
                code = path.CHAR_FORWORD_SLASH;
            }
            // computed
            if (code === path.CHAR_FORWORD_SLASH) {
                // '/'
                if (idx - 1 === lastSlash || dots === 1) {
                    // NOOP
                } else if (idx - 1 !== lastSlash && dots === 2) {
                    // forword
                    if (ans.length < 2 || lastSeqlength !== 2
                        || ans.charCodeAt(ans.length - 1) != path.CHAR_DOT
                        || ans.charCodeAt(ans.length - 2) != path.CHAR_DOT) {
                        
                        if (ans.length > 2) {
                            // if end with '/'. is absolute
                            if (ans.charCodeAt(ans.length - 1) !== path.CHAR_FORWORD_SLASH) {
                                let lastSlashOnAns = ans.lastIndexOf('/');
                                if (lastSlashOnAns === -1) {
                                    ans = '';
                                    lastSeqlength = 0;
                                } else {
                                    ans = ans.slice(0, lastSlashOnAns);
                                    lastSeqlength = ans.length - ans.lastIndexOf('/') - 1;
                                }
                                lastSlash = idx;
                                dots = 0;
                                continue;
                            }
                        } else if (ans.length != 0) {
                            ans = '';
                            lastSeqlength = 0;
                            lastSlash = idx;
                            dots = 0;
                            continue;
                        }
                    }
                    // if not fix
                    if (allowAbsolute) {
                        // the url not from root
                        if (ans.length === 0) {
                            ans = '..';
                        } else {
                            ans += '/..';
                        }
                        lastSeqlength = 2;
                    }
                } else {
                    // link ans
                    if (ans.length === 0){
                        ans = url.slice(lastSlash + 1, idx);
                    } else {
                        ans += '/' + url.slice(lastSlash + 1, idx);
                    }
                    lastSeqlength = idx - lastSlash - 1;
                }
                lastSlash = idx;
                dots = 0;
            } else if (code === path.CHAR_DOT && dots !== -1) {
                ++dots;
            } else {
                dots = -1;
            }
        }
        return ans;
    },
    join(...paths) {

        if (paths.length === 0) {
            return '.';
        }
        let slash = paths[0].indexOf('/') === -1 ? '\\' : '/';
        let joined = undefined;
        for (let _path of paths) {

            if (_path.length !== 0) {

                if (!joined) {
                    joined = _path;
                } else {
                    joined += slash + _path;
                }
            }
        }

        if (joined.length === 0) {
            return '.'
        }

        let needReplace = true;
        let slashCount = 0;
        if (path.allSlashCheck(joined.charCodeAt(0))) {
            slashCount++;
            if (joined.length > 1 && path.allSlashCheck(joined.charCodeAt(1))) {
                slashCount++;
                if (joined.length > 2 && path.allSlashCheck(joined.charCodeAt(2))) {
                    slashCount++;
                } else { // unc path like \\servername\path not change
                    needReplace = false;
                }
            }
        }

        if (needReplace) {
            // replace head to once slash
            for (; slashCount < joined.length; ++slashCount) {
                // search all slash
                if (!path.allSlashCheck(joined.charCodeAt(slashCount))) {
                    break;
                }
            }
            if (slashCount > 1) {
                joined = slash + joined.slice(slashCount)
            }
        }
        return path.normal(joined);
    }
}

const dom = {
    markCss: function(node, classList) {
        // just chrom now
        node.classList.add(classList);
    }, 
    unMarkCss: function(node, classList) {
        // just chrom now
        node.classList.remove(classList);
    }, 
}

export default {
    path, dom,
    whenIsType(val, type, callback, params = undefined) {
        switch (type) {
            case 'list':
            case 'array':
                if (Array.isArray(val)) {
                    callback(params);
                    return true;
                } else {
                    return false;
                }
                break;
            case 'obj':
                if (!Array.isArray(val) && typeof val == 'object') {
                    callback(params);
                    return true;
                } else {
                    return false;
                }
                break;
            default:
                if (typeof val == type) {
                    callback(params);
                    return true;
                } else {
                    return false;
                }
                break;
        }
    }
}