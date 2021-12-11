const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API:
let count = 5;
const apiKey = "MNB5_myoJLGkpK5oXQuAd78dh4Uy-B1bG9RkfFK3xPU";
// const apiKey = "API_KEY_UNSPLASH";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all mages were loaded:
const imgLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 25;
    console.log("ready =", ready);
  }
};

// Create a helper function to set attributes on DOM elements:
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Create elements for links and photos & adding to the DOM:
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  photosArray.forEach((photo) => {
    // Create <a> element to link to Unsplash:
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo:
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener, check when each is finished loading:
    img.addEventListener("load", imgLoaded());
    // Placing images into the DOM (<img-container><a><img><img><a><img-container>):
    item.appendChild(img);
    imgContainer.appendChild(item);
  });
};

// Get data:
const getPhotos = async () => {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
};

// check the scrolling & load more photos when nearing the page bottom:
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On load:
getPhotos();
