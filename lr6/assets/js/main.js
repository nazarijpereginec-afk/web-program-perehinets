
const tabsContainer = document.querySelector('#tabs');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

const topLeft = document.querySelector('#top-left');
const topRight = document.querySelector('#top-right');
const bottomRight = document.querySelector('#bottom-right');
const bottomLeft = document.querySelector('#bottom-left');

const topLeftValue = document.querySelector('#top-left-value');
const topRightValue = document.querySelector('#top-right-value');
const bottomRightValue = document.querySelector('#bottom-right-value');
const bottomLeftValue = document.querySelector('#bottom-left-value');

const letterSpacing = document.querySelector('#letter-spacing');
const letterSpacingValue = document.querySelector('#letter-spacing-value');
const textTransform = document.querySelector('#text-transform');

const preview = document.querySelector('#preview');
const previewButton = document.querySelector('#preview-button');
const coordinates = document.querySelector('#coordinates');
const cssCode = document.querySelector('#css-code');

const copyButton = document.querySelector('#copy-button');
const copyMessage = document.querySelector('#copy-message');

const presetForm = document.querySelector('#preset-form');
const presetName = document.querySelector('#preset-name');
const presetError = document.querySelector('#preset-error');

const scrollTopButton = document.querySelector('#scroll-top');

// Перемикання вкладок
function hideTabs() {
  tabs.forEach(function (tab) {
    tab.classList.remove('active');
  });

  tabContents.forEach(function (content) {
    content.classList.remove('active');
  });
}

function showTab(tabName) {
  const selectedTab = document.querySelector(
    `[data-tab="${tabName}"]`
  );

  const selectedContent = document.querySelector(
    `[data-content="${tabName}"]`
  );

  if (selectedTab && selectedContent) {
    selectedTab.classList.add('active');
    selectedContent.classList.add('active');
  }
}

tabsContainer.addEventListener('click', function (event) {
  if (!event.target.classList.contains('tab')) {
    return;
  }

  console.log('Тип події:', event.type);
  console.log('Target:', event.target);
  console.log('CurrentTarget:', event.currentTarget);

  const tabName = event.target.dataset.tab;

  hideTabs();
  showTab(tabName);
});

function generateBorderRadius() {
  const radius =
    `${topLeft.value}px ${topRight.value}px ` +
    `${bottomRight.value}px ${bottomLeft.value}px`;

  topLeftValue.textContent = `${topLeft.value} px`;
  topRightValue.textContent = `${topRight.value} px`;
  bottomRightValue.textContent = `${bottomRight.value} px`;
  bottomLeftValue.textContent = `${bottomLeft.value} px`;

  preview.style.borderRadius = radius;

  updateCSSCode();
}

function updateLetterSpacing() {
  letterSpacingValue.textContent = `${letterSpacing.value} px`;

  preview.style.letterSpacing = `${letterSpacing.value}px`;

  updateCSSCode();
}

function updateTextTransform() {
  preview.style.textTransform = textTransform.value;

  updateCSSCode();
}

function updateCSSCode() {
  const radius =
    `${topLeft.value}px ${topRight.value}px ` +
    `${bottomRight.value}px ${bottomLeft.value}px`;

  cssCode.value =
`.preview {
  border-radius: ${radius};
  letter-spacing: ${letterSpacing.value}px;
  text-transform: ${textTransform.value};
}`;
}

[topLeft, topRight, bottomRight, bottomLeft].forEach(
  function (range) {
    range.addEventListener('input', generateBorderRadius);
  }
);

letterSpacing.addEventListener('input', updateLetterSpacing);

textTransform.addEventListener('change', updateTextTransform);

// Копіювання CSS-коду
async function copyCSS() {
  try {
    await navigator.clipboard.writeText(cssCode.value);

    copyMessage.textContent = 'CSS-код скопійовано';
  } catch (error) {
    cssCode.focus();
    cssCode.select();

    copyMessage.textContent =
      'Скопіюйте виділений CSS-код вручну.';
  }
}

copyButton.addEventListener('click', copyCSS);

function handlePresetSubmit(event) {
  event.preventDefault();

  const name = presetName.value.trim();

  if (name === '') {
    presetName.classList.add('error');
    presetError.textContent = 'Введіть назву пресета';
    presetName.focus();
    return;
  }

  presetName.classList.remove('error');
  presetError.textContent = '';

  console.log(`Пресет: ${name}`);
  console.log(cssCode.value);

  alert(
    `Пресет "${name}" перевірено. CSS-код виведено в консоль.`
  );
}

presetForm.addEventListener('submit', handlePresetSubmit);

presetName.addEventListener('focus', function () {
  presetName.classList.add('focused');
});

presetName.addEventListener('blur', function () {
  presetName.classList.remove('focused');

  if (presetName.value.trim() === '') {
    presetName.classList.add('error');
    presetError.textContent = 'Введіть назву пресета';
  } else {
    presetName.classList.remove('error');
    presetError.textContent = '';
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    topLeft.value = 0;
    topRight.value = 0;
    bottomRight.value = 0;
    bottomLeft.value = 0;

    generateBorderRadius();
  }
});

preview.addEventListener('click', function () {
  console.log('Preview click');
});

previewButton.addEventListener('click', function (event) {
  event.stopPropagation();

  console.log('Button click');
});

preview.addEventListener('mouseover', function () {
  preview.classList.add('hovered');
});

preview.addEventListener('mouseout', function () {
  preview.classList.remove('hovered');
});

preview.addEventListener('mousemove', function (event) {
  coordinates.textContent =
    `X: ${event.clientX}; Y: ${event.clientY}`;

  console.log('pageX:', event.pageX);
  console.log('pageY:', event.pageY);
});

function handleScroll() {
  if (window.scrollY > 300) {
    scrollTopButton.classList.add('visible');
  } else {
    scrollTopButton.classList.remove('visible');
  }
}
window.addEventListener('scroll', handleScroll);

scrollTopButton.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

generateBorderRadius();
updateLetterSpacing();
updateTextTransform();
