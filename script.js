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

async function home(searchValue) {
	let date = new Date();
	let currentDay = date.toISOString().split('T')[0];
	let lastYear = `${Number(currentDay.substring(0, 4))-1}${currentDay.substring(4)}`;

	console.log(`${lastYear},${currentDay}`);

    const response = await fetch(`https://api.rawg.io/api/${chapter}?key=${key}&dates=${lastYear},${currentDay}&fields=announced,unanounced&ordering=-released,-metacritic,-rating&search=${searchValue}`);
	const data = await response.json();
	console.log(data);
}


async function searchFor30() {
	
	let date = new Date();
	let currentDay = date.toISOString().split('T')[0];
	let lastMonth;
	
	if(currentDay.substring(5, 6) == "0") {
		lastMonth = `${currentDay.substring(0, 5)}${Number(currentDay.substring(5, 7))-1}-${currentDay.substring(8)}`;
	} else {
		lastMonth = `${currentDay.substring(0, 5)}0${Number(currentDay.substring(5, 7))-1}-${currentDay.substring(8)}`;
	}
	
	console.log(lastMonth);
	console.log(currentDay);
	
	const response = await fetch(`https://api.rawg.io/api/games?key=${key}&dates=${lastMonth},${currentDay}&fields=released`);
	const data = await response.json();
	console.log(data);
}

// searchFor30();

// home("");