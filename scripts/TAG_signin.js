
/**
 * @fileoverview Example to compose HTTP request
 * and handle the response.
 *
 */

//替换你自己的cookie
const cookie = "sidenav-state=pinned; uid=145503; email=li470598498%40live.com; key=bf74dfa4c5ec25dfee20e9f4237000370d048ab4816bb; ip=73875baecf822eb723cdd4a0e02fda9b; expire_in=1638592315"
const url = "https://taggood-4.xyz/user/checkin";
const method = "POST";
const headers = {
    "cookie": cookie,
    "referer": "https://taggood-4.xyz/user",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    "Content-Type": "application/json;charset=UTF-8"
};

function unicodeConverter(str) {
    return unescape(str.replace(/\\u/gi, '%u'));
}
const myRequest = {
    url: url,
    method: method, // Optional, default GET.
    headers: headers, // Optional.
};
$task.fetch(myRequest).then(response => {
    // response.statusCode, response.headers, response.body
    let data = JSON.parse(response.body)
    console.log(typeof(data) + ';;;;' + data);
    $notify("TAG签到提醒", "", data.msg); // Success!
    $done();
}, reason => {
    // reason.error
    $notify("TAG签到失败", "失败", reason.error); // Error!
    $done();
});
// $task.fetch(myRequest).then(response => {
//     // response.statusCode, response.headers, response.body
//     console.log(response.body.msg);
//     let msg = unicodeConverter(response.body.msg)
//     $notify("TAG签到提醒", "", msg); // Success!
//     $done();
// }, reason => {
//     // reason.error
//     $notify("TAG签到失败", "失败", reason.error); // Error!
//     $done();
// });

