const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const picFiles = [
    "images/pic1.jpg",
    "images/pic2.jpg",
    "images/pic3.jpg",
    "images/pic4.jpg",
    "images/pic5.jpg",
];
/* Declaring the alternative text for each image file */
const alts = [
    "close-up of human eye",
    "geological pattern",
    "purple and white flowers",
    "Egyptian art",
    "a butterfly on a leaf",
]
/* Looping through images */
for (let i = 0; i < picFiles.length; i++) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', picFiles[i]);
  newImage.setAttribute('alt', alts[i]);
  thumbBar.appendChild(newImage);
  newImage.addEventListener("click", () => {
    displayedImage.setAttribute('src', picFiles[i]);
    displayedImage.setAttribute('alt', alts[i]);
  });
}
/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", () => {
    if (btn.getAttribute("class") == "dark") {
        btn.setAttribute("class", "light");
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
    } else {
        btn.setAttribute("class", "dark");
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
    }
})