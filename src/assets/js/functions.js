export default {
    foo: function () { 
      console.log('foo')
    },
    _numberObjs: function (obj) {
      let x = Object.keys(obj).length
      return x
    },
    sum: function(_array, key) {
      return _array.reduce((a, b) => a + (b[key] || 0), 0)
    },
    arraySum: function(array) {
      let sum = 0
      for (let i = 0; i < array.length; i++) {
        sum += array[i]
      }
      return sum
    },
    _totalAmount: function() {      
      let prices = funcs.arraySum(this.orders_detail.filter(x => (x.unit_price > 0)).map(x => x.unit_price))
      let quantity = this.orders_detail.filter(x => (x.qty > 0)).map(x => x.qty)
      console.log(prices)
      console.log(quantity)
      return funcs.arraySum(prices)  * funcs.arraySum(quantity)      
    }
}