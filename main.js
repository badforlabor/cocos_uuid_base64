/**
 * Auth :   liubo
 * Date :   2018/09/21 15:13
 * Comment: cocos的uuid与base64互转（基于cocos creator 1.9版本）
 */


var HexChars = '0123456789abcdef'.split('');
var Base64KeyChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// 16进制转10进制
function hexdec(hex) {
    var ret = parseInt(hex, 16)
    return ret
}
function getidx(c) {
    for (var i = 0; i < Base64KeyChars.length; i++) {
        if (Base64KeyChars[i] == c) {
            return i
        }
    }
    throw '无法找到字符：' + c
}

function uuid2base(uuid) {

    if (uuid.length != 36) {
        throw '非法的uuid'
    }

    var uuid = uuid.split('-').join('')

    var ret = []
    ret[0] = uuid[0]
    ret[1] = uuid[1]
    ret[2] = uuid[2]
    ret[3] = uuid[3]
    ret[4] = uuid[4]

    var length = uuid.length;
    var i = 5;
    var zi = ret.join('')
    while (i < length) {
        var hexVal1 = hexdec(uuid[i])
        var hexVal2 = hexdec(uuid[i + 1])
        var hexVal3 = hexdec(uuid[i + 2])
        zi += Base64KeyChars[(hexVal1 << 2) | (hexVal2 >> 2)]
        zi += Base64KeyChars[((hexVal2 & 3) << 4) | hexVal3]

        i += 3
    }

    return zi
}
function base64uuid(base64) {

    if (base64.length != 23) {
        throw '非法的base64'
    }

    var ret = []
    ret[0] = base64[0]
    ret[1] = base64[1]
    ret[2] = base64[2]
    ret[3] = base64[3]
    ret[4] = base64[4]

    var zi = ret.join('')

    var i = 5
    while (i < base64.length - 1) {
        var a = getidx(base64[i])
        var b = getidx(base64[i + 1])
        var x = HexChars[a >> 2]
        var y = HexChars[((a & 3) << 2) | b >> 4]
        var z = HexChars[b & 0xF]
        // console.log(a, b)
        i += 2

        zi += x;
        zi += y;
        zi += z;
    }

    // 转化完uuid之后，在合适的位置加上 '-'
    zi = zi.split('')
    zi.splice(8, 0, '-')
    zi.splice(13, 0, '-')
    zi.splice(18, 0, '-')
    zi.splice(23, 0, '-')

    return zi.join('')
}

var test = 'b13532e6-462e-49ec-a613-6e79553d7a2d'
console.log('test:', test)
console.log('=>base64:', uuid2base(test))
console.log('=>uuid:', base64uuid('b1353LmRi5J7KYTbnlVPXot'))








