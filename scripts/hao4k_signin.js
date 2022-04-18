/**
 * @fileoverview Example to compose HTTP request
 * and handle the response.
 *
 */
const paramUrl = '?mod=sign&operation=qiandao&formhash=12e62493&format=empty'//此处填写签到按钮的链接 从？开始
const hostUrl = 'https://www.4ksj.com//qiandao/'
const url = hostUrl + paramUrl
const method = "GET";
//填写cookie信息
const cookieInfo = 'HxHg_2132_saltkey=GRw6e8fl; HxHg_2132_lastvisit=1650245771; HxHg_2132_isms_login_referer=https%3A%2F%2Fwww.4ksj.com%2Fforum-4kdianying-1.html; HxHg_2132_sid=uLc2Cx; HxHg_2132_ulastactivity=0400125BAi2AVnj45DPa9NzGqKyjIicRkXEIhoKlIHarAT4%2Fef5e; HxHg_2132_auth=3f07GQ2m6BMncXiTHAJC48XS%2Ff4iFu%2Fz6j5jg5YQE7FQ9wtrN27rSxARaaw4o3HyiwGBYxknetx6MCuqgXTB1tyOYvg; HxHg_2132_lastcheckfeed=163380%7C1650249446; HxHg_2132_lip=175.17.92.161%2C1649890801; HxHg_2132_connect_is_bind=0; HxHg_2132_myrepeat_rr=R0; HxHg_2132_viewid=tid_70080; HxHg_2132_curcountl=1; HxHg_2132_st_p=163380%7C1650249723%7C03803a0096486a5c2e3bdaa29a5a4b70; HxHg_2132_nofavfid=1; HxHg_2132_st_t=163380%7C1650249740%7C67c1c6b2ccab40291c4b739282b7e8f3; HxHg_2132_forum_lastvisit=D_2_1650249740; HxHg_2132_lastact=1650249902%09home.php%09spacecp'
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
