fetch('https://qd0sagkj.api.sanity.io/v2026-07-01/data/query/production?query=*[_type=="story"%26%26slug.current=="shugaban-najeriya-ya-amince-da-karin-albashin-sojoji-daga-kashi-30-zuwa-80"][0]')
.then(r => r.json())
.then(d => console.log(JSON.stringify(d.result, null, 2)))
