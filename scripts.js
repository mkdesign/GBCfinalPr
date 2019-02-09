
pageLoader = () => {

}

class fetchData {
    constructor(url) {

        this.url  = url
        this.keyApi = 'YBQ3Q6FGA1V6UCGTJFEUMS4K6FYDIW7HZJ'
        this.catchData = apiUrl => {
            console.log(apiUrl)
            return fetch(apiUrl).then(response => {
                if(response.ok) {
                    return response.json()
                }
                throw new Error("Api ride")
            })
        }

        this.show = (tagID, value) => {
            

            if(!(tagID== "etherPrice")){
                var objPropLogEl = document.getElementById(tagID).querySelector('span');

                var myObject = {

                    prop2: '0%'
                }

                anime({
                    targets: myObject,
                    prop2: value,
                    easing: 'linear',
                    round: 1,
                    update: function() {
                        objPropLogEl.innerHTML = myObject.prop2
                    }
                });
            }else {
                document.getElementById(tagID).querySelector('span').textContent = value
            }
        }
    }
}

let lastTransactions = new fetchData()
lastTransactions.url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionCount&address=0x2910543af39aba0cd09dbb2d50200b3e800a63d2&tag=latest&apikey=${lastTransactions.keyApi}`

lastTransactions.catchData(lastTransactions.url).then(response => {
    let apiData = parseInt(response.result, 16)
    lastTransactions.show('transactions', apiData)
})

///////LAST BLOCK

let lastBlock = new fetchData()
lastBlock.url = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${lastBlock.keyApi}`

lastBlock.catchData(lastBlock.url).then(response => {
    let apiData = parseInt(response.result.slice(2),16)
    lastBlock.show("lastblock", apiData)
})

///////// HASH RATE
// let hashRate = new fetchData()
// hashRate.url = `https://api.etherscan.io/api?module=proxy&action=eth_hashrate&apikey=${lastBlock.keyApi}`
// hashRate.catchData(hashRate.url).then(response => {
//    let apiData =response.result.slice(2)
//    console.log(apiData)
//    hashRate.show("hashRate", apiData)
// })

//////// ETHER PRICE
let etherPrice = new fetchData()
etherPrice.url = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${lastBlock.keyApi}`
etherPrice.catchData(etherPrice.url).then(response => {
    let apiData = response.result
    let value = `${apiData.ethusd} @ ${apiData.ethbtc} BTC/ETH`
    etherPrice.show("etherPrice", value)
})
///////// NETWORK DIFFICULTY

// let netDifficulty = new fetchData()
// netDifficulty.url = 'https://etherchain.org/api/basic_stats'
// netDifficulty.catchData(netDifficulty.url).then(response => {
//     let apiData = response
//     console.log(apiData)
// })

var logEl = document.querySelector('.container > div > span').innerHTML;

window.addEventListener('load', pageLoader())