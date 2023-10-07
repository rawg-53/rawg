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
    const response = await fetch(`https://api.rawg.io/api/${chapter}?key=${key}&search=${searchValue}`);
	const data = await response.json();
	console.log(data);
}
