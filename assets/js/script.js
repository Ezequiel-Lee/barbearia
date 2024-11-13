"use strict";

// adiciona um evento
const addEventOnElem = function (elem, type, callback) {
    if (elem.length > 1) {
        for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener(type, callback);
        }
    } 
    else {
        elem.addEventListener(type, callback);
    }
};

// abre o menu btn
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const closeBtn = document.getElementById("close");
const icon = document.querySelector(".icon-menu");

const toggleNavbar = () => {
    navbar.classList.toggle("active");
    if (icon.name === "menu-outline" && navbar.classList.contains("active")) {
        icon.name = "close-outline";
    } else {
        icon.name = "menu-outline";
    }
};
addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = () => {
    navbar.classList.remove("active");
    icon.name = "menu-outline";
};
addEventOnElem(navLinks, "click", closeNavbar);

window.addEventListener("click", (event) => {
    if (!navbar.contains(event.target) && event.target !== navToggler) {
        closeNavbar();
    }
});

// menu fixo quando scroll 100px e btn fixo topo
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
    if (window.scrollY > 100) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
};

addEventOnElem(window, "scroll", headerActive);

// filtrar funções
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter]");

let lastClickedFilterBtn = filterBtns[0];

const filter = function () {
    lastClickedFilterBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedFilterBtn = this;

    for (let i = 0; i < filterItems.length; i++) {
        if (
            this.dataset.filterBtn === filterItems[i].dataset.filter ||
            this.dataset.filterBtn === "all"
        ) {
            filterItems[i].style.display = "block";
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].style.display = "none";
            filterItems[i].classList.remove("active");
        }
    }
};

addEventOnElem(filterBtns, "click", filter);

// Envio de email
async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log("data", data);

    fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    .then((response) => response.json())
    .then((result) => {
        if (result.success) {
            openModal("successModal");

            const add = new Audio('./assets/audio/add.mp3')
            add.play();

        } else {
            openModal("errorModal");
            console.log("error: ", result);
        }
    })
    .catch((error) => {
        openModal("errorModal");
        console.error("Erro ao enviar formulário:", error);
    });

    document.querySelector(".input-field").value = '';
    document.querySelector("#email").value = '';
    document.querySelector("#phone").value = '';
    document.querySelector(".date").value = '';
    document.querySelector("#message").value = '';
    document.querySelector("#subscribe").value = '';
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

window.onclick = function (event) {
    const successModal = document.getElementById("successModal");
    const errorModal = document.getElementById("errorModal");

    if (event.target === successModal) {
        successModal.style.display = "none";
    }

    if (event.target === errorModal) {
        errorModal.style.display = "none";
    }
};
