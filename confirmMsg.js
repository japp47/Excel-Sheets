const cyclicModal = document.getElementById("cyclicModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const closeModal = document.getElementById("closeModal");

function showCyclicModal() {
  return new Promise((resolve, reject) => {
    cyclicModal.style.display = "block";

    // If user clicks Yes
    yesBtn.onclick = function() {
      cyclicModal.style.display = "none";
      resolve(true); 
    };

    noBtn.onclick = function() {
      cyclicModal.style.display = "none";
      resolve(false); 
    };

    closeModal.onclick = function() {
      cyclicModal.style.display = "none";
      resolve(false);
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