
/**
 * @fileoverview Example to compose HTTP request
 * and handle the response.
 *
 */

//替换你自己的cookie
const cookie = "uid=145503; email=li470598498%40live.com; key=bf74dfa4c5ec25dfee20e9f4237000370d048ab4816bb; ip=80b94b22c4ad83c4f788fd9e13dd0831; expire_in=1638765080; sidenav-state=pinned"
const url = "https://taggood-4.xyz/user/checkin";
const method = "POST";
const headers = {
    "cookie": cookie,
    "referer": "https://taggood-4.xyz/user",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    "Content-Type": "application/json;charset=UTF-8"
};
const myRequest = {
    url: url,
    method: method, // Optional, default GET.
    headers: headers, // Optional.
};
$task.fetch(myRequest).then(response => {
    // response.statusCode, response.headers, response.body
    let data = response.body
    if (data.length < 250) {
        data = JSON.parse(data)
        console.log(data.msg);
        $notify("TAG签到提醒", "", data.msg); // Success!
    } else {
        $notify("TAG签到失败", "", "请重新登录更换cookie"); // Error!
    }

    $done();
}, reason => {
    // reason.error
    $notify("TAG签到失败", "", reason.error); // Error!
    $done();
});


