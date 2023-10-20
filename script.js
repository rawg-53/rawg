const exampleBlock = `
<div class="block game-card">
<img src="" alt="no image or bad connection">
<div class="bottom">
<p></p>
<div class="plus">
<h4>+</h4><h4>lol ne mogu</h4>
</div>
</div>
</div>
`;
const key = "73d26e50a7cf40d7a5ce139d275e2bfc";
const basicUrl = "https://api.rawg.io/api/games";
const input = document.getElementById("search");
const calendarElement = document.getElementById("calendar");
const monthsElement = document.getElementById("months");
const blocksContainer = document.getElementById("blocks-container");
const blocks = document.getElementsByClassName("block");
const searchWrapper = document.querySelector(".search-wrapper");
const dropwdownList = document.querySelector(".dropdown_list");
const notFound = document.querySelector(".not_found_res");
const listItem = document.querySelector(".dropdown_list_item");
const listItemText = document.querySelector(".list_item_text");
const list_item_image = document.querySelector(".list_item_image");
const searchIcon = document.querySelector("#search-icon");
document.querySelector("html").addEventListener("click", (e) => {
  if (
    e.target !== searchWrapper &&
    e.target !== input &&
    e.target !== searchIcon &&
    e.target !== dropwdownList &&
    e.target !== listItem &&
    e.target !== listItemText &&
    e.target !== list_item_image
  ) {
    searchWrapper.style.display = "none";
    dropwdownList.innerHTML = "";
  }
});

const homePage = document.getElementById("home");
const last30 = document.getElementById("last-month");
const this7 = document.getElementById("this-week");
const next7 = document.getElementById("next-week");

let page = 1;
let date = new Date();
date = date.toISOString().split("T")[0];

homePage.addEventListener("click", () => {
  home();
});
last30.addEventListener("click", () => {
  lastMonth();
});
this7.addEventListener("click", () => {
  lastWeek();
});
next7.addEventListener("click", () => {
  nextWeek();
});

calendarElement.addEventListener("click", () => {
  monthsElement.style.display = "flex";
});

input.addEventListener("keyup", (key) => {
  if (key.key === "Enter") {
    console.log("aaa");
    if (typeof input.value == "string" && search.value != "") {
      search(input.value);
      console.log("type string");
      console.log(input.value);
    }
  }
});

async function home() {
  let lastYear = days(365, "-");

  const response = await fetch(
    `${basicUrl}?key=${key}&dates=${lastYear},${date}&fields=announced,unannounced&ordering=-released-rating&page=${page}`
  );
  const data = await response.json();
  console.log("home");
  console.log(data);
  repeatingLoop(data);
}

async function lastMonth() {
  let lastMonth = days(31, "-");

  const response = await fetch(
    `${basicUrl}?key=${key}&dates=${lastMonth},${date}&fields=released`
  );
  const data = await response.json();
  console.log("last month");
  console.log(data);
  repeatingLoop(data);
}

async function lastWeek() {
  let lastWeek = days(7, "-");

  const response = await fetch(
    `${basicUrl}?key=${key}&dates=${lastWeek},${date}&fields=released`
  );
  const data = await response.json();
  console.log("last week");
  console.log(data);
  repeatingLoop(data);
}

async function nextWeek() {
  let nextWeek = days(7, "+");
  console.log(`next week:::${nextWeek}`);

  const response = await fetch(
    `${basicUrl}?key=${key}&dates=${date},${nextWeek}&fields=announced,unanounced`
  );
  const data = await response.json();
  console.log(data);
  repeatingLoop(data);
}

async function monthly(month) {
  const response = await fetch(`${basicUrl}?key=${key}&dates=`);
}

function months(month) {
  let date = new Date();
  date.setMonth(month);
}

function repeatingLoop(data) {
  blocksContainer.innerHTML = "";
  for (let i = 0; i < data.results.length; i++) {
    blocksContainer.innerHTML = blocksContainer.innerHTML + exampleBlock;
  }
  for (let i = 0; i < data.results.length; i++) {
    blocks[i].firstElementChild.src = data.results[i].background_image;
    blocks[i].children[1].firstElementChild.innerText = data.results[i].name;
  }
  let a = document.getElementsByClassName("block");
  console.log(a);
  for (let i = 0; i < a.length; i++) {
    a[i].addEventListener("mouseenter", () => {
      a[i].style.height = "calc(100% + 200px)";
      a[i].style.zIndex = 1;
      a[i].style.scale = 1.05;
    });
    a[i].addEventListener("mouseleave", () => {
      a[i].style.height = "auto";
      a[i].style.zIndex = 0;
      a[i].style.scale = 1;
    });
  }
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
  if (sign == "+") {
    const newDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    return newDate.toISOString().split("T")[0];
  }
  if (sign == "-") {
    date.setDate(date.getDate() - days);
  } else {
    return "";
  }
  date = date.toISOString().split("T")[0];
  return date;
}

// Search func

async function search(searchValue) {
  const response = await fetch(
    `${basicUrl}?key=${key}&search=${searchValue}&page=1`
  );
  const data = await response.json();
  return data;
}

input.addEventListener("change", async (e) => {
  searchWrapper.style = "display: flex";
  dropwdownList.style = "display: flex";
  dropwdownList.innerHTML = "";

  let value = e.target.value;
  if (value !== "") {
    input.style.backgroundColor = "white";
    search(value)
      .then(async (res) => {
        try {
          let li1 = document.createElement("li");
          let span1 = document.createElement("span");
          if (res.count > 0) {
            notFound.style.display = "none";
            li1.innerText = "Games";
            span1.innerHTML = `&ThinSpace; ${res?.count}`;
            span1.className = "game_number";
            li1.className = "dropdown_list_item subheader";
            li1.append(span1);
            dropwdownList.appendChild(li1);

            return res.results.map((game) => {
              let li = document.createElement("li");
              let span = document.createElement("span");
              let p = document.createElement("p");
              let img = document.createElement("img");

              img.src = game?.background_image;
              span;
              img.className = "list_item_image";
              img.alt = "game_image";
              span.className = "additional_layer";
              p.className = "list_item_text";
              p.innerText = game?.name;
              li.className = "dropdown_list_item";
              li.append(img);
              li.append(span);
              li.append(p);
              return dropwdownList.appendChild(li);
            });
          } else {
            notFound.style.display = "block";
            dropwdownList.style.display = "none";
          }
        } catch (error) {
          notFound.style.display = "none";
          notFound.innerHTML = error.message;
          console.log(error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    input.style.backgroundColor = "#ffffff29";
    searchWrapper.style.display = "none";
    dropwdownList.style = "display: flex";
  }
});

// home();

// lastMonth();

// lastWeek();
