const checkoutUrl = "";

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];

function activateTab(index) {
  tabs.forEach((tab, tabIndex) => {
    const active = tabIndex === index;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  panels.forEach((panel, panelIndex) => {
    panel.hidden = panelIndex !== index;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(index));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = (index + direction + tabs.length) % tabs.length;
    activateTab(next);
    tabs[next].focus();
  });
});

const faqItems = [...document.querySelectorAll(".lp-faq")];
faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const dialog = document.querySelector(".purchase-dialog");
const closeButtons = document.querySelectorAll(".dialog-close, .dialog-back");

document.querySelectorAll(".js-purchase").forEach((button) => {
  button.addEventListener("click", () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
      return;
    }
    dialog.showModal();
  });
});

closeButtons.forEach((button) => button.addEventListener("click", () => dialog.close()));
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
