/**
 * @fileoverview Example to compose HTTP request
 * and handle the response.
 *
 */
const paramUrl = '?sign=455e0479'
const hostUrl = 'https://www.4ksj.com/qiandao.php'
const url = hostUrl + paramUrl
const method = "GET";
//填写cookie信息
const cookieInfo = 'HxHg_2132_saltkey=neIzGmhM; HxHg_2132_lastvisit=1720268859; HxHg_2132_nofavfid=1; HxHg_2132_myrepeat_rr=R0; HxHg_2132_sid=0; Hm_lvt_6e3c8a123748ffd4b2e81355600db0ac=1721311507,1721389231,1721745863,1721829878; HMACCOUNT=C7E2D12D05E89252; HxHg_2132_auth=7c3eM59wdqhwA9r%2FGvjwG%2FiIsh%2ByU2Xqxkdbi2dxJbgYnlBPi35fVCZXGXOILqooGSzJDvz%2BzLw4Il6Za4NHzC7hKuk; HxHg_2132_lastcheckfeed=163380%7C1721829882; HxHg_2132_lip=103.188.234.172%2C1721829882; HxHg_2132_st_t=163380%7C1721829885%7Cb2563bb27c0a8fde977f1f8782d86f02; HxHg_2132_forum_lastvisit=D_52_1720537226D_57_1720542689D_190_1720542813D_58_1721389270D_2_1721829885; HxHg_2132_st_p=163380%7C1721829893%7C82fceca17ab12906a3f0525f03d95643; HxHg_2132_visitedfid=57D2D58D190D52; HxHg_2132_viewid=tid_87789; HxHg_2132_ulastactivity=1721830582%7C0; HxHg_2132_noticeTitle=1; HxHg_2132_home_diymode=1; HxHg_2132_sendmail=1; HxHg_2132_lastact=1721831009%09home.php%09spacecp; HxHg_2132_will_timelogout_163380=1721831009; HxHg_2132_checkpm=1; Hm_lpvt_6e3c8a123748ffd4b2e81355600db0ac=1721831009'
const headers = {
    'referer': 'https://www.4ksj.com/qiandao.php',
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
