const Responses = require("../common/API_Responses");

exports.handler =  async event => {
    console.log('event', event);

    if(!event.pathParameters || !event.pathParameters.ID){
        // Gagal, Jika Tidak mempunyai ID
        return Responses._400({
            pesan: 'Tidak ada ID dalam Path URL'
        });
    }

    let ID = event.pathParameters.ID;

    if(data[ID]){
        // Jika ID sesuai, kembalikan data
        return Responses._200(data[ID]);
    }

    // Gagal, ID tidak ada dalam data
    return Responses._400({
        pesan: 'Tidak ID dalam data'
    });
}

const data = {
    1234: {name: 'Joko Widodo', age: 59, job: 'Presiden'},
    4567: {name: 'Prabowo Subianto', age: 69, job: 'MenHan' },
    7890: {name: 'Refri Rifwan', age: 23, job: 'Mahasiswa'}
};