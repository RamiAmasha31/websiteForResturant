

function initializeScript(){
// Wait for the DOM content to be loaded
document.addEventListener('DOMContentLoaded', function () {

    // Variable to keep track of the last selected section
    var lastCurr = 0;

    // Function to toggle sections
    function toggleSection(sectionId) {
        console.log(sectionId);

        // Hide the hero section if the selected section is not 'hero-section'
        if (sectionId !== 'hero-section') {
            document.getElementById('hero-section').classList.add('hidden-section');
        }

        // Hide all sections with the 'hidden-section' class
        const sections = document.querySelectorAll('.hidden-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Show/hide the menu section based on certain conditions
        if (sectionId === 'drinks_menu_item' || sectionId === 'dishes_menu_item' || sectionId === 'alcohol_menu_item') {
            document.getElementById('menu-section').style.display = 'block';
        } else {
            document.getElementById('menu-section').style.display = 'none';
        }

        // Show the selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }
    }

    // Function to handle menu clicks for large screens
    function handleMobileMenuClick(event) {
        if (event.target.tagName === 'A') {
            const sectionId = event.target.getAttribute('href').substring(1);
            toggleSection(sectionId);
        }
    }

    // Function to handle mobile menu navbar clicks
    function handleMobileMenuBtnClick(event) {
        if (event.target.tagName === 'A') {
            const sectionId = event.target.getAttribute('href').substring(1);

            if (sectionId == 'menu-section') {
                // Toggle the display of menu items
                const items = document.querySelectorAll('.menu_item');
                items.forEach(i => {
                    if (i.style.display === 'flex') {
                        i.style.display = 'none';
                    } else {
                        i.style.display = 'flex';
                        i.style.color = 'red';
                    }
                });
            } else {
                // Close the mobile menu and toggle the selected section
                closeMobileMenu();
                toggleSection(sectionId);
            }
        }
    }

    // Add event listener to the parent of navigation links (large screens)
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', handleMobileMenuClick);
    }

    // Add event listener for the mobile navbar
    const mobileMenuContainer = document.getElementById('mobile-menu-container');
    if (mobileMenuContainer) {
        mobileMenuContainer.addEventListener('click', handleMobileMenuBtnClick);
    }
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }
    
    const ClosemobileMenuBtn = document.getElementById('close-btn');
    if (ClosemobileMenuBtn) {
        ClosemobileMenuBtn.addEventListener('click', closeMobileMenu);
    }



    // Function to close the dropdown
    function closeDropdown() {
        const dropaNav = document.getElementById('dropaNav');
        dropaNav.classList.add('hidden');
    }

    // Function to scroll to the top
    function scrollToTop() {
        window.scrollTo({
            top: 30,
            behavior: 'smooth'
        });
    }

    // Add event listener to all anchor tags
    const anchorTags = document.querySelectorAll('a');
    anchorTags.forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            toggleSection(sectionId);  // Toggle the selected section
            scrollToTop();  // Scroll to the top
        });
    });

    // Add event listener to all clickable divs
    const clickableDivs = document.querySelectorAll('.clickable-div');
    clickableDivs.forEach(div => {
        div.addEventListener('click', function (event) {
            // Stop the event propagation to prevent the anchor tag's click event
            event.stopPropagation();
            const sectionId = this.getAttribute('data-section').substring(1);

            // Close the dropdown and toggle the selected section
            closeDropdown();
            toggleSection(sectionId);
            scrollToTop();  // Scroll to the top
        });
    });

});

// Function to open the mobile menu
function openMobileMenu() {
    const mobileMenuContainer = document.getElementById('mobile-menu-container');
    mobileMenuContainer.style.display = 'flex';
}

// Function to close the mobile menu
function closeMobileMenu() {
    const mobileMenuContainer = document.getElementById('mobile-menu-container');
    mobileMenuContainer.style.display = 'none';

    // Hide all menu items
    const items = document.querySelectorAll('.menu_item');
    items.forEach(i => {
        i.style.display = 'none';
    });
}

// Gallery animations
document.addEventListener('DOMContentLoaded', function () {
    const imageSlider = document.getElementById('image-slider');
    const images = [
        'images/resturant/image1.avif',
        'images/resturant/image2.avif',
        'images/resturant/image3.avif',
        'images/resturant/image4.avif',
        'images/resturant/image5.avif',
        'images/resturant/image6.avif',
        'images/resturant/image7.avif',
    ];
    let currentImageIndex = 0;

    function changeImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        const newImage = new Image();
        newImage.src = images[currentImageIndex];
        newImage.alt = 'Gallery Image';
        newImage.className = 'h-72 object-cover w-auto rounded-md cursor-pointer transition duration-300 transform hover:scale-105';

        // Replace the existing image with the new one
        imageSlider.innerHTML = '';
        newImage.id = `image-${currentImageIndex}`;
        imageSlider.appendChild(newImage);
    }

    // Change image every 5 seconds
    setInterval(changeImage, 5000);
});
}
export default initializeScript;