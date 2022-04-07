$(document).ready(() => {
    let path = window.location.pathname;
    switch (path) {
        case "/issues":
            $("#issuesForm").submit((event) => insertIssue(event));
            fillTechniciansSelect();
            loadIssuesTable();
            break;
        case "/technicians":
            $("#techniciansForm").submit((event) => insertTechnician(event));
            loadTechniciansTable();
            break;
    }
})

function request(url, type, data, callback) {
    let jqxhr = $.ajax({
        url: url,
        type: type,
        data: data
    });
    jqxhr.done((data) => callback(data));
    jqxhr.fail(err => {
        console.error(err);
        Swal.fire("Error", err.responseText, "error");
    });
}

// insert technician names into select element
function fillTechniciansSelect() {
    $("#technicians").html("<option value=''></option>");
    $("#technicians").select2({placeholder: "Select a technician"});
    request("/technicians/all", "GET", null, data => {
        let options = "";
        for (let i = 0; i < data.length; i++) {
            let name = `${data[i].first_name} ${data[i].last_name}`;
            options += `<option value="${name}">${name}</option>`;
        }
        $("#technicians").append(options);
    });
}

// ------------------- DISPLAYING TABLES -------------------
function loadIssuesTable() {
    request("/issues/all", "GET", null, data => {
        let table = "";
        for (let i = 0; i < data.length; i++) {
            table += `<tr>
                        <td>${data[i].description}</td>
                        <td>${data[i].severity}</td>
                        <td>${data[i].status}</td>
                        <td>${data[i].assigned_to}</td>
                        <td>
                            <i onclick="deleteIssue(${data[i].id})" class="fa fa-trash"></i>
                            <i onclick="updateIssue(${data[i].id})" class="fa fa-refresh"></i>
                        </td>
                    </tr>`;
        }
        $("#dataTable").html(table);
    });
}

function loadTechniciansTable() {
    request("/technicians/all", "GET", null, data => {
        let table = "", name;
        for (let i = 0; i < data.length; i++) {
            name = `${data[i].first_name} ${data[i].last_name}`;
            table += `<tr>
                        <td>${name}</td>
                        <td>${data[i].email}</td>
                        <td>${data[i].phone_number}</td>
                        <td>
                            <i onclick="deleteTechnician(${data[i].id})" class="fa fa-trash"></i>
                            <i onclick="updateTechnician(${data[i].id})" class="fa fa-refresh"></i>
                        </td>
                    </tr>`;
        }
        $("#dataTable").html(table);
    });
}

// ------------------- INSERTING -------------------
function insertIssue(event) {
    event.preventDefault();
    let issue = {
        description: $("#description").val().trim(),
        severity: $("#severity").val(),
        status: $("#status").val(),
        assigned_to: $("#technicians").val()
    }
    request("/issues/create", "POST", issue, () => {
        Swal.fire("Success", "Issue Was Submitted", "success");
        loadIssuesTable();
        document.getElementById("issuesForm").reset();
    });
}
function insertTechnician(event) {
    event.preventDefault();
    let technician = {
        first_name: $("#firstName").val().trim(),
        last_name: $("#lastName").val().trim(),
        email: $("#email").val().trim(),
        phone_number: $("#phone").val().trim()
    }
    request("/technicians/create", "POST", technician, () => {
        Swal.fire("Success", "Technician Was Added", "success");
        loadTechniciansTable();
        document.getElementById("techniciansForm").reset();
    });
}

// ------------------- DELETING -------------------
function deleteIssue(id) {
    request(`/issues/delete?id=${id}`, "DELETE", null, () => {
        Swal.fire("Success", "Issue Was Deleted", "success");
        loadIssuesTable();
    });
}
function deleteTechnician(id) {
    request(`/technicians/delete?id=${id}`, "DELETE", null, () => {
        Swal.fire("Success", "Technician Was Deleted", "success");
        loadTechniciansTable();
    });
}

