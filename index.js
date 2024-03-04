const EmployeeDB = {
  employees: [],

  addEmployee(employee) {
    this.employees.push(employee);
  },

  removeEmployee(name) {
    this.employees = this.employees.filter(employee => employee.name !== name);
  },

  updateEmployee(name, newDetails) {
    const index = this.employees.findIndex(employee => employee.name === name);

    if (index !== -1) {
      this.employees[index] = { ...this.employees[index], ...newDetails };
    }
  },

  readEmployees() {
    return this.employees;
  },

  capitalizeNames() {
    this.employees = this.employees.map(employee => ({
      ...employee,
      name: employee.name.split(' ')
        .map(namePart => namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase())
        .join(' ')
    }));
  },

  lowercaseDepartments() {
    this.employees = this.employees.map(employee => ({
      ...employee,
      department: employee.department.toLowerCase()
    }));
  },

  cloneDB() {
    return JSON.parse(JSON.stringify(this));
  },

  mergeDBs(otherDB) {
    this.employees = [...this.employees, ...otherDB.employees];
  },

  printUniqueDepartments() {
    const departments = new Set();

    for (const employee of this.employees) {
      departments.add(employee.department);
    }

    console.log([...departments]);
  },

  compareEmployees(employee1, employee2, fields) {
    for (const field of fields) {
      if (employee1[field] !== employee2[field]) {
        return false;
      }
    }
    
    return true;
  }
};

module.exports = EmployeeDB