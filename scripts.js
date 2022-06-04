const button = document.getElementById('convert-button') //click do button
const select = document.getElementById("currency-select")

const convertValues = async() => { //função: converter do real para o dólar ou euro
    const inputReais = document.getElementById('input-real').value //valor do input
    const realValueText = document.getElementById('real-value-text')
    const currencyValueText = document.getElementById('currency-value-text')

    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then(Response /*pode ser qualquer nome*/ => Response.json()/*formado dos dados*/)

    const dolar = data.USDBRL.high
    const euro = data.EURBRL.high
    const bitcoin = data.BTCBRL.high
    
    console.log(data)

    realValueText.innerHTML = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(inputReais)

    if (select.value === "US$ Dólar americano") {
        currencyValueText.innerHTML = new Intl.NumberFormat('en-US',
            {
                style: 'currency',
                currency: 'USD'
            }).format(inputReais / dolar)
    }

    if (select.value === "€ Euro") {
        currencyValueText.innerHTML = new Intl.NumberFormat('de-DE',
            {
                style: 'currency',
                currency: 'EUR'
            }).format(inputReais / euro)
    }

    if (select.value === "Bitcoin") {
        currencyValueText.innerHTML = (inputReais / bitcoin)
    }
}

changeCurrency = () => { //verifica se o select é dólar ou euro e muda a imagem e o texto
    const currencyName = document.getElementById("currency-name")
    const currencyImg = document.getElementById("currency-img")

    if (select.value === 'US$ Dólar americano') {
        currencyName.innerHTML = "Dólar americano"
        currencyImg.src = "./assets/estados-unidos.png"
    }

    if (select.value === '€ Euro') {
        currencyName.innerHTML = "Euro"
        currencyImg.src = "./assets/euro.png"
    }

    if (select.value === 'Bitcoin') {
        currencyName.innerHTML = "Bitcoin"
        currencyImg.src = "./assets/bitcoin.png"
    }
    
    convertValues() //converte automático qdo muda o select
}

//ouvidor de eventos
button.addEventListener('click', convertValues) //qdo button é clicado chama a função convertValues
select.addEventListener('change', changeCurrency) //qdo select troca de valor chama a funçãochangeCurrency