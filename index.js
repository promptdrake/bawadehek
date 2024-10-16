const axios = require('axios');
const readline = require('readline');
const fs = require('fs');
const FormData = require('form-data');
const chalk = require('chalk');
const ask = (q) => new Promise((resolve, reject) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(q, (answer) => {
        rl.close();
        resolve(answer);
    });
});
const { createMail, fetchMail, generateImei } = require('./lib/tmailApi');
const { genName } = require('./lib/genName');
const config = require('./config.json');

async function createAcc() {
    try {
    const c = await createMail()
console.log(`\n{"email":"${c}"}`)
console.log('sending otp')
const a = await axios.get(`https://hd.mi.co.id/id/eventapi/api/imeiexchange/sendcode?from=pc&email=${c}&tel=`, {
    headers: {
        Cookie: '_ot_use_type=1; _ot_instance_id=f8vjlxt91h86e1atwv45qyf4zp8et76r; _ot_curr_uri_path=https://www.mi.co.id/id/imei-redemption/; _ot_session_id=1728952777055; _ot_ref_tip=; _ot_ref_b=96; _ot_last_source=; _ot_utm_channel=; _ot_utm_content=; _ot_utm_term=; _ot_utm_type=; _ot_utm_campaign=; _ot_utm_source=; _ot_utm_medium=; serviceToken=gtv6%2FzSAX%2BcGxV5QUgEYMcqu4nM9R%2FZqoEnrlfGA8S3%2FK0%2FZTTrmgi2A15aI8QAHtmNjrPADTPp59%2FXG6pEBREefMzdp%2BFVNenwjwV9C1QtvGg3l93CRENE1P04Cel1GUXSyNqxGOtVawVMiebvQ2mfbKUWoQ9y0l29CvvXlb1k%3D; xm_user_id_num=0; _ot_referrer_path=https://www.mi.co.id/id/imei-redemption/; _ot_prev_uri_path=https://www.mi.co.id/id/imei-redemption/; _ot_last_time=1728953077923; xm_user_bucket=9; _gcl_au=1.1.807524376.1728779512; xmuuid=XMGUEST-6617271C-7946-7FA3-43BC-1A67E2FE05A7; _fbp=fb.2.1728795567120.22883104816988266; xm_geo=ID; _gid=GA1.3.1828442199.1728952779; cUserId=4KKzf_ZzAEOwBCHu1NxVNSjPMb8; mUserId=%2FU2vtwPHqFg35Op%2F%2Fdy%2BJwDQYLJyS2I%2F2mwZILOLdZM%3D; xm_order_btauth=f4d27fe70b99432313412afaa1b7ba82; guserid=2454da7237db23ced256b1e1e5f626d9; _ga_TX77EFMEZB=GS1.3.1728952781.3.0.1728952781.0.0.0; _ga_EDQZL1E4Z6=GS1.1.1728952783.3.0.1728952783.0.0.0; _ga=GA1.1.1756030806.1728779511; _ga_188XHR66L9=GS1.1.1728952779.4.1.1728953077.60.0.0; _gat=1'
    }
});
console.log(chalk.green(JSON.stringify(a.data)))
let otp;
for (let attempts = 0; attempts < 3; attempts++) {
    otp = await fetchMail(c);
    if (otp) break;
    console.log(`[!] Waiting for OTP, attempt ${attempts + 1}`);
    await new Promise(resolve => setTimeout(resolve, 5000));
}
if (!otp) {
    console.log(`[!] OTP not received after 3 attempts, exiting.`);
    return;
}
console.log(chalk.yellow(`{"otp":"${otp}"}`))
const imei = generateImei('4bln')
console.log('GetActInfo')
const y = await axios.get(`https://hd.mi.co.id/id/eventapi/api/imeiexchange/getactinfo?from=pc&imei=${imei}&email=${c}&tel=&captchaCode=${otp}`, {
    headers: {
        Cookie: '_ot_use_type=1; _ot_instance_id=f8vjlxt91h86e1atwv45qyf4zp8et76r; _ot_curr_uri_path=https://www.mi.co.id/id/imei-redemption/; _ot_session_id=1728952777055; _ot_ref_tip=; _ot_ref_b=96; _ot_last_source=; _ot_utm_channel=; _ot_utm_content=; _ot_utm_term=; _ot_utm_type=; _ot_utm_campaign=; _ot_utm_source=; _ot_utm_medium=; serviceToken=gtv6%2FzSAX%2BcGxV5QUgEYMcqu4nM9R%2FZqoEnrlfGA8S3%2FK0%2FZTTrmgi2A15aI8QAHtmNjrPADTPp59%2FXG6pEBREefMzdp%2BFVNenwjwV9C1QtvGg3l93CRENE1P04Cel1GUXSyNqxGOtVawVMiebvQ2mfbKUWoQ9y0l29CvvXlb1k%3D; xm_user_id_num=0; _ot_referrer_path=https://www.mi.co.id/id/imei-redemption/; _ot_prev_uri_path=https://www.mi.co.id/id/imei-redemption/; _ot_last_time=1728953077923; xm_user_bucket=9; _gcl_au=1.1.807524376.1728779512; xmuuid=XMGUEST-6617271C-7946-7FA3-43BC-1A67E2FE05A7; _fbp=fb.2.1728795567120.22883104816988266; xm_geo=ID; _gid=GA1.3.1828442199.1728952779; cUserId=4KKzf_ZzAEOwBCHu1NxVNSjPMb8; mUserId=%2FU2vtwPHqFg35Op%2F%2Fdy%2BJwDQYLJyS2I%2F2mwZILOLdZM%3D; xm_order_btauth=f4d27fe70b99432313412afaa1b7ba82; guserid=2454da7237db23ced256b1e1e5f626d9; _ga_TX77EFMEZB=GS1.3.1728952781.3.0.1728952781.0.0.0; _ga_EDQZL1E4Z6=GS1.1.1728952783.3.0.1728952783.0.0.0; _ga=GA1.1.1756030806.1728779511; _ga_188XHR66L9=GS1.1.1728952779.4.1.1728953077.60.0.0; _gat=1'
    }
})
console.log(chalk.red(JSON.stringify(y.data)))
const jokowi = y.data;
const anu = new FormData();
anu.append('from', 'pc');
anu.append('goodsId', jokowi.data.goodsList[0].goodsId);
anu.append('channel', 'Shopee');
anu.append('imei', imei);
anu.append('email', c);
anu.append('tel', '');
anu.append('captchaCode', otp);
anu.append('activityId', jokowi.data.goodsList[0].actList[1].activityId); 
anu.append('goodsName', jokowi.data.goodsList[0].goodsName);
anu.append('invoiceUrl1', '');
anu.append('invoiceUrl2', '');
anu.append('invoiceUrl3', '');
anu.append('isSubscribe', 0);
console.log('redeeming');
const cpm = await axios.post(`https://hd.mi.co.id/id/eventapi/api/imeiexchange/redeem`, anu, {
    headers: {
        ...anu.getHeaders(),
        'Cookie': '_ot_use_type=1; _ot_instance_id=f8vjlxt91h86e1atwv45qyf4zp8et76r; _ot_curr_uri_path=https://www.mi.co.id/id/imei-redemption/; _ot_session_id=1728952777055; _ot_ref_tip=; _ot_ref_b=96; _ot_last_source=; _ot_utm_channel=; _ot_utm_content=; _ot_utm_term=; _ot_utm_type=; _ot_utm_campaign=; _ot_utm_source=; _ot_utm_medium=; serviceToken=gtv6%2FzSAX%2BcGxV5QUgEYMcqu4nM9R%2FZqoEnrlfGA8S3%2FK0%2FZTTrmgi2A15aI8QAHtmNjrPADTPp59%2FXG6pEBREefMzdp%2BFVNenwjwV9C1QtvGg3l93CRENE1P04Cel1GUXSyNqxGOtVawVMiebvQ2mfbKUWoQ9y0l29CvvXlb1k%3D; xm_user_id_num=0; _ot_referrer_path=https://www.mi.co.id/id/imei-redemption/; _ot_prev_uri_path=https://www.mi.co.id/id/imei-redemption/; _ot_last_time=1728953077923; xm_user_bucket=9; _gcl_au=1.1.807524376.1728779512; xmuuid=XMGUEST-6617271C-7946-7FA3-43BC-1A67E2FE05A7; _fbp=fb.2.1728795567120.22883104816988266; xm_geo=ID; _gid=GA1.3.1828442199.1728952779; cUserId=4KKzf_ZzAEOwBCHu1NxVNSjPMb8; mUserId=%2FU2vtwPHqFg35Op%2F%2Fdy%2BJwDQYLJyS2I%2F2mwZILOLdZM%3D; xm_order_btauth=f4d27fe70b99432313412afaa1b7ba82; guserid=2454da7237db23ced256b1e1e5f626d9; _ga_TX77EFMEZB=GS1.3.1728952781.3.0.1728952781.0.0.0; _ga_EDQZL1E4Z6=GS1.1.1728952783.3.0.1728952783.0.0.0; _ga=GA1.1.1756030806.1728779511; _ga_188XHR66L9=GS1.1.1728952779.4.1.1728953077.60.0.0; _gat=1'
    }
});

if(cpm.data.code == 313010) {
  return  console.log(`\n[!] ${c} ${cpm.data.msg}\n`)
}
else if(cpm.data.code == 313015) {
    return  console.log(`\n[!] ${c} ${cpm.data.msg}\n`)
  }
  else if(cpm.data.code == 313018) {
    return  console.log(`\n[!] ${c} ${cpm.data.msg}\n`)
  }
console.log(chalk.cyanBright(JSON.stringify(cpm.data)))
const sev =  c
console.log(`${c}`)
fs.writeFileSync('4b.txt', sev + '\n', { flag: 'a' })
    }
    catch (error) {
        console.log(`Error`)
    }
}
async function createAccs() {
    try {
    const c = await createMail()
console.log(`\n{"email":"${c}"}`)
console.log('sending otp')
const a = await axios.get(`https://hd.mi.co.id/id/eventapi/api/imeiexchange/sendcode?from=pc&email=${c}&tel=`, {
    headers: {
        Cookie: '_ot_use_type=1; _ot_instance_id=f8vjlxt91h86e1atwv45qyf4zp8et76r; _ot_curr_uri_path=https://www.mi.co.id/id/imei-redemption/; _ot_session_id=1728952777055; _ot_ref_tip=; _ot_ref_b=96; _ot_last_source=; _ot_utm_channel=; _ot_utm_content=; _ot_utm_term=; _ot_utm_type=; _ot_utm_campaign=; _ot_utm_source=; _ot_utm_medium=; serviceToken=gtv6%2FzSAX%2BcGxV5QUgEYMcqu4nM9R%2FZqoEnrlfGA8S3%2FK0%2FZTTrmgi2A15aI8QAHtmNjrPADTPp59%2FXG6pEBREefMzdp%2BFVNenwjwV9C1QtvGg3l93CRENE1P04Cel1GUXSyNqxGOtVawVMiebvQ2mfbKUWoQ9y0l29CvvXlb1k%3D; xm_user_id_num=0; _ot_referrer_path=https://www.mi.co.id/id/imei-redemption/; _ot_prev_uri_path=https://www.mi.co.id/id/imei-redemption/; _ot_last_time=1728953077923; xm_user_bucket=9; _gcl_au=1.1.807524376.1728779512; xmuuid=XMGUEST-6617271C-7946-7FA3-43BC-1A67E2FE05A7; _fbp=fb.2.1728795567120.22883104816988266; xm_geo=ID; _gid=GA1.3.1828442199.1728952779; cUserId=4KKzf_ZzAEOwBCHu1NxVNSjPMb8; mUserId=%2FU2vtwPHqFg35Op%2F%2Fdy%2BJwDQYLJyS2I%2F2mwZILOLdZM%3D; xm_order_btauth=f4d27fe70b99432313412afaa1b7ba82; guserid=2454da7237db23ced256b1e1e5f626d9; _ga_TX77EFMEZB=GS1.3.1728952781.3.0.1728952781.0.0.0; _ga_EDQZL1E4Z6=GS1.1.1728952783.3.0.1728952783.0.0.0; _ga=GA1.1.1756030806.1728779511; _ga_188XHR66L9=GS1.1.1728952779.4.1.1728953077.60.0.0; _gat=1'
    }
});
console.log(JSON.stringify(a.data))
let otp;
for (let attempts = 0; attempts < 3; attempts++) {
    otp = await fetchMail(c);
    if (otp) break;
    console.log(`[!] Waiting for OTP, attempt ${attempts + 1}`);
    await new Promise(resolve => setTimeout(resolve, 5000));
}
if (!otp) {
    console.log(`[!] OTP not received after 3 attempts, exiting.`);
    return;
}
console.log(`{"otp":"${otp}"}`)
const imei = generateImei('3bln')
console.log('GetActInfo')
const y = await axios.get(`https://hd.mi.co.id/id/eventapi/api/imeiexchange/getactinfo?from=pc&imei=${imei}&email=${c}&tel=&captchaCode=${otp}`, {
    headers: {
        Cookie: '_ot_use_type=1; _ot_instance_id=f8vjlxt91h86e1atwv45qyf4zp8et76r; _ot_curr_uri_path=https://www.mi.co.id/id/imei-redemption/; _ot_session_id=1728952777055; _ot_ref_tip=; _ot_ref_b=96; _ot_last_source=; _ot_utm_channel=; _ot_utm_content=; _ot_utm_term=; _ot_utm_type=; _ot_utm_campaign=; _ot_utm_source=; _ot_utm_medium=; serviceToken=gtv6%2FzSAX%2BcGxV5QUgEYMcqu4nM9R%2FZqoEnrlfGA8S3%2FK0%2FZTTrmgi2A15aI8QAHtmNjrPADTPp59%2FXG6pEBREefMzdp%2BFVNenwjwV9C1QtvGg3l93CRENE1P04Cel1GUXSyNqxGOtVawVMiebvQ2mfbKUWoQ9y0l29CvvXlb1k%3D; xm_user_id_num=0; _ot_referrer_path=https://www.mi.co.id/id/imei-redemption/; _ot_prev_uri_path=https://www.mi.co.id/id/imei-redemption/; _ot_last_time=1728953077923; xm_user_bucket=9; _gcl_au=1.1.807524376.1728779512; xmuuid=XMGUEST-6617271C-7946-7FA3-43BC-1A67E2FE05A7; _fbp=fb.2.1728795567120.22883104816988266; xm_geo=ID; _gid=GA1.3.1828442199.1728952779; cUserId=4KKzf_ZzAEOwBCHu1NxVNSjPMb8; mUserId=%2FU2vtwPHqFg35Op%2F%2Fdy%2BJwDQYLJyS2I%2F2mwZILOLdZM%3D; xm_order_btauth=f4d27fe70b99432313412afaa1b7ba82; guserid=2454da7237db23ced256b1e1e5f626d9; _ga_TX77EFMEZB=GS1.3.1728952781.3.0.1728952781.0.0.0; _ga_EDQZL1E4Z6=GS1.1.1728952783.3.0.1728952783.0.0.0; _ga=GA1.1.1756030806.1728779511; _ga_188XHR66L9=GS1.1.1728952779.4.1.1728953077.60.0.0; _gat=1'
    }
})
console.log(JSON.stringify(y.data))
const jokowi = y.data;
const anu = new FormData();
anu.append('from', 'pc');
anu.append('goodsId', jokowi.data.goodsList[0].goodsId);
anu.append('channel', 'Shopee');
anu.append('imei', imei);
anu.append('email', c);
anu.append('tel', '');
anu.append('captchaCode', otp);
anu.append('activityId', jokowi.data.goodsList[0].actList[1].activityId); 
anu.append('goodsName', jokowi.data.goodsList[0].goodsName);
anu.append('invoiceUrl1', '');
anu.append('invoiceUrl2', '');
anu.append('invoiceUrl3', '');
anu.append('isSubscribe', 0);
console.log('redeeming');
const cpm = await axios.post(`https://hd.mi.co.id/id/eventapi/api/imeiexchange/redeem`, anu, {
    headers: {
        ...anu.getHeaders(),
        'Cookie': '_ot_use_type=1; _ot_instance_id=f8vjlxt91h86e1atwv45qyf4zp8et76r; _ot_curr_uri_path=https://www.mi.co.id/id/imei-redemption/; _ot_session_id=1728952777055; _ot_ref_tip=; _ot_ref_b=96; _ot_last_source=; _ot_utm_channel=; _ot_utm_content=; _ot_utm_term=; _ot_utm_type=; _ot_utm_campaign=; _ot_utm_source=; _ot_utm_medium=; serviceToken=gtv6%2FzSAX%2BcGxV5QUgEYMcqu4nM9R%2FZqoEnrlfGA8S3%2FK0%2FZTTrmgi2A15aI8QAHtmNjrPADTPp59%2FXG6pEBREefMzdp%2BFVNenwjwV9C1QtvGg3l93CRENE1P04Cel1GUXSyNqxGOtVawVMiebvQ2mfbKUWoQ9y0l29CvvXlb1k%3D; xm_user_id_num=0; _ot_referrer_path=https://www.mi.co.id/id/imei-redemption/; _ot_prev_uri_path=https://www.mi.co.id/id/imei-redemption/; _ot_last_time=1728953077923; xm_user_bucket=9; _gcl_au=1.1.807524376.1728779512; xmuuid=XMGUEST-6617271C-7946-7FA3-43BC-1A67E2FE05A7; _fbp=fb.2.1728795567120.22883104816988266; xm_geo=ID; _gid=GA1.3.1828442199.1728952779; cUserId=4KKzf_ZzAEOwBCHu1NxVNSjPMb8; mUserId=%2FU2vtwPHqFg35Op%2F%2Fdy%2BJwDQYLJyS2I%2F2mwZILOLdZM%3D; xm_order_btauth=f4d27fe70b99432313412afaa1b7ba82; guserid=2454da7237db23ced256b1e1e5f626d9; _ga_TX77EFMEZB=GS1.3.1728952781.3.0.1728952781.0.0.0; _ga_EDQZL1E4Z6=GS1.1.1728952783.3.0.1728952783.0.0.0; _ga=GA1.1.1756030806.1728779511; _ga_188XHR66L9=GS1.1.1728952779.4.1.1728953077.60.0.0; _gat=1'
    }
});

if(cpm.data.code == 313010) {
  return  console.log(`\n[!] ${c} ${cpm.data.msg}\n`)
}
else if(cpm.data.code == 313015) {
    return  console.log(`\n[!] ${c} ${cpm.data.msg}\n`)
  }
console.log(JSON.stringify(cpm.data))
const sev =  c
console.log(`${c}`)
fs.writeFileSync('3b.txt', sev + '\n', { flag: 'a' })
    }
    catch (error) {
        console.log(`Error`)
    }
}
const pakenanya = async () => { 
    const wm = `
Tutor Spotify Premium Gratis dek?
Created By t.me/penyukaberuang

[1]. 4 Bulan
[2]. 3 Bulan
[3]. Check All Link
    `
    console.log(wm)
    const nanya = await ask('Pilih Nomer Berapa\n- ')

    if(nanya == 1) {
        const berapa = await ask('\n4 Bulan Dipilih\nBerapa Link\n- ')
        for (let i = 0; i < berapa; i++) {
            
         await createAcc();
        }
    }
    if(nanya == 2) {
        const berapa = await ask('\n3 Bulan Dipilih\nBerapa Link\n- ')
        for (let i = 0; i < berapa; i++) {
            await createAccs();
        }
    }
}
pakenanya()
