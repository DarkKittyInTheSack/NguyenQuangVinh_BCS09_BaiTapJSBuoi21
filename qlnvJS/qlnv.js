
var employeeArr = [
    "tknv",
    "name",
    "email",
    "password",
    "datepicker",
    "luongCB",
    "chucvu",
    "gioLam"
]

var spanEmployeeArr = [
    "tbTKNV",
    "tbTen",
    "tbEmail",
    "tbMatKhau",
    "tbNgay",
    "tbLuongCB",
    "tbChucVu",
    "tbGioLam"
]

var employeeArray = []

function addToLocalStorage(dataStr,data){
    localStorage.setItem(dataStr, JSON.stringify(data))
}

function getFromLocalStorage(key){
    var employeeList =  JSON.parse(localStorage.getItem(key))

    if(employeeList){
        employeeArray = employeeList
        renderData(employeeArray)
    }
}

function removeFromLocalStorage(key){
    localStorage.removeItem(key)
}

getFromLocalStorage('employeeArray')

function calculateTotalSalary(inputRole, inputSalary){
    switch(inputRole){
        case "Sếp":
            return (inputSalary *3).toLocaleString('it-IT',{style: 'currency', currency: 'VND'})

        case "Trưởng phòng":
            return (inputSalary *2).toLocaleString('it-IT',{style: 'currency', currency: 'VND'})

        case "Nhân viên":


        
            return inputSalary.toLocaleString('it-IT',{style: 'currency', currency: 'VND'})
    }
}

function calculateEmployeeRank(inputHour){
    if(inputHour >= 192){
        return "Nhân viên xuất sắc"
    }else if(inputHour < 192 && inputHour >= 176){
        return "Nhân viên giỏi"
    }else if(inputHour < 176 && inputHour >= 160){
        return "Nhân viên khá"
    }else{
        return "Nhân viên trung bình"
    }
}

function getEmployee(){
    var isValid = true
    var employee = new Employee()
    for(i = 0;  i < employeeArr.length; i++){
        var input = document.getElementById(employeeArr[i]).value
        employee[employeeArr[i]] = input

        if(employeeArr[i] == "password"){
            isValid &= checkPassword(input,spanEmployeeArr[i],6,10) && checkNull(input,spanEmployeeArr[i]);
        }
        else if(employeeArr[i] == "tknv"){
            isValid &= checkAccount(input, spanEmployeeArr[i]) && checkNull(input,spanEmployeeArr[i]);
        }else if(employeeArr[i] == "name"){
            isValid &= checkName(input,spanEmployeeArr[i]) && checkNull(input,spanEmployeeArr[i]);
        }else if(employeeArr[i] == "email"){
            isValid &= checkEmail(input,spanEmployeeArr[i]) && checkNull(input,spanEmployeeArr[i]);
        }else if(employeeArr[i] == "luongCB"){
            isValid &= checkBaseSalary(input,spanEmployeeArr[i]) && checkNull(input,spanEmployeeArr[i]);
        }else if(employeeArr[i] =="chucvu"){
            isValid &= checkRole(input,spanEmployeeArr[i]) && checkNull(input,spanEmployeeArr[i]);
        }else if(employeeArr[i] == "giolam"){
            isValid &= checkWorkingTime(input,spanEmployeeArr[i])  && checkNull(input,spanEmployeeArr[i]);
        }else if(employeeArr[i] == "datepicker"){
            isValid &= checkNull(input,spanEmployeeArr[i]);
        }
    }
    
    console.log(employee)
    if(isValid){
        return employee
    }
}

function renderData(employeeArrays){
    var array = employeeArray

    if(!employeeArrays){
        employeeArray = employeeArrays
    }

    var content  = ''
        for(i = 0; i < array.length; i++){
            var employee = new Employee()
            var getEmployee = array[i]
            Object.assign(employee,getEmployee)

            content += `
                <tr>
                    <td>${employee.tknv}</td>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.datepicker}</td>
                    <td>${employee.chucvu}</td>
                    <td>${calculateTotalSalary(employee.chucvu,employee.luongCB)}</td>
                    <td>${calculateEmployeeRank(employee.gioLam)}</td>
                    <td>
                        <button onclick="deleteEmployee('${employee.tknv}')" class="btn btn-danger">Xoá</button>
                        <button class="btn btn-dark edit" onclick="editEmployee('${employee.tknv}')" data-toggle="modal"
                        data-target="#myModal">Sửa</button>
                    </td>
                </tr>
            `

            document.getElementById('tableDanhSach').innerHTML = content
        }
}


