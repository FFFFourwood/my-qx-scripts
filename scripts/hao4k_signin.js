/**
 * @fileoverview Example to compose HTTP request
 * and handle the response.
 *
 */

const paramUrl = '?id=k_misign:sign&operation=qiandao&formhash=f0d6c6f2&format=empty'//此处填写签到按钮的链接 从？开始
const hostUrl = 'https://www.hao4k.cn/plugin.php'
const url = hostUrl + paramUrl
const method = "GET";
//填写cookie信息
const cookieInfo = 'HxHg_2132_saltkey=H5pER9GP; HxHg_2132_lastvisit=1640068930; HxHg_2132_sendmail=1; HxHg_2132_isms_login_referer=https%3A%2F%2Fwww.hao4k.cn%2Fforum-4kdianying-1.html; HxHg_2132_seccodeSG0UM=56721.fc9adb1946627f70af; HxHg_2132_sid=j0bzBd; HxHg_2132_ulastactivity=7fb6LLXJZw%2FarTDAXXZ2bRUMqAHZ33UOzLGuB3OB6T4doFVWvFrX; HxHg_2132_auth=14e98z4E%2FIi79ZLUe4T75pDS4I4CRa52kNyGlWVs0Q7ZJ2N5if7iF8y2dEMlgBoq4JqW9JOHSw1YFcFidGVN7XgqsSU; HxHg_2132_lastcheckfeed=163380%7C1640072544; HxHg_2132_lip=112.10.226.33%2C1640041201; HxHg_2132_connect_is_bind=0; HxHg_2132_st_t=163380%7C1640072544%7C44b99041817bafbeb6a4f3251e43c1ea; HxHg_2132_forum_lastvisit=D_2_1640072544; HxHg_2132_myrepeat_rr=R0; HxHg_2132_curcountl=0; HxHg_2132_lastact=1640072570%09home.php%09spacecp'
const headers = {
    'referer': 'https://www.hao4k.cn/qiandao/',
    'cookie': cookieInfo
}
const myRequest = {
    url: url,
    method: method, // Optional, default GET.
    headers: headers, // Optional.
};

$task.fetch(myRequest).then(response => {
    // response.statusCode, response.headers, response.body
    console.log(response.body);
    let tempRes = response.body
    if (tempRes.indexOf('[CDATA[]]') != -1) {
        $notify("hao4k签到提醒", "签到成功", response.body); // Success!
    } else if (tempRes.indexOf('今日已签') != -1) {
        $notify("hao4k签到提醒", "今日已签", response.body); // Success!
    } else {
        $notify("hao4k签到失败", "请检查cookie以及参数", response.body); // Success! 
    }
    $done();
}, reason => {
    // reason.error
    $notify("hao4k签到提醒", "请求失败", reason.error); // Error!
    $done();
});
