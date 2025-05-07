const API_URL = "http://15.165.18.175:8800/cars";

// Function to fetch and display all cars
async function fetchCars() {
  const tableBody = document.querySelector("#carsTable tbody");
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch cars data");

    const cars = await response.json();

    const data = cars?.reverse();
    tableBody.innerHTML = "";
    data.forEach((car, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.year}</td>
        <td>${car.color}</td>
        <td>${car.price}</td>
        <td>${car.mileage}</td>
        <td>${car.state}</td>
        
        <td>${car.condition}</td>
        <td>
          <button class="delete-btn" data-id="${car.Column1}">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Add event listeners to delete buttons
    addDeleteEventListeners();
  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="11">Error: ${error.message}</td></tr>`;
  }
}

// Function to add event listeners to delete buttons
function addDeleteEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDelete);
  });
}

// Function to handle delete action
async function handleDelete(event) {
  const button = event.target;
  const carId = button.getAttribute("data-id");

  if (!carId) {
    alert("Error: Cannot identify the car to delete");
    return;
  }

  if (confirm("Are you sure you want to delete this car?")) {
    try {
      const response = await fetch(`${API_URL}/${carId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete car");
      }

      // Remove the row from the table or refresh the data
      const row = button.closest("tr");
      if (row) {
        row.remove();
      } else {
        // If can't find the row, reload all data
        fetchCars();
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }
}

// Modal functionality
function openModal() {
  const addCarModal = document.getElementById("addCarModal");
  addCarModal.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
}

function closeModal() {
  const addCarModal = document.getElementById("addCarModal");
  const addCarForm = document.getElementById("addCarForm");
  addCarModal.style.display = "none";
  document.body.style.overflow = "auto"; // Re-enable scrolling
  addCarForm.reset(); // Clear the form
}

// Add new car form submission
async function handleAddCar(event) {
  event.preventDefault();
  const addCarForm = document.getElementById("addCarForm");

  // Create FormData object from the form
  const formData = new FormData(addCarForm);

  // Create car object from form data
  const carData = {
    brand: formData.get("brand"),
    color: formData.get("color"),
    condition: formData.get("condition"),
    country: formData.get("country"),
    mileage: parseInt(formData.get("mileage")),
    model: formData.get("model"),
    price: parseInt(formData.get("price")),
    state: formData.get("state"),
    year: parseInt(formData.get("year")),
  };

  // Add optional fields if they exist
  if (formData.get("lot") && formData.get("lot").trim() !== "") {
    carData.lot = formData.get("lot");
  }

  if (
    formData.get("title_status") &&
    formData.get("title_status").trim() !== ""
  ) {
    carData.titleStatus = formData.get("title_status");
  }

  if (formData.get("vin") && formData.get("vin").trim() !== "") {
    carData.vin = formData.get("vin");
  }

  try {
    // Send POST request to API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      throw new Error("Failed to add car");
    }

    // Close the modal and refresh the car list
    closeModal();
    fetchCars();

    // Show success message
    alert("Car added successfully!");
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements after they are loaded
  const addCarBtn = document.getElementById("addCarBtn");
  const closeModalBtn = document.querySelector(".close-modal");
  const cancelAddCarBtn = document.getElementById("cancelAddCar");
  const addCarForm = document.getElementById("addCarForm");

  // Add event listeners
  addCarBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);
  cancelAddCarBtn.addEventListener("click", closeModal);
  addCarForm.addEventListener("submit", handleAddCar);

  // Close modal if clicked outside of content
  window.addEventListener("click", (event) => {
    const addCarModal = document.getElementById("addCarModal");
    if (event.target === addCarModal) {
      closeModal();
    }
  });

  // Load cars data
  fetchCars();
});
