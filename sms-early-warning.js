const mysql  = require('mysql');
const sendServiceAlert = require('./send-service-alert');
const schedule = require('node-schedule');
const program = require('commander');

let j;

const task = function(){
    const sql = 'select * from zs_dict where id not in (1, 5, 12)'
    const connection = mysql.createConnection({
        host     :  program.host,
        user     :  program.user,
        password :  program.password.slice(0,2) + '^' + program.password.slice(2),
        port     :  '3306',
        database :  program.database
    });
    connection.connect();
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        let date = new Date();
        let warning = true;
        result.forEach(function(item) {
            let dateDiff = date.getTime() - item.update_time.getTime();
            let leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
            let leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
            let minutes=Math.floor(leave2/(60*1000))
            if(minutes > 10){
                warning = false;
            }
        })
        console.log(date)
        console.log(warning)
        if(!warning){
            sendServiceAlert(program.access_key_id, program.access_key_secret, {
                PhoneNumbers: program.phone_numbers,
                SignName: program.sign_name,
                TemplateCode: program.template_code,
                Content: "Transfer is not synchronism"
            });
        }
    });
    connection.end();
};

if (require.main === module) {
    program
        .option('-i, --access_key_id <string>', 'access id')
        .option('-k, --access_key_secret <string>', 'access ket secret')
        .option('-c, --content <string>', 'sms content')
        .option('-p, --phone_numbers <string>', 'phone numbers')
        .option('-s, --sign_name <string>', 'signature')
        .option('-t, --template_code <string>', 'template code')
        .option('-a, --pool_address <string>','address')
        .option('-h, --host <string>','host')
        .option('-u, --user <string>','user')
        .option('-pwd, --password <string>','password')
        .option('-port, --port <string>','port')
        .option('-d, --database <string>','database')
        .action(opts => {
            j = schedule.scheduleJob('*/30 * * * *', task);
        });
    program.parse(process.argv);

}