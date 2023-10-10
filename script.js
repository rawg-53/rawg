const key = "73d26e50a7cf40d7a5ce139d275e2bfc";
let chapter = "games";
const search = document.getElementById("search");
const but = document.getElementById("but");

but.addEventListener("click", () => {


	if(typeof search.value == "string" && search.value != "") {
		api(search.value);
		console.log("type string");
		console.log(search.value);	
	}

});

async function api(searchValue) {
    const response = await fetch(`https://api.rawg.io/api/${chapter}?key=${key}&dates=2023-01-01,2023-12-31&fields=announced,unanounced&ordering=-released,-metacritic,-rating&search=${searchValue}`);
	const data = await response.json();
	console.log(data);
}

async function searchFor30() {
	
	let date = new Date();
	let currentMonth = date.toISOString().split('T')[0];
	let lastMonth;
	
	if(currentMonth.substring(5, 6) == "0") {
		lastMonth = `${currentMonth.substring(0, 5)}${Number(currentMonth.substring(5, 7))-1}-${currentMonth.substring(8)}`;
	} else {
		lastMonth = `${currentMonth.substring(0, 5)}0${Number(currentMonth.substring(5, 7))-1}-${currentMonth.substring(8)}`;
	}
	
	console.log(lastMonth);
	console.log(currentMonth);
	
	const response = await fetch(`https://api.rawg.io/api/games?key=${key}&dates=${lastMonth},${currentMonth}&fields=released`);
	const data = await response.json();
	console.log(data);
}

// searchFor30();

// api("")