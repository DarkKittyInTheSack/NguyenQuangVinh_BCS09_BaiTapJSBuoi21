function checkAccount(input, spanId){
    if(input.length > 6 && input.length < 4){
        document.getElementById(spanId).innerHTML = "Vui lòng chỉ nhập từ 4 đến 6 ký tự"
        return false
    }else{
        document.getElementById(spanId).innerHTML = ""
        return true
    }
}

function checkName(input, spanId){
    var strRegex = /^[A-Za-z\s]*$/
    if(strRegex.test(input)){
        document.getElementById(spanId).innerHTML = ""
        return true
    }else{
        document.getElementById(spanId).innerHTML = "Vui lòng nhập họ và tên hợp lệ"
        return false
    }
}

function checkEmail(input, spanId){
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!emailRegex.test(input)){
        document.getElementById(spanId).innerHTML = "Vui lòng nhập email hợp lệ"
        return false
    }else{
        document.getElementById(spanId).innerHTML = ""
        return true
    }
}

function checkPassword(input, spanId, min, max){
    if(input.length >= min && input.length <= max){
        document.getElementById(spanId).innerHTML = ""
        return true
    }else{
        document.getElementById(spanId).innerHTML = `Vui lòng nhập từ ${min} đến ${max} ký tự`
        return false
    }
}

function checkBaseSalary(input,spanId){
    if(input.length > 20000000 && input.length < 1000000){
        document.getElementById(spanId).innerHTML = "Vui lòng nhập mức lương cơ bản từ 6 đến 10 ký tự"
        return false
    }else{
        document.getElementById(spanId).innerHTML = ""
        return true
    }
}

function checkRole(input,spanId){
    if(input == ""){
        document.getElementById(spanId).innerHTML = "Vui lòng chọn chức vụ hợp lệ"
        return false
    }else{
        document.getElementById(spanId).innerHTML = ""
        return true
    }
}

function checkWorkingTime(input,spanId){
    if(input < 80 && input > 200){
        document.getElementById(spanId).innerHTML = "Vui lòng nhập số giờ làm hợp lệ"
        return false
    }else{
        document.getElementById(spanId).innerHTML = ""
        return true
    }
}

function checkNull(input, spanId){
    if(input == ''){
        document.getElementById(spanId).innerHTML = "Vui lòng không được để trống"
        return false
    }else{
        document.getElementById(spanId).innerHTML = ''
        return true
    }
}
