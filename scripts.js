
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
            document.getElementById(tagID).querySelector('span').textContent = value
        }

    }
}

let lastTransactions = new fetchData()
lastTransactions.url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionCount&address=0x2910543af39aba0cd09dbb2d50200b3e800a63d2&tag=latest&apikey=${lastTransactions.keyApi}`

lastTransactions.catchData(lastTransactions.url).then(response => {
    let apiData = parseInt(response.result, 16)
    lastTransactions.show('transactions', apiData)
})

//last block

let lastBlock = new fetchData()
lastBlock.url = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${lastBlock.keyApi}`

lastBlock.catchData(lastBlock.url).then(response => {
    let apiData = parseInt(response.result.slice(2),16)
    lastBlock.show("lastblock", apiData)
})

//hash rate 
let hashRate = new fetchData()
hashRate.url = `https://api.etherscan.io/api?module=proxy&action=eth_hashrate&apikey=${lastBlock.keyApi}`
hashRate.catchData(hashRate.url).then(response => {
   let apiData =response.result.slice(2)
   console.log(apiData)
   hashRate.show("hashRate", apiData)
})

//

window.addEventListener('load', pageLoader())