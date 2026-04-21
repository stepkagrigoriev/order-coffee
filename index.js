const form = document.querySelector("form");
const addButton = document.querySelector(".add-button");

function updateRemoveButtons() {
	const beverages = form.querySelectorAll(".beverage");
	beverages.forEach((beverage) => {
		const removeButton = beverage.querySelector(".remove-button");
		removeButton.disabled = beverages.length === 1;
	});
}

function addRemoveButton(beverage) {
	const removeButton = document.createElement("button");
	removeButton.type = "button";
	removeButton.className = "remove-button";
	removeButton.textContent = "×";
	removeButton.setAttribute("aria-label", "Удалить напиток");
	beverage.prepend(removeButton);
}

document.querySelectorAll(".beverage").forEach(addRemoveButton);
updateRemoveButtons();

addButton.addEventListener("click", () => {
	const beverages = form.querySelectorAll(".beverage");
	const newNumber = beverages.length + 1;
	const firstBeverage = beverages[0];
	const clone = firstBeverage.cloneNode(true);
	clone.querySelector(".beverage-count").textContent =
		`Напиток №${newNumber}`;
	const radios = clone.querySelectorAll('input[type="radio"]');
	radios.forEach((radio) => {
		radio.name = `milk-${newNumber}`;
		radio.checked = radio.value === "usual";
	});
	const checkboxes = clone.querySelectorAll('input[type="checkbox"]');
	checkboxes.forEach((checkbox) => {
		checkbox.checked = false;
	});
	const select = clone.querySelector("select");
	select.value = "capuccino";
	firstBeverage.parentNode.insertBefore(clone, addButton.parentNode);
	updateRemoveButtons();
});

form.addEventListener("click", (event) => {
	const removeButton = event.target.closest(".remove-button");
	if (!removeButton || removeButton.disabled) return;
	removeButton.closest(".beverage").remove();
	updateRemoveButtons();
});

document.addEventListener("DOMContentLoaded", () => {
	const submitButton = document.querySelector(".submit-button");
	const modalOverlay = document.querySelector(".modal-overlay");
	const modal = document.querySelector(".modal");
	const closeButton = document.querySelector(".modal-close");
	function showModal() {
		const orders = getAllOrders();
		const table = document.createElement("table");
		table.setAttribute("border", "1px solid black");
		table.setAttribute("align", "center");
		const thead = document.createElement("thead");
		const headerRow = document.createElement("tr");
		const headers = ["Напиток", "Молоко", "Дополнительно", "Пожелания"];
		headers.forEach((headerText) => {
			const th = document.createElement("th");
			th.textContent = headerText;
			headerRow.appendChild(th);
		});
		thead.appendChild(headerRow);
		table.appendChild(thead);
		const tbody = document.createElement("tbody");
		orders.forEach((order) => {
			const row = document.createElement("tr");
			const drinkCell = document.createElement("td");
			drinkCell.textContent = order.select;
			row.appendChild(drinkCell);
			const milkCell = document.createElement("td");
			milkCell.textContent = order.milk;
			row.appendChild(milkCell);
			const additionalCell = document.createElement("td");
			additionalCell.textContent = order.additional.join(", ") || "—";
			row.appendChild(additionalCell);
			const wishesCell = document.createElement("td");
			wishesCell.textContent = order.wishes;
			row.appendChild(wishesCell);
			tbody.appendChild(row);
		});
		table.appendChild(tbody);
		const tableContainer = modal.querySelector("#order-table-container");
		tableContainer.innerHTML = "";
		tableContainer.appendChild(table);
		modalOverlay.style.display = "block";
		modal.style.display = "block";
		const beverages = document.querySelectorAll(".beverage").length;
		modal.querySelector("p").textContent =
			`Заказ принят! Вы заказали ${beverages} напитков!`;
	}
	function hideModal() {
		modalOverlay.style.display = "none";
		modal.style.display = "none";
	}
	submitButton.addEventListener("click", (event) => {
		event.preventDefault();
		showModal();
	});
	closeButton.addEventListener("click", hideModal);
	modalOverlay.addEventListener("click", hideModal);
});

function getAllOrders() {
	const beverages = document.querySelectorAll(".beverage");
	const orders = [];
	for (const beverage of beverages) {
		const select = beverage.querySelector("select");
		const milk = beverage.querySelectorAll('input[type="radio"]:checked');
		const additional = beverage.querySelectorAll(
			'input[type="checkbox"]:checked',
		);
		const additionalInfo = Array.from(additional).reduce(
			(acc, checkbox) => {
				acc.push(checkbox.value);
				return acc;
			},
			[],
		);
		orders.push({
			select: select.value,
			milk: milk[0].value,
			additional: additionalInfo,
			wishes: document.querySelector("textarea").value,
		});
	}
	return orders;
}

const textarea = document.querySelector("textarea");
textarea.addEventListener("input", () => {
	let text = textarea.value.toLowerCase();
	const keyWords = [
		"срочно",
		"быстрее",
		"побыстрее",
		"скорее",
		"поскорее",
		"очень нужно",
	];
	for (const key of keyWords) {
		text = text.replaceAll(key, `<b>${key}</b>`);
	}
	console.log(text);
	document.querySelector("#boldWishes").innerHTML = text;
});
