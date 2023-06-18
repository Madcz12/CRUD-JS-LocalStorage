function validateForm() {
    let email = document.getElementById('inputEmail').value;
    let name = document.getElementById('inputName').value;
    let phone = document.getElementById('inputPhone').value;

    if (email == "") {
        alert('El Campo Correo es Requerido');
        return false;
    } else if (!email.includes('@')) {
        alert('El Correo No es Valido');
        return false;
    }

    if (name == "") {
        alert('El Campo Nombre es Requerido');
        return false;
    }
    if (email == "") {
        alert('El Campo Telefono es Requerido');
        return false;
    }

    return true;
}

// read 

function ReadData() {
    let listPeople;

    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    var html = "";

    listPeople.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.phone + "</td>";
        html += '<td><button onClick="deleteData(' + index + ')" class="btn btn-danger">Eliminar Dato</button> <button onClick="editData(' + index + ')" class="btn btn-warning">Editar Dato</button>';
        html += "</tr>";
    });
    console.log(html);
    document.getElementById('tableData').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function () {
    ReadData();
});

function AddData() {
    if (validateForm() == true) {
        let email = document.getElementById('inputEmail').value;
        let name = document.getElementById('inputName').value;
        let phone = document.getElementById('inputPhone').value;

        var listPeople;

        if (localStorage.getItem('listPeople') == null) {
            listPeople = [];
        } else {
            listPeople = JSON.parse(localStorage.getItem('listPeople'));
        }
        listPeople.push({
            email: email,
            name: name,
            phone: phone
        });

        localStorage.setItem('listPeople', JSON.stringify(listPeople));
        console.log(listPeople);
        ReadData();
        document.getElementById('inputEmail').value = "";
        document.getElementById('inputName').value = "";
        document.getElementById('inputPhone').value = "";
    }
}

function deleteData(index) {
    let listPeople;

    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    listPeople.splice(index, 1);
    localStorage.setItem('listPeople', JSON.stringify(listPeople));

    ReadData();
}

function editData(index) {
    document.getElementById('btnAdd').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'block';

    let listPeople;

    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    document.getElementById('inputEmail').value = listPeople[index].email;
    document.getElementById('inputName').value = listPeople[index].name;
    document.getElementById('inputPhone').value = listPeople[index].phone;

    document.getElementById('btnUpdate').onclick = function () {
        if (validateForm() == true) {
            listPeople[index].email = document.getElementById('inputEmail').value;
            listPeople[index].name = document.getElementById('inputName').value;
            listPeople[index].phone = document.getElementById('inputPhone').value;
            localStorage.setItem('listPeople', JSON.stringify(listPeople));
            ReadData();
            document.getElementById('inputEmail').value = "";
            document.getElementById('inputName').value = "";
            document.getElementById('inputPhone').value = "";

            document.getElementById('btnAdd').style.display = 'block';
            document.getElementById('btnUpdate').style.display = 'none';
        }
    }
}

