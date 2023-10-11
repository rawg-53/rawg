const key = "73d26e50a7cf40d7a5ce139d275e2bfc";
let chapter = "games";
const search = document.getElementById("search");
const but = document.getElementById("but");

let date = new Date();
date = date.toISOString().split('T')[0];


// let date = new Date();
// date.setDate(date.getDate() - 10);
// console.log(date)

but.addEventListener("click", () => {


	if(typeof search.value == "string" && search.value != "") {
		api(search.value);
		console.log("type string");
		console.log(search.value);	
	}

});

async function home(searchValue) {
	let lastYear = decrementDays(365, "+");


    const response = await fetch(`https://api.rawg.io/api/${chapter}?key=${key}&dates=${lastYear},${date}&fields=announced,unanounced&ordering=-released,-metacritic,-rating&search=${searchValue}`);
	const data = await response.json();
	console.log("home");
	console.log(data);
}


async function lastMonth() {

	let lastMonth = decrementDays(31, "+");

	const response = await fetch(`https://api.rawg.io/api/games?key=${key}&dates=${lastMonth},${date}&fields=released`);
	const data = await response.json();
	console.log("last month");
	console.log(data);
}

async function lastWeek() {
	let lastWeek = decrementDays(7, "-");

	const response = await fetch(`https://api.rawg.io/api/games?key=${key}&dates=${lastWeek},${date}&fields=released`);
	const data = await response.json();
	console.log("last week");
	console.log(data);
}

function decrementDays(days, sign) {
	let date = new Date();
	if(sign == "+") {
		date.setDate(date.getDate() + days);
	} if(sign == "-") {
		date.setDate(date.getDate() - days);
	} else {
		return "";
	}
	date = date.toISOString().split('T')[0];
	return date;
}


// home("");

// lastMonth();

// lastWeek();
