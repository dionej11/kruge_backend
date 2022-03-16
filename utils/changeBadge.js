const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const MongoDB = require('../mongodb/client');

const Badge = {USD: 3700, MXN: 200, EUR: 4200};

function changeBadge(value, originBadge) {
    let valueCOP = value * Badge[originBadge];
    return valueCOP;
}

const GetValueFromAPI = async () => {
 
    const client = new MongoDB();
    const currentValue = await client.GetCurrentBadgeValues();

    if (currentValue.latestUpdate === new Date().toISOString().slice(0,10)) {

        console.log("SE HA RETORNADO EL VALOR EXISTENTE");
        let Values = {
            USD: currentValue.USD,
            EUR: currentValue.EUR,
            MXN: currentValue.MXN,
            latestUpdate: new Date().toISOString().slice(0,10)
        }

        return Values;
        
    } else {
        
        console.log("SE HA CONSULTADO A LA API POR EL VALOR DE HOY");
        const fetchLists = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${process.env.EXCHANGE_KEY}&symbols=MXN,EUR,COP`);
        const ExchangeInUSD = await fetchLists.json();
        const COP_USD = ExchangeInUSD.rates.COP;
    
        let Values = {
            USD: COP_USD,
            EUR: (1/ExchangeInUSD.rates.EUR)*COP_USD,
            MXN: (1/ExchangeInUSD.rates.MXN)*COP_USD,
            latestUpdate: new Date().toISOString().slice(0,10)
        }

        // Falta probrar el día de mañana 😅
        await client.UpdateBadgeValues(currentValue._id, Values);

        return Values;
    }
}

module.exports = { changeBadge, GetValueFromAPI };