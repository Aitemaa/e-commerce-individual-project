const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

async function shippingFee(weight, CityId){
 try {
    const destination = `${CityId}`;
    const origin = `152`;
    const qsData = qs.stringify({origin, destination, weight, courier: 'jne'})
    const {data} = await axios({
        method: 'POST',
        url: 'https://api.rajaongkir.com/starter/cost',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'key': process.env.RAJAONGKIR_API},
        data: qsData
    })
    const fee = data.rajaongkir.results[0].costs[1].cost[0].value;
    // console.log(data.rajaongkir.results[0].costs[1].cost[0].value)
    return fee
 } catch (error) {
    console.log(error)
 }
}

async function calculateAmount(order , CityId){
    let totalPrice = 0;
    let totalWeight = 0;



    order.OrderDetails.forEach(e => {
        totalPrice += e.Product.price;
        totalWeight += e.Product.weight;
    })

    const feeOngkir = await shippingFee(totalWeight, CityId);
    totalPrice += feeOngkir;

    return totalPrice
}


module.exports = calculateAmount

