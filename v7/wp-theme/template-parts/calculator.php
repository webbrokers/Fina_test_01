<?php
/**
 * Calculator template part (v7)
 */
?>
<div class="new-calc-modal">
  <div class="new-calc-content">
    <div class="new-calc-close"></div>
    <div class="calc__content" id="calc" data-type="loanCalc">
      <div class="calc-row mt-5">
        <div class="c-row">
          <div class="c-col-1">
            <div class="calc__field">
              <div class="calc__field-wrap">
                <div class="calc__field-label">Сумма займа</div>
                <input type="text" class="range__value form-control calc__input" value="10000" min="1000" max="1000000" data-field="limit">
                <input class="range__input calc__input" type="range" min="1000" max="1000000" value="10000" data-field="limit">
              </div>
            </div>
          </div>
          <div class="c-col-2">
            <div class="calc__total-field d-flex justify-content-between align-items-center">
              <div class="calc__total-label">Общая сумма выплат</div>
              <div class="calc__total-value"><span id="calc__total" class="calc__value-text">0</span><span class="calc__value-char">₽</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
