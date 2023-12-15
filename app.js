const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovie(movieSelect.selectedIndex, movieSelect.value);
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();


// function proceed() {
//     var selectedSeats = document.querySelectorAll('.row .seat.selected');
    
//     if (selectedSeats.length > 0) {
//       // Mark selected seats as 'Occupied' or 'Unavailable'
//       selectedSeats.forEach(seat => {
//         seat.classList.remove('selected');
//         seat.classList.add('occupied');
//       });
  
//       // Clear ticket type and count selection
//       document.getElementById('movie').selectedIndex = 0;
//       document.getElementById('quantity').selectedIndex = 0;
  
//       // Update the count and total to zero
//       count.innerText = '0';
//       total.innerText = '0';
  
//       alert('Seats booked successfully!');
  
//     } else {
//       alert('Please select at least one seat.');
//     }
//   }
  

function proceed() {
    var selectedSeats = document.querySelectorAll('.row .seat.selected');
    var selectedQuantity = parseInt(document.getElementById('quantity').value);
    
    if (selectedSeats.length > selectedQuantity) {
      alert('You have selected more seats than the chosen quantity. Please adjust your selection.');
    } 
    else if (selectedSeats.length === selectedQuantity) {
      // Mark selected seats as 'Occupied' or 'Unavailable'
      selectedSeats.forEach(seat => {
        seat.classList.remove('selected');
        seat.classList.add('occupied');
      });
  
      // Clear ticket type and count selection
      document.getElementById('movie').selectedIndex = 0;
      document.getElementById('quantity').selectedIndex = 0;
  
      // Update the count and total to zero
      count.innerText = '0';
      total.innerText = '0';
  
      alert('Seats booked successfully!');
    }
    else if (selectedSeats.length < selectedQuantity) {
        alert('Please select more seats.');
    }
      else {
      alert('Please select at least one seat.');
    }
  }
  

  function clearSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    selectedSeats.forEach(seat => {
      seat.classList.remove('selected');
    });
  
    // Update the count and total to zero
    count.innerText = '0';
    total.innerText = '0';
  }
  
