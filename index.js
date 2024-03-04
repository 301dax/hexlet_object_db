const shoppingCart = {
    items: [], // Массив товаров
    total: 0,  // Общая стоимость товаров
  
    // Метод добавления товара в корзину
    addItem: function(name, price, quantity) {
      const item = {
        name: name,
        price: price,
        quantity: quantity
      };

      this.items.push(item);

      this.calculateTotal(); // Обновляем общую стоимость
    },
  
    // Метод удаления товара из корзины по имени
    removeItem: function(name) {
      this.items = this.items.filter(item => item.name !== name);

      this.calculateTotal(); // Обновляем общую стоимость
    },
  
    // Метод обновления количества товара
    updateQuantity: function(name, quantity) {
      const item = this.items.find(item => item.name === name);

      if (item) {
        item.quantity = quantity;

        this.calculateTotal(); // Обновляем общую стоимость
      }
    },
  
    // Метод вычисления общей стоимости товаров в корзине
    calculateTotal: function() {
      this.total = this.items.reduce((totalCost, item) => totalCost + item.price * item.quantity, 0);
    },
  
    // Метод очистки корзины
    clearCart: function() {
      this.items = [];
      this.total = 0;
    },
  
    // Метод применения скидки
    applyDiscount: function(discountCode) {
      const discountRates = {
        'DISCOUNT10': 0.1, // 10% скидка
        'DISCOUNT20': 0.2  // 20% скидка
      };
      
      const discount = discountRates[discountCode];

      if (discount) {
        this.total = this.total * (1 - discount);
      }
    }
  };

module.exports = shoppingCart