// ------------------- UPDATING -------------------
function updateIssue(id) {
    request(`/issues/findByPk?id=${id}`, "GET", null, data => {
        let issue = data;
        Swal.fire({
            title: `Update Issue: ${issue.description}`,
            html: `
            <label for="input1-swal">Description</label>
            <input type="text" id="input1-swal" class="form-control" value="${issue.description}">
            <label for="input2-swal">Severity</label>
            <select id="input2-swal" class="form-control">
                <option value="" hidden>Select a Severity</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <label for="input3-swal">Status</label>
            <select id="input3-swal" class="form-control">
                <option value="" hidden>Select A Status</option>
                <option value="Opened">Opened</option>
                <option value="Closed">Closed</option>
            </select>
            <label for="input4-swal">Assigned to technician</label>
            <select id="input4-swal" class="form-control"></select>
            `,
            showCancelButton: true,
            confirmButtonText: "Update Issue",
            preConfirm: () => {
                let description = $("#input1-swal").val().trim();
                let severity = $("#input2-swal").val();
                let status = $("#input3-swal").val();
                let assigned_to = $("#input4-swal").val();
                if (!description || !severity || !status || !assigned_to) 
                    Swal.showValidationMessage("Please Fill All Fields");
            }
        }).then(result => {
            if (result.isConfirmed) {
                let issue = {
                    description: $("#input1-swal").val().trim(),
                    severity: $("#input2-swal").val(),
                    status: $("#input3-swal").val(),
                    assigned_to: $("#input4-swal").val(),
                    id: id
                };
                request(`/issues/update`, "PUT", issue, data => {
                    Swal.fire("Success", "Issue Was Updated", "success");
                    loadIssuesTable();
                })
            }
        })
        fillUpdateIssuesFormValues(issue);
    })
}
function updateTechnician(id) {
    request(`/technicians/findByPk?id=${id}`, "GET", null, data => {
        let technician = data;
        Swal.fire({
            title: `Update Technician: ${technician.first_name} ${technician.last_name}`,
            html: `
            <label for="input1-swal">First Name</label>
            <input type="text" id="input1-swal" class="form-control" value="${technician.first_name}">
            <label for="input2-swal">Last Name</label>
            <input type="text" id="input2-swal" class="form-control" value="${technician.last_name}">
            <label for="input3-swal">Email</label>
            <input type="email" id="input3-swal" class="form-control" value="${technician.email}">
            <label for="input4-swal">Phone Number</label>
            <input type="tel" id="input4-swal" class="form-control" value="${technician.phone_number}">
            `,
            showCancelButton: true,
            confirmButtonText: "Update Technician",
            preConfirm: () => {
                let first_name = $("#input1-swal").val().trim();
                let last_name = $("#input2-swal").val().trim();
                let email = $("#input3-swal").val().trim();
                let phone_number = $("#input4-swal").val().trim();
                if (!first_name || !last_name || !email || !phone_number) 
                    Swal.showValidationMessage("Please Fill All Fields");
            }
        }).then(result => {
            if (result.isConfirmed) {
                let technician = {
                    first_name: $("#input1-swal").val().trim(),
                    last_name: $("#input2-swal").val().trim(),
                    email: $("#input3-swal").val().trim(),
                    phone_number: $("#input4-swal").val().trim(),
                    id: id
                };
                request(`/technicians/update`, "PUT", technician, data => {
                    Swal.fire("Success", "Technician Was Updated", "success");
                    loadTechniciansTable();
                })
            }
        });
    })
}

// this enters the values into the select elements on the issues update form
function fillUpdateIssuesFormValues(issue) {
    $("#input4-swal").html("<option value=''></option>");
    request("/technicians/all", "GET", null, data => {
        let options = "";
        for (let i = 0; i < data.length; i++) {
            let name = `${data[i].first_name} ${data[i].last_name}`;
            options += `<option value="${name}">${name}</option>`;
        }
        $("#input4-swal").append(options);
        // $("#input4-swal").select2({placeholder: "Select a technician"});
        $("#input4-swal").val(issue.assigned_to).trigger("change");
    });
    $("#input2-swal").val(issue.severity);
    $("#input3-swal").val(issue.status);
}