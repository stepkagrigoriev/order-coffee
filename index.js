const form = document.querySelector('form');
const addButton = document.querySelector('.add-button');

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
});
