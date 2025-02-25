document.addEventListener("DOMContentLoaded", () => {
    loadStudent();
    searchLoadStudent();
});

function loadStudent(){
    fetch("http://localhost:8080/student/get-all")
    .then(res => res.json())
    .then(data => {
        console.log(data);

        let tableRow = `
                <tr>
                    <th></th>
                    <th>Index Number</th>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Phone Number</th>
                </tr>
        `;
        let tableHeader = "";
        let studentTable = document.getElementById("tblStudents");

        data.forEach(student => {
            tableRow += `

                <tr>
                    <td>${student.id}</td>
                    <td>${student.indexnumber}</td>
                    <td>${student.name}</td>
                    <td>${student.dob}</td>
                    <td>${student.phoneNumber}</td>
                </tr>
            `;
        });

        studentTable.innerHTML = tableRow;
    })
}

function addStudent(){
    let name = document.getElementById("txtName").value;
    let dob = document.getElementById("txtDob").value;
    let indexnumber = document.getElementById("txtIndexNumber").value;
    let phoneNumber = document.getElementById("txtPhoneNumber").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "name": name,
        "indexnumber": indexnumber,
        "dob": dob,
        "phoneNumber": phoneNumber
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:8080/student/add", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            // SweetAlert on success
            Swal.fire({
                title: 'Success!',
                text: 'Student added successfully!',
                icon: 'success',
                confirmButtonText: 'Okay'
            });
        })
        .catch((error) => {
            console.error(error);
            // SweetAlert on error
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        });
}

function updateStudent() {
    let id = document.getElementById("updatetxtId").value;
    let name = document.getElementById("updatetxtName").value;
    let dob = document.getElementById("updatetxtDob").value;
    let indexnumber = document.getElementById("updatetxtIndexNumber").value;
    let phoneNumber = document.getElementById("updatetxtPhoneNumber").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "id": id,
        "name": name,
        "dob": dob,
        "indexnumber": indexnumber,
        "phoneNumber": phoneNumber
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:8080/student/update-student", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            // SweetAlert on success
            Swal.fire({
                title: 'Success!',
                text: 'Student details updated successfully!',
                icon: 'success',
                confirmButtonText: 'Okay'
            });
        })
        .catch((error) => {
            console.error(error);
            // SweetAlert on error
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        });
}

function updateSetValues() {
    let id = document.getElementById("updatetxtId").value;

    if (!id) {
        // SweetAlert on missing ID
        Swal.fire({
            title: 'Warning!',
            text: 'Please enter an ID!',
            icon: 'warning',
            confirmButtonText: 'Okay'
        });
        return;
    }

    fetch(`http://localhost:8080/student/search-by-id/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Student not found");
            }
            return response.json();
        })
        .then(data => {
            if (data.indexnumber === null) {
                // SweetAlert if index number is not available
                Swal.fire({
                    title: 'Warning!',
                    text: 'Index number is not available!',
                    icon: 'warning',
                    confirmButtonText: 'Okay'
                });
            }

            document.getElementById("updatetxtName").value = data.name || "";
            document.getElementById("updatetxtIndexNumber").value = data.indexnumber || "";
            document.getElementById("updatetxtDob").value = data.dob || "";
            document.getElementById("updatetxtPhoneNumber").value = data.phoneNumber || "";
        })
        .catch(error => {
            console.error(error);
            // SweetAlert on error
            Swal.fire({
                title: 'Error!',
                text: 'Student not found or an error occurred!',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        });
}

function deleteSetValues() {
    let id = document.getElementById("deletetxtId").value;

    if (!id) {
        // SweetAlert on missing ID
        Swal.fire({
            title: 'Warning!',
            text: 'Please enter an ID!',
            icon: 'warning',
            confirmButtonText: 'Okay'
        });
        return;
    }

    fetch(`http://localhost:8080/student/search-by-id/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Student not found");
            }
            return response.json();
        })
        .then(data => {
            if (data.indexnumber === null) {
                // SweetAlert if index number is not available
                Swal.fire({
                    title: 'Warning!',
                    text: 'Index number is not available!',
                    icon: 'warning',
                    confirmButtonText: 'Okay'
                });
            }

            document.getElementById("deletetxtName").value = data.name || "";
            document.getElementById("deletetxtIndexNumber").value = data.indexnumber || "";
            document.getElementById("deletetxtDob").value = data.dob || "";
            document.getElementById("deletetxtPhoneNumber").value = data.phoneNumber || "";
        })
        .catch(error => {
            console.error(error);
            // SweetAlert on error
            Swal.fire({
                title: 'Error!',
                text: 'Student not found or an error occurred!',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        });
}

function deleteStudent() {
    let id = document.getElementById("deletetxtId").value;

    if (!id) {
        // SweetAlert on missing ID
        Swal.fire({
            title: 'Warning!',
            text: 'Please enter an ID!',
            icon: 'warning',
            confirmButtonText: 'Okay'
        });
        return;
    }

    // Confirm before deletion
    Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // Send DELETE request
            fetch(`http://localhost:8080/student/delete/${id}`, {
                method: "DELETE",
                redirect: "follow"
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to delete student");
                }
                return response.text();
            })
            .then(result => {
                console.log(result);
                // Success message
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Student record has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                });

                // Clear input fields
                document.getElementById("deletetxtId").value = "";
                document.getElementById("deletetxtName").value = "";
                document.getElementById("deletetxtIndexNumber").value = "";
                document.getElementById("deletetxtDob").value = "";
                document.getElementById("deletetxtPhoneNumber").value = "";
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to delete student!',
                    icon: 'error',
                    confirmButtonText: 'Okay'
                });
            });
        }
    });
}

