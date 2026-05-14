/**
 * Калькулятор займа
 */
function initCalculator() {
  const calcContent = document.getElementById('calc');
  if (!calcContent) return;

  const rangeLimit = calcContent.querySelector('input[type="range"][data-field="limit"]');
  const textLimit = calcContent.querySelector('input[type="text"][data-field="limit"]');
  const rangeDate = calcContent.querySelector('input[type="range"][data-field="date"]');
  const textDate = calcContent.querySelector('input[type="text"][data-field="date"]');
  const percentInput = calcContent.querySelector('input[data-field="percent"]');

  const sumDisplay = document.getElementById('calc__sum');
  const overpayDisplay = document.getElementById('calc__overpay');
  const totalDisplay = document.getElementById('calc__total');
  const pskDisplay = document.getElementById('calc__psk');
  const progressLines = calcContent.querySelectorAll('.b-line');
  const progressPercent = calcContent.querySelectorAll('.progress__percent');

  function updateRangeProgress(input) {
    if (!input) return;
    const min = parseFloat(input.min) || 0;
    const max = parseFloat(input.max) || 100;
    const val = parseFloat(input.value) || 0;
    const percent = ((val - min) / (max - min)) * 100;
    input.style.setProperty('--range-progress', percent + '%');
  }

  function formatNum(n) {
    return Math.round(n).toLocaleString('ru-RU');
  }

  function calculate() {
    const sum = parseFloat((textLimit?.value || '0').replace(/\s/g, '')) || 0;
    const days = parseInt((textDate?.value || '1').replace(/\s/g, ''), 10) || 1;
    const percent = parseFloat((percentInput?.value || '0').replace('%', '').replace(',', '.')) || 0;

    const dailyRate = percent / 100;
    const overpay = sum * dailyRate * days;
    const total = sum + overpay;
    const psk = (dailyRate * 365 * 100).toFixed(1);

    if (sumDisplay) sumDisplay.textContent = formatNum(sum);
    if (overpayDisplay) overpayDisplay.textContent = formatNum(overpay);
    if (totalDisplay) totalDisplay.textContent = formatNum(total);
    if (pskDisplay) pskDisplay.textContent = psk;

    const benefitScore = Math.max(0, Math.min(100, 100 - percent * 100));
    const activeLines = Math.ceil(benefitScore / 10);

    progressLines.forEach((line, i) => {
      line.classList.toggle('active', i < activeLines);
    });
    progressPercent.forEach((el) => {
      el.textContent = String(Math.round(benefitScore));
    });
  }

  function sync(rangeInput, textInput) {
    if (!rangeInput || !textInput) return;

    rangeInput.addEventListener('input', function () {
      textInput.value = rangeInput.value;
      updateRangeProgress(rangeInput);
      calculate();
    });

    textInput.addEventListener('input', function () {
      let val = parseInt(textInput.value.replace(/\s/g, ''), 10) || 0;
      const min = parseInt(rangeInput.min, 10) || 0;
      const max = parseInt(rangeInput.max, 10) || 0;
      val = Math.max(min, Math.min(max, val));
      rangeInput.value = String(val);
      updateRangeProgress(rangeInput);
      calculate();
    });
  }

  sync(rangeLimit, textLimit);
  sync(rangeDate, textDate);

  if (percentInput) {
    percentInput.addEventListener('input', calculate);
  }

  updateRangeProgress(rangeLimit);
  updateRangeProgress(rangeDate);
  calculate();
}
