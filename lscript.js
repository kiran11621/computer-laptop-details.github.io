//const api_url = "<heroku_app_url>"
const api_url = "http://localhost:8080/laptop"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].name}</td>`;
		table_data += `<td>${records[i].model}</td>`;
		table_data += `<td>${records[i].brand}</td>`;
		table_data += `<td>${records[i].storage}</td>`;
		table_data += `<td>${records[i].display_resolution}</td>`;
		table_data += `<td>${records[i].processor}</td>`;
		table_data += `<td>${records[i].graphics}</td>`;
		table_data += `<td>${records[i].os}</td>`;
		table_data += `<td>${records[i].sn}</td>`;
		table_data += `<td>${records[i].cn}</td>`;
		table_data += `<td>`;
		table_data += `<a href="ledit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
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
		document.getElementById("display_resolution").value = data.display_resolution;
		document.getElementById("processor").value = data.processor;
		document.getElementById("graphics").value = data.graphics;
		document.getElementById("os").value = data.os;
		document.getElementById("sn").value = data.sn;
		document.getElementById("cn").value = data.cn;
	})
}


function postData() {
	var name = document.getElementById("name").value;
	var model = document.getElementById("model").value;
	var brand = document.getElementById("brand").value;
	var storage = document.getElementById("storage").value;
	var display_resolution = document.getElementById("display_resolution").value;
	var processor = document.getElementById("processor").value;
	var graphics = document.getElementById("graphics").value;
	var os = document.getElementById("os").value;
	var sn = document.getElementById("sn").value;
	var cn = document.getElementById("cn").value;
	
	data = {name: name, model: model, brand: brand, storage: storage, display_resolution: display_resolution, processor: processor, graphics: graphics, os: os, sn: sn, cn: cn};
	
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
		window.location.href = "lindex.html";
	})
}	


function putData() {
	
	var _id = document.getElementById("id").value;
	var name = document.getElementById("name").value;
	var brand = document.getElementById("brand").value;
	var model = document.getElementById("model").value;
	var storage = document.getElementById("storage").value;
	var display_resolution = document.getElementById("display_resolution").value;
	var processor = document.getElementById("processor").value;
	var graphics = document.getElementById("graphics").value;
	var os = document.getElementById("os").value;
	var sn = document.getElementById("sn").value;
	var cn = document.getElementById("cn").value;
	
	data = {_id: _id, name: name, brand: brand, model: model, storage: storage, display_resolution: display_resolution, processor: processor, graphics: graphics, os: os, sn: sn, cn: cn};
	
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
		window.location.href = "lindex.html";
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