let studentData = [];

function searchLoadStudent() {
    fetch("http://localhost:8080/student/get-all")
        .then(res => res.json())
        .then(data => {
            studentData = data; // Store the student data globally
            displayStudents(studentData); // Display all students initially
        })
        .catch(error => console.error("Error fetching students:", error));
}

function displayStudents(data) {
    let studentCard = document.querySelector(".student-card");
    studentCard.innerHTML = ""; // Clear previous content

    data.forEach(student => {
        let card = document.createElement("div");
        card.className = "col d-flex align-items-stretch student-item";
        card.setAttribute("data-name", student.name.toLowerCase()); // Store name in lowercase for search

        card.innerHTML = `
            <div class="card shadow-sm w-100">
                <img src="img/student.jpg" class="card-img-top" alt="Student Image">
                <div class="card-body text-center d-flex flex-column">
                    <h5 class="card-title"><i>${student.id}.</i> <b>${student.name}</b></h5>
                    <p class="card-text"><i class="bi bi-person-badge-fill"></i> ${student.indexnumber}</p>
                    <p class="card-text"><i class="bi bi-calendar"></i> ${student.dob}</p>
                    <p class="card-text"><i class="bi bi-telephone-fill"></i> ${student.phoneNumber}</p>
                </div>
            </div>
        `;

        studentCard.appendChild(card); // Append the card to the container
    });
}

function filterStudents() {
    let searchQuery = document.getElementById("searchInput").value.toLowerCase();
    let filteredData = studentData.filter(student => student.name.toLowerCase().includes(searchQuery));

    displayStudents(filteredData); // Update the display with filtered results
}



//

function reload(){
    location.reload();
}

function indexDelete() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success me-2",  // Added margin-end (me-2) for spacing
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: true
    });

    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "Are you sure you want to go to this page?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = "deleteStudent.html";
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Action has been cancelled.",
                icon: "error"
            });
        }
    });
}





//   // Disable Right Click
//   document.addEventListener("contextmenu", (event) => event.preventDefault());

//   // Disable Inspect Element Shortcuts
//   document.addEventListener("keydown", (event) => {
//       if (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J" || event.key === "C")) {
//           event.preventDefault();
//       }
//       if (event.ctrlKey && event.key === "U") {
//           event.preventDefault();
//       }
//       if (event.key === "F12") {
//           event.preventDefault();
//       }
//   });

//   // Optional: Detect DevTools Open and Redirect
//   (function() {
//       let devtools = { open: false, orientation: null };
//       let threshold = 160;

//       setInterval(() => {
//           let widthThreshold = window.outerWidth - window.innerWidth > threshold;
//           let heightThreshold = window.outerHeight - window.innerHeight > threshold;
//           if (widthThreshold || heightThreshold) {
//               devtools.open = true;
//               document.body.innerHTML = "<h1 style='text-align:center;color:red;margin-top:20%;'>Inspecting is Disabled!</h1>";
//           } else {
//               devtools.open = false;
//           }
//       }, 1000);
//   })();