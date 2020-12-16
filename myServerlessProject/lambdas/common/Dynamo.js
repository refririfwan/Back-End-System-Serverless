const AWS = require('aws-sdk');
const { write } = require('fs');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get (ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item){
            throw Error(`Error, Gagal mendapatkan data untuk ${ID} dari table ${TableName}`);
        }
        
        console.log(data);

        return data.Item;
    },

    async write (data, TableName){
        if (!data.ID){
            throw Error('Tidak ada ID dalam data');
        }

        const params = {
            TableName,
            Item: data
        };

        const res = await documentClient.put(params).promise();

        if (!res){
            throw Error(`Error, Gagal menyimpan data dengan ${ID} pada table ${TableName}`)
        }

        return data;
    }
}

module.exports = Dynamo;