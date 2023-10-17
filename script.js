const key = "73d26e50a7cf40d7a5ce139d275e2bfc";
const input = document.getElementById("search");
const basicUrl = "https://api.rawg.io/api/games";
let date = new Date();
date = date.toISOString().split('T')[0];

let a = document.getElementsByClassName("block");
console.log(a)
for (let i = 0; i< a.length; i++) {
	a[i].addEventListener("mouseenter", () => {
		a[i].style.height = "calc(100% + 200px)"
		a[i].style.zIndex = 1;
		a[i].style.scale = 1.05;
	});
	a[i].addEventListener("mouseleave", () => {
		a[i].style.height = "auto"
		a[i].style.zIndex = 0;
		a[i].style.scale = 1;
	})
}

input.addEventListener("keyup", key => {
	if(key.key === "Enter") {
		console.log("aaa")
		if(typeof input.value == "string" && search.value != "") {
			search(input.value);
			console.log("type string");
			console.log(input.value);	
		}
	}
})

async function search(searchValue) {
	const response = await fetch(`${basicUrl}?key=${key}&search=${searchValue}&page=1`);
	const data = await response.json();
	console.log("search");
	console.log(data);
}

async function home() {
	let lastYear = days(365, "-");

	const response = await fetch(`${basicUrl}?key=${key}&dates=${lastYear},${date}&fields=announced,unannounced&ordering=-released,-rating,-metacritic`);
	const data = await response.json();
	console.log("home");
	console.log(data);
}

async function lastMonth() {
	let lastMonth = days(31, "-");
	
	const response = await fetch(`${basicUrl}?key=${key}&dates=${lastMonth},${date}&fields=released`);
	const data = await response.json();
	console.log("last month");
	console.log(data);
}

async function lastWeek() {
	let lastWeek = days(7, "-");

	const response = await fetch(`${basicUrl}?key=${key}&dates=${lastWeek},${date}&fields=released`);
	const data = await response.json();
	console.log("last week");
	console.log(data);
}

async function nextWeek() {
	let nextWeek = days(7, "+");
	
	const response = await fetch(`${basicUrl}?key=${key}&dates=${date},${nextWeek}&fields=announced,unanounced`);
	const data = await response.json();
	console.log("next week");
	console.log(data);
}

async function monthly(month) {
	const response = await fetch(`${basicUrl}?key=${key}&dates=`);
}

function months(month) {
	let date = new Date();
	date.setMonth(month);
	
}

/** takes 
 * @param {number} days amount of days
 * @param {string} sign plus or minus
 * @returns {Date} YYYY-MM-DD format
 * 
 * a new Date() incremented or decremented depending
 * on the given sign by given Number (integer)
 */
function days(days, sign) {
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