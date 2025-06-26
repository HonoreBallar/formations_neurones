// Afficher ou cacher le bouton selon le scroll
window.onscroll = function () {
    const btn = document.getElementById("backToTop");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

// Scroll en haut de la page au clic
document.getElementById("backToTop").addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const element = document.getElementById('typewriter');
const skills = element.dataset.skills.split(',');

let skillIndex = 0;
let charIndex = 0;
let typing = true;

function typeEffect() {
  const currentSkill = skills[skillIndex];
  
  if (typing) {
    charIndex++;
    if (charIndex <= currentSkill.length) {
      element.textContent = currentSkill.substring(0, charIndex);
    } else {
      typing = false;
      setTimeout(typeEffect, 1000); // pause après écriture
      return;
    }
  } else {
    charIndex--;
    if (charIndex >= 0) {
      element.textContent = currentSkill.substring(0, charIndex);
    } else {
      typing = true;
      skillIndex = (skillIndex + 1) % skills.length;
    }
  }
  
  setTimeout(typeEffect, typing ? 150 : 100); // vitesse d'écriture / suppression
}

typeEffect();
