function checkCashRegister(price, cash, cid) {
    const exchangeRate = {
      "PENNY": 0.01,
      "NICKEL": 0.05,
      "DIME": 0.1,
      "QUARTER": 0.25,
      "ONE": 1,
      "FIVE": 5,
      "TEN": 10,
      "TWENTY": 20,
      "ONE HUNDRED": 100
    };
    let res = {
      'status': 'OPEN',
      'change': []
    }
    let change = cash - price;
    const allCid = {};
    cid.map(el =>  allCid[el[0]] = el[1])
    let sumCid = rounding(Object.values(allCid).reduce((a, b) => a + b));
    if (change > sumCid){
      res.status = 'INSUFFICIENT_FUNDS';
      return res;
    }
    const keys = Object.keys(exchangeRate);
    let index = keys.length-1;
    while (change > 0 && index >= 0){
      let count = 0;
      while (change - exchangeRate[keys[index]] >= 0 && allCid[keys[index]]){
        // console.log(allCid[keys[index]], sumCid);
        change = rounding(change - exchangeRate[keys[index]]);
        sumCid = rounding(sumCid - exchangeRate[keys[index]]);
        allCid[keys[index]] = rounding(allCid[keys[index]] - exchangeRate[keys[index]]);
        count++;

      }
      if (count){
        res.change.push([keys[index], count*exchangeRate[keys[index]]]);
      }
      index--;
    }
    // console.log(sumCid);
    if (change){
      res.status = 'INSUFFICIENT_FUNDS';
      res.change = [];
      return res;
    }
    
    else if (sumCid <= 0){
      res.status = 'CLOSED';
      res.change = cid;
    }
    return res;
  }
  
  function rounding(num){
    return Math.round(num * 100)/100
  }
  
  // let a = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
  // let b = checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
  // let c = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
  let d = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
  // console.log(JSON.stringify(a));
  // console.log(JSON.stringify(b));
  // console.log(JSON.stringify(c));
  console.log(JSON.stringify(d));