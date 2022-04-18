class EmployeePayrollData {

    get id() {
        return this._id;
    }
  
    set id(id) {
        this._id = id;
    }
  
    get name() {
        return this._name;
    }
  
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$');
        if (nameRegex.test(name))
            this._name = name;
        else
            throw "Invalid NAME";
    }
  
    get profileImage() {
        return this._profileImage;
    }
  
    set profileImage(profileImage) {
        this._profileImage = profileImage;
    }
  
    get gender() {
        return this._gender;
    }
  
    set gender(gender) {
        this._gender = gender;
    }
  
    get department() {
        return this._department;
    }
  
    set department(department) {
        this._department = department;
    }
  
    get salary() {
        return this._salary;
    }
  
    set salary(salary) {
        this._salary = salary;
  
    }
  
    get startDate() {
        return this._startDate;
    }
  
    set startDate(startDate) {
        let now = new Date();
        if (startDate > now)
          throw 'Start Date is future date';
        var diff = Math.abs(now.getTime() - startDate.getTime());
        if (diff / (1000 * 60 * 60 * 24) > 30)
          throw 'Start date is beyond 30 days';
        this._startDate = startDate;
    }
  
    get notes() {
        return this._notes;
    }
  
    set notes(notes) {
        this._notes = notes;
    }
  
    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const employeeDate = this.startDate == undefined ? "undefined" : this.startDate.toLocaleDateString("en-US", options);
        return "Id : " + this.id + 
               ", Name : " + this.name + 
               ", Profile Image : " + this.profileImage + 
               ", Gender : " + this.gender + 
               ", Department : " + this.department + 
               ", Salary : " + this.salary + 
               ", Start Date : " + employeeDate + 
               ", Notes : " + this.notes;
    }
  }