function addEmployee(){
    event.preventDefault()
    var employee = getEmployee()
    console.log(employee)
    if(employee){
        employeeArray.push(employee)
        alert('Thêm nhân viên thành công')
        addToLocalStorage('employeeArray',employeeArray)
        renderData(employeeArray)
    }else{
        alert('Không thể thêm nhân viên')
    }

    document.querySelector('#form').reset()
}

function deleteEmployee(employeeID){
    var index = -1
    for(i = 0; i < employeeArray.length; i++){
        var employee = employeeArray[i]
        if(employee.tknv == employeeID){
            index = i
        }
    }

    if(index!= -1){
        employeeArray.splice(index,1)
        removeFromLocalStorage('employeeArray')
        addToLocalStorage('employeeArray',employeeArray)
        getFromLocalStorage('employeeArray')

        alert('Đã xóa thành công thông tin nhân viên')
    }else{
        alert('Không thể xóa thông tin nhân viên này')
    }
    
}

document.querySelector('#btnThem').addEventListener('click',function(){
    document.querySelector('#form').reset()
    document.getElementById('tknv').readOnly = false
    document.getElementById('password').readOnly = false
})

document.querySelector('#btnThemNV').addEventListener('click',function(){
    addEmployee()
})

function editEmployee(employeeID){

    var employee = {}
    for(i = 0; i < employeeArray.length; i++){
        if(employeeArray[i].tknv == employeeID){
            employee = employeeArray[i]
        }
    }

    for(i = 0; i < employeeArr.length; i++){
        document.getElementById(employeeArr[i]).value = employee[employeeArr[i]]
        if(employeeArr[i] == 'tknv'){
            document.getElementById(employeeArr[i]).readOnly = true 
        } else if(employeeArr[i] == 'password'){
            document.getElementById(employeeArr[i]).readOnly = true 
        }
    }
}


function updateEmployee(){
    var employee = getEmployee(), index = -1

    for(i = 0; i < employeeArray.length; i++){
        if(employee.tknv == employeeArray[i].tknv){
            index = i
        }
    }

    if(index != -1){
        employeeArray[index] = employee

        removeFromLocalStorage('employeeArray')
        addToLocalStorage('employeeArray',employeeArray)
        renderData(employeeArray)

        alert("Cập nhật thông tin thành công")
    }else{
        alert('Cập nhật thông tin thất bại')
    }
    
}

document.getElementById('btnCapNhat').addEventListener('click',function(){
    updateEmployee()
    
})

function searchByRank(input){
    var rankEmployee = []
  
    for(i = 0; i < employeeArray.length; i++ ){
        var employeeRank = removeVietnameseTones(calculateEmployeeRank(employeeArray[i].gioLam).toLowerCase().trim())
        if(employeeRank.includes(input.toLowerCase().trim())){
            rankEmployee.push(employeeArray[i])
        }
    }

    // renderData(rankEmployee)

    var content  = ''
        for(i = 0; i < rankEmployee.length; i++){
            var employee = new Employee()
            var getEmployee = rankEmployee[i]
            Object.assign(employee,getEmployee)

            content += `
                <tr>
                    <td>${employee.tknv}</td>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.datepicker}</td>
                    <td>${employee.chucvu}</td>
                    <td>${calculateTotalSalary(employee.chucvu,employee.luongCB)}</td>
                    <td>${calculateEmployeeRank(employee.gioLam)}</td>
                    <td>
                        <button onclick="deleteEmployee('${employee.tknv}')" class="btn btn-danger">Xoá</button>
                        <button class="btn btn-dark edit" onclick="editEmployee('${employee.tknv}')" data-toggle="modal"
                        data-target="#myModal">Sửa</button>
                    </td>
                </tr>
            `
            document.getElementById('tableDanhSach').innerHTML = content
        }
}

document.getElementById('btnTimNV').addEventListener('click',function(){
    searchByRank(document.getElementById('searchName').value)
})

