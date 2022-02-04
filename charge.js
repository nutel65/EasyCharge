if (!String.prototype.format) {
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
      });
    };
}

let shopItemTemplate = `
<div class="shop-item">
    <span class="shop-item-title">{0}</span>
    <div class="shop-item-details">
        <span class="shop-item-price">{1} zł/kWh</span>
        <button class="shop-item-button" type="button" value="{1}">
            Wybierz
        </button>
        <br>
    </div>
</div>
`

var shopItems = {
    'Orlen': [
        {
            name: "Złącze AC",
            price: 1.43
        },
        {
            name: "Złącze DC 50 kW",
            price: 1.99
        },
        {
            name: "Złącze DC 100 kW",
            price: 2.39
        },
    ], 
    'EVplus': [
        {
            name: "Złącze AC",
            price: 1.40
        },
        {
            name: "Złącze DC >100 kW",
            price: 2.20
        },
        {
            name: "Złącze DC >150 kW",
            price: 2.60
        },
        {
            name: "Złącze DC >300 kW",
            price: 2.80
        },
    ], 
    'Revnet': [
        {
            name: "Złącze AC",
            price: 1.09
        },
        {
            name: "Złącze DC 50 kW",
            price: 1.85
        },
    ], 
    'GreenWay': [
        {
            name: "Złącze AC",
            price: 1.29
        },
        {
            name: "Złącze DC 70 kW",
            price: 2.09
        },
        {
            name: "Złącze DC 140 kW",
            price: 2.39
        },
        {
            name: "Złącze DC >140 kW",
            price: 2.59
        },
    ], 
    
}

document.addEventListener("DOMContentLoaded", function(){
    let elems = document.getElementsByClassName("js-station-button")
    Array.from(elems).forEach(element => {
        element.addEventListener("click", stationButtonClicked)
    });

    let payButton = document.getElementById("js-pay-button")
    payButton.addEventListener("click", () => {
        window.location.replace("https://paypal.com")
    })
});

function stationButtonClicked() {
    document.getElementById("js-select-station").style.display = "none"
    document.getElementById("js-selected-station-div").style.display = "block"
    shopItemsElem = document.getElementById("js-select-items")
    shopItemsElem.style.display = "block"

    stationName = this.innerHTML
    document.getElementById("js-station-name-text").innerHTML = stationName

    shopItems[stationName].forEach(item => {
        console.log("oaskdfjlkasjf")
        let strNode = shopItemTemplate.format(item['name'], parseFloat(item['price']).toFixed(2))
        let node = new DOMParser().parseFromString(strNode, 'text/html').body.firstChild;
        shopItemsElem.appendChild(node)
    });

    let elems = document.getElementsByClassName("shop-item-button")
    Array.from(elems).forEach(element => {
        element.addEventListener("click", itemButtonClicked)
    })

    document.getElementById("js_sidepanel_text1").innerHTML = "Naładuj samochód (2/3)"
    document.getElementById("js_sidepanel_text2").innerHTML = "Wybierz opcję ładowania"
}


function itemButtonClicked() {
    let payButton = document.getElementById("js-pay-button")
    payButton.style.display = "none"
    let price = this.value
    // document.getElementById("js-select-items").style.display = "none"
    // document.getElementById("js-selected-item-div").style.display = "block"

    amountSelectionElem = document.getElementById("js-select-amount")
    amountSelectionElem.style.display = "block"

    // itemName = this.innerHTML
    // document.getElementById("js-item-name-text").innerHTML = itemName

    shopItems[stationName].forEach(item => {
        // console.log("oaskdfjlkasjf")
        // let strNode = shopItemTemplate.format(item['name'], item['price'])
        // let node = new DOMParser().parseFromString(strNode, 'text/html').body.firstChild;
        // amountSelectionElem.appendChild(node)
    });

    document.getElementById("js_sidepanel_text1").innerHTML = "Naładuj samochód (3/3)"
    document.getElementById("js_sidepanel_text2").innerHTML = "Wybór ilości energii"

    let amountSlider = document.getElementById("js-amount-slider")
    var sliderValueOutput = document.getElementById("js-slider-value-text");
    sliderValueOutput.innerHTML = amountSlider.value;

    let totalOutput = document.getElementById("js-total-text")

    

    amountSlider.oninput = function() {
        sliderValueOutput.innerHTML = this.value;
        totalOutput.innerHTML = "Suma: " + (parseFloat(price) * parseInt(this.value)).toFixed(2) + " zł"
        payButton.style.display = "block"
    }

    
}