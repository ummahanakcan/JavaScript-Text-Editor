const optionsButtons = document.querySelectorAll(".option-button");
const advancedOptionButton = document.querySelectorAll(".adv-option-button");
const fontName = document.getElementById("fontName");
const fontSizeRef = document.getElementById("fontSize");
const writingArea = document.getElementById("text-input");
const linkButton = document.getElementById("createLink");
const alignButtons = document.querySelectorAll(".align");
const spacingButtons = document.querySelectorAll(".spacing");
const formatButtons = document.querySelectorAll(".format");
const scriptButtons = document.querySelectorAll(".script");
const listButtons = document.querySelectorAll(".list");
const foreColor = document.querySelector("#foreColor");
const btn = document.querySelector(".btn");
const totalNumber = document.querySelector("#total-number");
const remainNumber = document.querySelector("#remain-number");

const fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "Cursive",
];

const intializer = () => {
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);
  highlighter(listButtons, true);

  fontList.map((value) => {
    fontName.appendChild(createOptionElement(value));
  });

  for (let i = 1; i <= 7; i++) {
    fontSizeRef.appendChild(createOptionElement(i));
  }

  fontSizeRef.value = 3;
};

const modifyText = (command, showUl, value) => {
  document.execCommand(command, showUl, value);
};

optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  if (!/^https?\:\/\//i.test(userLink)) {
    userLink = `https:// ${userLink}`;
  }
  const element = document.getElementById("text-input");
  element.innerHTML += `<a href="${userLink}" class="cursor-list" style="color:${foreColor.value}">${userLink}</a>`;
});

const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      const isActive = button.classList.contains("active");
      if (needsRemoval) {
        className.forEach((btn) => btn.classList.remove("active"));
        if (!isActive) button.classList.add("active");
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

const createOptionElement = (value) => {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = value;
  return option;
};

totalNumber.innerHTML = 0;
remainNumber.innerHTML = writingArea.getAttribute("maxlength");

writingArea.addEventListener("keyup", () => {
  totalNumber.innerHTML = writingArea.innerText.length;
  remainNumber.innerHTML =
    writingArea.getAttribute("maxlength") - writingArea.innerText.length;
});

btn.onclick = () => {
  writingArea.innerHTML = "";
  totalNumber.innerHTML = "";
  remainNumber.innerHTML = "";
};

window.onload = intializer();
