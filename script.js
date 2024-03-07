let a = 1;
let tasks = document.getElementById("tasks");
let input = document.getElementById("input");

function add() {
	// Create the task div element
	let taskDiv = document.createElement("div");
	taskDiv.classList.add("task");

	// Create the task text div element
	let taskTextDiv = document.createElement("div");
	taskTextDiv.classList.add("task_text");

	// Create the input element
	let inputElement = document.createElement("input");
	inputElement.classList.add("inp-cbx");
	inputElement.setAttribute("id", `cbx-${a}`);
	inputElement.setAttribute("type", "checkbox");
	inputElement.style.display = "none";

	// Create the label element
	let labelElement = document.createElement("label");
	labelElement.classList.add("cbx");
	labelElement.setAttribute("for", `cbx-${a}`);

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
	spanText.textContent = input.value;
	input.value = "";

	labelElement.appendChild(spanCheckboxIcon);
	labelElement.appendChild(spanText);

	taskTextDiv.appendChild(inputElement);
	taskTextDiv.appendChild(labelElement);

	// Create the cancel image
	let cancelImage = document.createElement("img");
	cancelImage.classList.add("cancel");
	cancelImage.setAttribute("src", "Resourses/close.png");
	cancelImage.setAttribute("alt", "");

	// Append all elements to the task div
	taskDiv.appendChild(taskTextDiv);
	taskDiv.appendChild(cancelImage);

	// Append the task div to a container element (e.g., body)
	tasks.appendChild(taskDiv);
	a++;
}

tasks.addEventListener(
	"click",
	(e) => {
		if (e.target.tagName === "IMG") {
			e.target.parentElement.remove();
		}
	},
	false
);

input.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		add();
	}
});
