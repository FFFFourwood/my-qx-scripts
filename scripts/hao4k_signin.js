/**
 * @fileoverview Example to compose HTTP request
 * and handle the response.
 *
 */
const paramUrl = '?mod=sign&operation=qiandao&formhash=d4908883&format=empty'//此处填写签到按钮的链接 从？开始
const hostUrl = 'https://www.4ksj.com//qiandao/'
const url = hostUrl + paramUrl
const method = "GET";
//填写cookie信息
const cookieInfo = 'HxHg_2132_saltkey=y8s4OiC8; HxHg_2132_lastvisit=1660089009; Hm_lvt_6e3c8a123748ffd4b2e81355600db0ac=1660092616; HxHg_2132_ulastactivity=2340TZQcRyuB5qKdbNKLghkqYhwem1iuc4d2ChxlTdFhJ5Pq2AEZ; HxHg_2132_auth=3c23d8EcV0KWkj6S7LOV%2BfBcVnNY0FXKLiwpmm5N%2FAEV%2BjW9zNWTm2bge7U13PU8GVc7Kk6ca3J9ukgdFOddNqAl95c; HxHg_2132_lastcheckfeed=163380%7C1660096645; HxHg_2132_curcountl=0; HxHg_2132_myrepeat_rr=R0; HxHg_2132_st_t=163380%7C1660096649%7Cc97d15a876825abfae1eb3ca46aa4ccc; HxHg_2132_forum_lastvisit=D_2_1660096649; Hm_lpvt_6e3c8a123748ffd4b2e81355600db0ac=1660111732; HxHg_2132_creditnotice=0D0D0D0D1D0D0D0D0D163380; HxHg_2132_creditbase=0D0D6D2D552D0D0D0D0; HxHg_2132_misigntime=1660111992; HxHg_2132_sid=p3SCAZ; HxHg_2132_lip=123.172.16.153%2C1660111993; HxHg_2132_lastact=1660111993%09home.php%09misc; HxHg_2132_sendmail=1'
const headers = {
    'referer': 'https://www.4ksj.com/qiandao/',
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
        $notify("4k视界签到提醒", "签到成功", response.body); // Success!
    } else if (tempRes.indexOf('今日已签') != -1) {
        $notify("4k视界签到提醒", "今日已签", response.body); // Success!
    } else {
        $notify("4k视界签到失败", "请检查cookie以及参数", response.body); // Success! 
    }
    $done();
}, reason => {
    // reason.error
    $notify("4k视界签到提醒", "请求失败", reason.error); // Error!
    $done();
});
