const url = "./assets/docs/students.json";
const charactersContainer = document.querySelector(".charactersContainer");
const characterName = document.getElementById("name");

let studentsArrayObj = [];

async function getStudents() {
  try {
    const response = await fetch(url);
    studentsArrayObj = await response.json();
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

getStudents();

function displayStudents(students) {
  charactersContainer.innerHTML = "";
  students.forEach((student) => {
    const card = document.createElement("div");
    card.classList.add("characterCard");
    card.style.display = "none"; // Oculta las tarjetas por defecto
    card.innerHTML = `<p>${student.nombre}</p><img src="./assets/img/${student.casa}.png" alt="${student.casa}">`;
    charactersContainer.appendChild(card);
  });
}

function filterAndDisplayStudents(searchQuery) {
  const cards = charactersContainer.children;
  for (let i = 0; i < studentsArrayObj.length; i++) {
    const student = studentsArrayObj[i];
    const card = cards[i];
    if (student.nombre.toLowerCase().includes(searchQuery)) {
      card.style.display = "flex"; // Muestra la tarjeta si coincide con la búsqueda
    } else {
      card.style.display = "none"; // Oculta la tarjeta si no coincide
    }
  }
}

characterName.addEventListener("input", function (e) {
  const searchQuery = e.target.value.toLowerCase();
  filterAndDisplayStudents(searchQuery);
});
