const form = document.querySelector('form');
const addButton = document.querySelector('.add-button');

function updateRemoveButtons() {
  const beverages = form.querySelectorAll('.beverage');
  beverages.forEach((beverage) => {
    const removeButton = beverage.querySelector('.remove-button');
    removeButton.disabled = beverages.length === 1;
  });
}

function addRemoveButton(beverage) {
  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'remove-button';
  removeButton.textContent = '×';
  removeButton.setAttribute('aria-label', 'Удалить напиток');
  beverage.prepend(removeButton);
}

document.querySelectorAll('.beverage').forEach(addRemoveButton);
updateRemoveButtons();

addButton.addEventListener('click', () => {
  const beverages = form.querySelectorAll('.beverage');
  const newNumber = beverages.length + 1;
  const firstBeverage = beverages[0];
  const clone = firstBeverage.cloneNode(true);
  clone.querySelector('.beverage-count').textContent = `Напиток №${newNumber}`;
  const radios = clone.querySelectorAll('input[type="radio"]');
  radios.forEach((radio) => {
    radio.name = `milk-${newNumber}`;
    radio.checked = radio.value === 'usual';
  });
  const checkboxes = clone.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  const select = clone.querySelector('select');
  select.value = 'capuccino';
  firstBeverage.parentNode.insertBefore(clone, addButton.parentNode);
  updateRemoveButtons();
});

form.addEventListener('click', (event) => {
  const removeButton = event.target.closest('.remove-button');
  if (!removeButton || removeButton.disabled) return;
  removeButton.closest('.beverage').remove();
  updateRemoveButtons();
});
