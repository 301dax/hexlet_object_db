const EmployeeDB = require('./index.js'); // Подключаем модуль с объектом EmployeeDB

describe('EmployeeDB', () => {
  beforeEach(() => {
    EmployeeDB.employees = [];
  });

  test('Добавление сотрудника', () => {
    EmployeeDB.addEmployee({ name: 'Иван Иванов', position: 'Developer', department: 'IT' });
    expect(EmployeeDB.employees).toHaveLength(1);
    expect(EmployeeDB.employees[0].name).toBe('Иван Иванов');
  });

  test('Удаление сотрудника по имени', () => {
    EmployeeDB.addEmployee({ name: 'Иван Иванов', position: 'Developer', department: 'IT' });
    EmployeeDB.removeEmployee('Иван Иванов');
    expect(EmployeeDB.employees).toHaveLength(0);
  });

  test('Обновление информации о сотруднике', () => {
    EmployeeDB.addEmployee({ name: 'Иванка Иванова', position: 'Designer', department: 'Creative' });
    EmployeeDB.updateEmployee('Иванка Иванова', { position: 'Lead Designer' });
    expect(EmployeeDB.employees[0].position).toBe('Lead Designer');
  });

  test('Капитализация имен сотрудников', () => {
    EmployeeDB.addEmployee({ name: 'Иван Иванов', position: 'Developer', department: 'IT' });
    EmployeeDB.capitalizeNames();
    expect(EmployeeDB.employees[0].name).toBe('Иван Иванов');
  });

  test('Приведение названий отделов к нижнему регистру', () => {
    EmployeeDB.addEmployee({ name: 'Иванка Иванова', position: 'Designer', department: 'Creative' });
    EmployeeDB.lowercaseDepartments();
    expect(EmployeeDB.employees[0].department).toBe('creative');
  });

  test('Клонирование базы данных сотрудников', () => {
    EmployeeDB.addEmployee({ name: 'Алиса Селезнёва', position: 'HR Manager', department: 'HR' });
    const clonedDB = EmployeeDB.cloneDB();
    expect(clonedDB.employees).toEqual(EmployeeDB.employees);
    expect(clonedDB.employees).not.toBe(EmployeeDB.employees); // Проверка, что это не один и тот же массив
  });

  test('Слияние двух баз данных сотрудников', () => {
    const otherDB = {
      employees: [
        { name: 'Сергей Посадов', position: 'Accountant', department: 'Finance' }
      ]
    };
    EmployeeDB.addEmployee({ name: 'Алиса Селезнёва', position: 'HR Manager', department: 'HR' });
    EmployeeDB.mergeDBs(otherDB);
    expect(EmployeeDB.employees).toHaveLength(2);
  });

  test('Сравнение сотрудников', () => {
    const employee1 = { name: 'Алиса Селезнёва', department: 'HR' };
    const employee2 = { name: 'Алиса Селезнёва', department: 'HR' };
    const areEqual = EmployeeDB.compareEmployees(employee1, employee2, ['name', 'department']);
    expect(areEqual).toBe(true);
  });
});