const url = "./assets/docs/students.json";
const charactersContainer = document.querySelector(".charactersContainer");
const characterName = document.getElementById("name");

let studentsArrayObj = [];

async function getStudents() {
  try {
    const response = await fetch(url);
    studentsArrayObj = await response.json();
    displayStudents([]); // Mantener ocultos inicialmente
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
    card.innerHTML = `<p>${student.nombre}</p><img src="./assets/img/${student.casa}.png" alt="${student.casa}">`;
    charactersContainer.appendChild(card);
  });
}

characterName.addEventListener("input", function (e) {
  const searchQuery = e.target.value.toLowerCase();

  if (searchQuery === "") {
    // Si el input está vacío, no mostrar nada
    displayStudents([]);
  } else {
    const filteredStudents = studentsArrayObj.filter((student) =>
      student.nombre.toLowerCase().startsWith(searchQuery)
    );
    displayStudents(filteredStudents);
  }
});
