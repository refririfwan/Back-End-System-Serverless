const Responses = require("../common/API_Responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler =  async event => {
    console.log('event', event);

    if(!event.pathParameters || !event.pathParameters.ID){
        // Gagal, Jika Tidak mempunyai ID
        return Responses._400({
            message: 'Tidak ada ID dalam Path URL'
        });
    }

    let ID = event.pathParameters.ID;
    const user = JSON.parse(event.body);
    user.ID = ID;

    const newUser = await Dynamo.write(user, tableName).catch(err => {
        console.log('error, Gagal ketika menjalankan fungsi write pada DynamoDB', err);
        return null;
    });



    if (!newUser){
        return Responses._400({
            message: 'Gagal untuk menyimpan user baru berdasarkan ID'
        });
    }

    return Responses._200({newUser});
}