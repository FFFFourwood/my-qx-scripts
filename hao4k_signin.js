/**
 * @fileoverview Example to compose HTTP request
 * and handle the response.
 *
 */

const paramUrl = '?id=k_misign:sign&operation=qiandao&formhash=df87be5c&format=empty'//此处填写签到按钮的链接 从？开始
const hostUrl = 'https://www.hao4k.cn/plugin.php' 
const url = hostUrl + paramUrl
const method = "GET";
//填写cookie信息
const cookieInfo = 'HxHg_2132_connect_is_bind=0; HxHg_2132_smile=1D1; HxHg_2132_curcountl=0; HxHg_2132_st_p=163380%7C1631368399%7Cf66dcec089550ea981c90b1aa62a7c38; HxHg_2132_viewid=tid_60030; HxHg_2132_saltkey=w9fKf448; HxHg_2132_lastvisit=1638274265; Hm_lvt_6c1cdfd1254d8b1be9c00f4cdfe0c69e=1638277867; HxHg_2132_isms_login_referer=https%3A%2F%2Fwww.hao4k.cn%2Fforum-4kdianying-1.html; HxHg_2132_seccodeSdE5S=188519.f6fca0bc5f65d2e163; HxHg_2132_sid=W8G287; HxHg_2132_ulastactivity=df077MfSMMFjb28TlGZEG3O0i76D3Qz8zyW%2FY%2B8k84kUkMw9Ga4r; HxHg_2132_auth=bb6ajvdl7DUzPXYj7hJS8QIZp%2B8Ze9AvzNhnvdtVbBebU2zv0To7ai6fFe0qoGbDorfd8B%2FO6DdTTkbP3P%2Bk1ajCzf4; HxHg_2132_st_t=163380%7C1638277890%7Cf41222f77770ffd9cbbe2f78da43087a; HxHg_2132_forum_lastvisit=D_2_1638277890; HxHg_2132_myrepeat_rr=R0; HxHg_2132_lastviewtime=163380%7C1638277899; HxHg_2132_secqaaqSW8G287=188612.75e398679dd8135ba1; Hm_lpvt_6c1cdfd1254d8b1be9c00f4cdfe0c69e=1638278335; HxHg_2132_sendmail=1; HxHg_2132_lastcheckfeed=163380%7C1638278334; HxHg_2132_lastact=1638278575%09index.php%09'
const headers = {
    'referer': 'https://www.hao4k.cn/qiandao/',
    'cookie': cookieInfo
}
const myRequest = {
    url: url,
    method: method, // Optional, default GET.
    headers: headers, // Optional.
};

function toSignIn() {
    $task.fetch(myRequest).then(response => {
        // response.statusCode, response.headers, response.body
        console.log(response.body);
        let tempRes = response.body
        if(tempRes.indexOf('[CDATA[]]') != -1){
            $notify("hao4k签到提醒", "签到成功", response.body); // Success!
            toSignIn()
            $done();
        } else if (tempRes.indexOf('今日已签') != -1){
            $notify("hao4k签到提醒", "今日已签", response.body); // Success!
            $done();
        } else {
            $notify("hao4k签到失败", "请检查cookie以及参数", response.body); // Success!
            $done();
        }
    }, reason => {
        // reason.error
        $notify("hao4k签到提醒", "请求失败", reason.error); // Error!
        $done();
    });
}
toSignIn()
