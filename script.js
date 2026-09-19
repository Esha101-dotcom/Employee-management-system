// login

function openLogin() {
window.location.href = "login.html";
}

function login() {

    let username = document.getElementById("loginUser").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    if (username === "") {
        alert("Please enter username");
        return;
    }

    if (password === "") {
        alert("Please enter password");
        return;
    }

    document.getElementById("loginpage").style.display = "none";
    document.getElementById("app").style.display = "flex";
}


// Start mein app hide

document.getElementById("app").style.display = "none";


// employee data

let employees = [
    {
        id: "EMP001",
          name: "Ali Khan",
        email: "ali@gmail.com",
        phone: "03001234567",
        department: "Engineering",
        position: "Software Developer",
        salary: 80000,
        joiningDate: "2026-01-10",
        status: "Active"
    },
      {
        id: "EMP002",
        name: "Sara Ahmed",
        email: "sara@gmail.com",
        phone: "03111234567",
        department: "Finance",
        position: "Accountant",
        salary: 70000,
        joiningDate: "2026-02-15",
        status: "Inactive"
    },

        {
        id: "EMP002",
        name: "Esha khan",
        email: "esha@gmail.com",
        phone: "03181127735",
        department: "Finance",
        position: "Accountant",
        salary: 70000,
        joiningDate: "2026-02-15",
        status: "Active"
    }
];

// display employees

function displayEmployees() {
    let table = document.getElementById("employeeTable");

    table.innerHTML = "";
    employees.forEach(function(employee, index){
        let statusClass = "";

        if (employee.status === "Active") {
            statusClass = "active-status";
        }
        else if ( employee.status === "Inactive"){
            statusClass = "inactive-status ";
        }
        else {
              statusClass = "probation-status";
        }
        
         table.innerHTML += `
            <tr>

                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.phone}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td>${employee.salary}</td>
                <td>${employee.joiningDate}</td>

                <td>
                    <span class="status ${statusClass}">
                        ${employee.status}
                    </span>
                </td>

                <td>

                    <button
                        class="action-btn"
                        onclick="viewEmployee(${index})">
                        👁
                    </button>

                    <button
                        class="action-btn"
                        onclick="editEmployee(${index})">
                        ✏
                    </button>

                    <button
                        class="action-btn"
                        onclick="deleteEmployee(${index})">
                        🗑
                    </button>

                </td>

            </tr>
        `;
    });

    updateDashboard();
}

// updateDashboard

function updateDashboard() {
    let total = employees.length;
    let active = 0;
    let inactive = 0;

    employees.forEach(function (employee) {
        if (employee.status === "Active") {
            active++;
        }
        if(employee.status === "Inactive"){
            inactive++;
        }
    });


    let departments = [];
    employees.forEach(function(employee){
        if(!departments.includes(employee.department)){
            departments.push(employee.department);
        }
    });

    document.getElementById("totalEmployees").innerText = total;
    document.getElementById("activeEmployees").innerText = active;
    document.getElementById("inactiveEmployees").innerText = inactive;
    document.getElementById("totalDepartments").innerText =  departments.length;
};

// open add employee


function openEmployee() {
    document.getElementById("employee").style.display = "flex";
    document.getElementById("modalTitle").innerText = "Add Employee";
    document.querySelector(".employeeform").reset();
    document.getElementById("editIndex").value = "";
    document.getElementById("formError").innerText = "";
}

// close employee

function closeEmployee() {

    document.getElementById("employee").style.display = "none";
}

// add employee

document.querySelector(".employeeform").addEventListener("submit",function(event){
    event.preventDefault();

    let id = document.getElementById("employeid").value;
         let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let department = document.getElementById("department").value;
        let position = document.getElementById("position").value;
        let salary = document.getElementById("salary").value;
        let joiningDate = document.getElementById("joiningDate").value;
        let status = document.getElementById("status").value;

        let error = document.getElementById("formError");

        // empty field check

        if(
            id === "" ||
               name === "" ||
            email === "" ||
            phone === "" ||
            department === "" ||
            position === "" ||
            salary === "" ||
            joiningDate === "" ||
            status === ""
        ){
            error.innerText = "Please fill all fields";
            return;
        }

        // employee object

        let employee = {
            id: id,
             name: name,
            email: email,
            phone: phone,
            department: department,
            position: position,
            salary: salary,
            joiningDate: joiningDate,
            status: status
        };

        // check edit or add

        let editIndex = document.getElementById("editIndex").value;

        if(editIndex === ""){
            // add
            employees.push(employee);
        }
        else{
            // edit
            employees[editIndex] = employee;
        }

        
        displayEmployees();

        closeEmployee();
});


// edit employee

function editEmployee(index) {
    
    let employee = employees[index];

    document.getElementById("employee").style.display = "flex";
    document.getElementById("modalTitle").innerText =   "Edit Employee";
    document.getElementById("editIndex").value = index;
    document.getElementById("employeid").value = employee.id;
    document.getElementById("name").value =employee.name;
    document.getElementById("email").value = employee.email;
    document.getElementById("phone").value = employee.phone;
    document.getElementById("department").value =employee.department;
    document.getElementById("position").value =employee.position;
    document.getElementById("salary").value = employee.salary;
    document.getElementById("joiningDate").value = employee.joiningDate;
    document.getElementById("status").value = employee.status;
}

// delete employee

function deleteEmployee(index) {
       let answer = confirm(
        "Are you sure you want to delete this employee?"
    );
       if (answer === true) {

        employees.splice(index, 1);

        displayEmployees();
    }
}

// view employee

function viewEmployee(index) {
    
    let employee = employees[index];

    alert(
        "Employee ID: " + employee.id +
        "\nName:" + employee.name +
         "\nEmail: " + employee.email +
        "\nPhone: " + employee.phone +
        "\nDepartment: " + employee.department +
        "\nPosition: " + employee.position +
        "\nSalary: " + employee.salary +
        "\nJoining Date: " + employee.joiningDate +
        "\nStatus: " + employee.status
    );
};




// Search employee

document.getElementById("search").addEventListener("input", function () {

    let searchValue = this.value.toLowerCase();

    let rows = document.querySelectorAll("#employeeTable tr");

    rows.forEach(function(row) {

        let text = row.innerText.toLowerCase();

        if (text.includes(searchValue)) {
            row.style.display = "";
        }
        else {
            row.style.display = "none";
        }

    });

});
// start

        displayEmployees();

