const shoppingCart = require('./index.js');

// Очищаем корзину перед каждым тестом
beforeEach(() => {
  shoppingCart.clearCart();
});


test('Корзина пуста на старте', () => {
  expect(shoppingCart.items).toEqual([]);
  expect(shoppingCart.total).toBe(0);
});

test('Добавляем товар', () => {
  shoppingCart.addItem('Хлеб', 30, 1);
  expect(shoppingCart.items.length).toBe(1);
  expect(shoppingCart.total).toBe(30);
});

test('Удаляем товар', () => {
  shoppingCart.addItem('Хлеб', 30, 1);
  shoppingCart.removeItem('Хлеб');
  expect(shoppingCart.items).toEqual([]);
  expect(shoppingCart.total).toBe(0);
});

test('Обновляем кол-во товара, вычисляем стоймость при обновлении', () => {
  shoppingCart.addItem('Молоко', 50, 1);
  shoppingCart.updateQuantity('Молоко', 3);
  const milk = shoppingCart.items.find(item => item.name === 'Молоко');
  expect(milk.quantity).toBe(3);
  expect(shoppingCart.total).toBe(150); // 50 * 3
});

test('Вычисляем суммарную стоймость товаров', () => {
  shoppingCart.addItem('Хлеб', 30, 1);
  shoppingCart.addItem('Молоко', 50, 2);
  expect(shoppingCart.total).toBe(130); // 30 + 50 * 2
});

test('Очистка корзины', () => {
  shoppingCart.addItem('Хлеб', 30, 1);
  shoppingCart.addItem('Молоко', 50, 2);
  shoppingCart.clearCart();
  expect(shoppingCart.items).toEqual([]);
  expect(shoppingCart.total).toBe(0);
});

test('Применение валидной скидки', () => {
  shoppingCart.addItem('Молоко', 50, 2); //  100
  shoppingCart.applyDiscount('DISCOUNT10');
  expect(shoppingCart.total).toBe(90); // 100 - 10% = 90
});

test('Битая скидка', () => {
  shoppingCart.addItem('Молоко', 50, 2);
  shoppingCart.applyDiscount('НИКАКИХСКИДОК');
  expect(shoppingCart.total).toBe(100);
});