const cyclicModal = document.getElementById("cyclicModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const closeModal = document.getElementById("closeModal");

// Function to show the modal
function showCyclicModal() {
  return new Promise((resolve, reject) => {
    cyclicModal.style.display = "block";

    // If user clicks Yes
    yesBtn.onclick = function() {
      cyclicModal.style.display = "none";
      resolve(true); // User wants to continue tracing
    };

    // If user clicks No
    noBtn.onclick = function() {
      cyclicModal.style.display = "none";
      resolve(false); // User doesn't want to continue tracing
    };

    // If user clicks the close (X) button
    closeModal.onclick = function() {
      cyclicModal.style.display = "none";
      resolve(false); // Treat close as No
    };

    // If user clicks outside the modal, also treat it as No
    window.onclick = function(event) {
      if (event.target === cyclicModal) {
        cyclicModal.style.display = "none";
        resolve(false);
      }
    };
  });
}