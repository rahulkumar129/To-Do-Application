let count = 1;
let tasks = document.getElementById("tasks");
let input = document.getElementById("input");
let container = {};

if (localStorage.getItem("data") !== null) {
	container = JSON.parse(localStorage.getItem("data"));
}

function update(object) {
	tasks.innerHTML = "";
	for (const [key, value] of Object.entries(object)) {
		console.log(`Key: ${key}, Value: ${value}`);
		create(count, key, value);
		count++;
	}
}
update(container);

function add_task() {
	container[input.value] = false;
	create(count, input.value, false);
	input.value = "";
	localStorage.setItem("data", JSON.stringify(container));
}

tasks.addEventListener(
	"click",
	(e) => {
		if (e.target.tagName === "IMG") {
			let id = e.target.id;
			// console.log(id);
			delete container[id];
			e.target.parentElement.remove();
			localStorage.setItem("data", JSON.stringify(container));
		}
	},
	false
);

tasks.addEventListener("change", (e) => {
	if (e.target.matches(".inp-cbx")) {
		const taskId =
			e.target.nextElementSibling.querySelector(".text").textContent;
		container[taskId] = e.target.checked;
		localStorage.setItem("data", JSON.stringify(container));
	}
});

input.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		add_task(input.value, false);
	}
});

function create(id, text, state) {
	// Create the task div element
	let taskDiv = document.createElement("div");
	taskDiv.classList.add("task");

	// Create the task text div element
	let taskTextDiv = document.createElement("div");
	taskTextDiv.classList.add("task_text");

	// Create the input element
	let inputElement = document.createElement("input");
	inputElement.classList.add("inp-cbx");
	inputElement.setAttribute("id", `cbx-${id}`);
	inputElement.setAttribute("type", "checkbox");
	inputElement.style.display = "none";
	if (state == true) {
		inputElement.checked = true;
	}
	console.log(state);

	// Create the label element
	let labelElement = document.createElement("label");
	labelElement.classList.add("cbx");
	labelElement.setAttribute("for", `cbx-${id}`);

	// Create the span element for checkbox icon
	let spanCheckboxIcon = document.createElement("span");
	let svgElement = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"svg"
	);
	svgElement.setAttribute("width", "12px");
	svgElement.setAttribute("height", "9px");
	svgElement.setAttribute("viewBox", "0 0 12 9");

	let polylineElement = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"polyline"
	);
	polylineElement.setAttribute("points", "1 5 4 8 11 1");

	svgElement.appendChild(polylineElement);
	spanCheckboxIcon.appendChild(svgElement);

	// Create the span element for text
	let spanText = document.createElement("span");
	spanText.classList.add("text");
	spanText.textContent = text;

	labelElement.appendChild(spanCheckboxIcon);
	labelElement.appendChild(spanText);

	taskTextDiv.appendChild(inputElement);
	taskTextDiv.appendChild(labelElement);

	// Create the cancel image
	let cancelImage = document.createElement("img");
	cancelImage.setAttribute("id", `${text}`);
	cancelImage.classList.add("cancel");
	cancelImage.setAttribute("src", "Resourses/close.png");
	cancelImage.setAttribute("alt", "");
	taskDiv.appendChild(taskTextDiv);
	taskDiv.appendChild(cancelImage);
	tasks.appendChild(taskDiv);
}
