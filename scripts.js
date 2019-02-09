
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

                    prop2: '0'
                }

                anime({
                    targets: myObject,
                    prop2: value,
                    easing: 'easeInOutExpo',
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

let netDifficulty = new fetchData()
netDifficulty.url = `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=0x10d4f&boolean=true&apikey=${netDifficulty.keyApi}`
netDifficulty.catchData(netDifficulty.url).then(response => {
    let netDiffNo = parseInt(response.result.difficulty.slice(2),16)
    let hashRate = netDiffNo/15 //Hash rate = netDifficulty / averageNetworktime in this case is 15sec
    netDifficulty.show('networkDifficulty', netDiffNo)
    netDifficulty.show('hashRate', hashRate)
})

///////////// EVENT LISTENER
class interval {
    constructor (time) {
        var timer = false;
        this.start = function () {
            if (!this.isRunning()){
                timer = setInterval(function(){
                    lastBlock.catchData(lastBlock.url).then(response => {
                        let apiData = parseInt(response.result.slice(2),16)
                        lastBlock.show("lastblock", apiData)
                    })
                
                    lastTransactions.catchData(lastTransactions.url).then(response => {
                        let apiData = parseInt(response.result, 16)
                        lastTransactions.show('transactions', apiData)
                    })
                }, time);
            }
        };
        this.stop = function () {
            clearInterval(timer);
            timer = false;
        };
        this.isRunning = function () {
            return timer !== false;
        };
    }
    
}

var realTimeSwitch = document.querySelector('input')
let i = new interval(5000)
realTimeSwitch.addEventListener('change',function(){
    if(i.isRunning()){
        i.stop()
    }
    else 
        i.start()
})

// setInterval(()=> {
//     lastBlock.catchData(lastBlock.url).then(response => {
//         let apiData = parseInt(response.result.slice(2),16)
//         lastBlock.show("lastblock", apiData)
//     })

//     lastTransactions.catchData(lastTransactions.url).then(response => {
//         let apiData = parseInt(response.result, 16)
//         lastTransactions.show('transactions', apiData)
//     })
// },5000) 



window.addEventListener('load', pageLoader())