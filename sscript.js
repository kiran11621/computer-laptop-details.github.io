//const api_url = "https://computer-laptop-details.herokuapp.com/"
const api_url = "http://localhost:8080/stock"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].name}</td>`;
		table_data += `<td>${records[i].model}</td>`;
		table_data += `<td>${records[i].brand}</td>`;
		table_data += `<td>${records[i].storage}</td>`;
		table_data += `<td>${records[i].storage_req}</td>`;
		table_data += `<td>`;
		table_data += `<a href="sedit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}
function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}

function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => { 
	
		console.log(data);
		document.getElementById("id").value = data._id;
		document.getElementById("name").value = data.name;
		document.getElementById("model").value = data.model;
		document.getElementById("brand").value = data.brand;
		document.getElementById("storage").value = data.storage;
		document.getElementById("storage_req").value = data.storage_req;
}


function postData() {
	var name = document.getElementById("name").value;
	var model = document.getElementById("model").value;
	var brand = document.getElementById("brand").value;
	var storage = document.getElementById("storage").value;
	var storage_req = document.getElementById("storage_req").value;
	
	data = {name: name, model: model, brand: brand, storage: storage, storage_req: storage_req};
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "sindex.html";
	})
}	


function putData() {
	
	var _id = document.getElementById("id").value;
	var name = document.getElementById("name").value;
	var brand = document.getElementById("brand").value;
	var model = document.getElementById("model").value;
	var storage = document.getElementById("storage").value;
	var storage_req = document.getElementById("storage_req").value;
	
	data = {_id: _id, name: name, brand: brand, model: model, storage: storage, storage_req: storage_req};
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "sindex.html";
	})
}


function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}