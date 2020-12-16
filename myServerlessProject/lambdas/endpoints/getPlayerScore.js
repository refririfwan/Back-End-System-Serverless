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

    const user = await Dynamo.get(ID, tableName).catch(err => {
        console.log('error, Gagal melakukan Get DynamoDB', err);
        return null;
    });

    if (!user){
        return Responses._400({
            message: 'Gagal untuk menampilkan user berdasarkan ID'
        });
    }

    return Responses._200({user});
}