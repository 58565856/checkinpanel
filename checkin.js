// @grant nodejs
let pyname = $env.PYNAME
console.log(`⏳ 开始执行 ${pyname}`)
$exec(`python3 https://raw.githubusercontent.com/Oreomeow/checkinpanel/master/${pyname}`, {
    cwd: './script/Shell/checkinpanel',
    timeout: 0,
    env: {
        NOTIFY_CONFIG_PATH: $store.get('NOTIFY_CONFIG_PATH', 'string'),           // 自定义通知配置文件路径，如 /usr/locallocal/app/script/Lists/notify.json5
        HITOKOTO: $store.get('HITOKOTO', 'boolean'),                              // 一言，true 为开启，false 为关闭，默认关闭
        BARK: $store.get('BARK', 'string'),                                       // bark 服务，此参数如果以 http 或者 https 开头则判定为自建 bark 服务
        DD_BOT_SECRET: $store.get('DD_BOT_SECRET', 'string'),                     // 钉钉机器人的 DD_BOT_SECRET
        DD_BOT_TOKEN: $store.get('DD_BOT_TOKEN', 'string'),                       // 钉钉机器人的 DD_BOT_TOKEN
        FSKEY: $store.get('FSKEY', 'string'),                                     // 飞书机器人的 FSKEY；https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxx 的 xxxxxx 部分
        GOBOT_URL: $store.get('GOBOT_URL', 'string'),                             // go-cqhttp e.g.推送到个人QQ: http://127.0.0.1/send_private_msg 群: http://127.0.0.1/send_group_msg
        GOBOT_QQ: $store.get('GOBOT_QQ', 'string'),                               // go-cqhttp 推送群或者用户。GOBOT_URL 设置 /send_private_msg 则需要填入 user_id=个人QQ；相反如果是 /send_group_msg 则需要填入 group_id=QQ群
        GOBOT_TOKEN: $store.get('GOBOT_TOKEN', 'string'),                         // go-cqhttp 的 access_token，可不填
        PUSH_KEY: $store.get('PUSH_KEY', 'string'),                               // server 酱的 PUSH_KEY，兼容旧版与 Turbo 版
        PUSH_PLUS_TOKEN: $store.get('PUSH_PLUS_TOKEN', 'string'),                 // push+ 微信推送
        QMSG_KEY: $store.get('QMSG_KEY', 'string'),                               // qmsg 酱的 QMSG_KEY
        QMSG_TYPE: $store.get('QMSG_TYPE', 'string'),                             // qmsg 酱的 QMSG_TYPE
        QYWX_AM: $store.get('QYWX_AM', 'string'),                                 // 企业微信应用的 QYWX_AM，参考 http://note.youdao.com/s/HMiudGkb
        QYWX_KEY: $store.get('QYWX_KEY', 'string'),                               // 企业微信机器人的 QYWX_KEY
        TG_BOT_TOKEN: $store.get('TG_BOT_TOKEN', 'string'),                       // tg 机器人的 TG_BOT_TOKEN
        TG_USER_ID: $store.get('TG_USER_ID', 'string'),                           // tg 机器人的 TG_USER_ID
        TG_API_HOST: $store.get('TG_API_HOST', 'string'),                         // tg 代理 api
        TG_PROXY_IP: $store.get('TG_PROXY_IP', 'string'),                         // tg 机器人的 TG_PROXY_IP
        TG_PROXY_PORT: $store.get('TG_PROXY_PORT', 'string')                      // tg 机器人的 TG_PROXY_PORT
    },
    cb(data, error) {
        error ? console.error(error) : console.log(data)
    }
})