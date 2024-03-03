import createCard from '../components/Card.js';



const renderCards = (data, type) => {
    // Get the card container based on the provided type
    const cardContainer = document.getElementById(`${type}`);

    // Check if the card container exists
    if (!cardContainer) {
        console.error(`Card container not found for type: ${type}`);
        return;
    }

    // Clear existing content
    cardContainer.innerHTML = '';

    // Create wrapper div
    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6';
    
    // Append cards to the wrapper div
    data.forEach(item => {
        const card = createCard(item.title, item.description, item.price, item.imgSrc);
        wrapperDiv.appendChild(card);
    });

    // Append wrapper div to the card container
    cardContainer.appendChild(wrapperDiv);
};

function injectAboutUsData(data) {
    const aboutUsSection = document.getElementById('about-section');

    if (!aboutUsSection) {
        console.error('About Us section not found');
        return;
    }

    // Create the main heading
    const title = document.createElement('h2');
    title.className = 'text-3xl font-bold mb-4';
    title.textContent = data.title;

    // Create the flex container
    const flexContainer = document.createElement('div');
    flexContainer.className = 'flex flex-col md:flex-row items-center md:items-start';

    // Left column for image
    const imageColumn = document.createElement('div');
    imageColumn.className = 'md:w-1/2 mb-4 md:mr-4';

    // Create and append the image
    const image = document.createElement('img');
    image.src = data.imageSrc;
    image.alt = 'About Us Image';
    image.className = 'w-full h-auto rounded-lg shadow-md';
    imageColumn.appendChild(image);

    // Right column for paragraphs
    const paragraphsColumn = document.createElement('div');
    paragraphsColumn.className = 'md:w-1/2';

    // Create and append each paragraph
    data.paragraphs.forEach(paragraphText => {
        const paragraph = document.createElement('p');
        paragraph.className = 'text-gray-700 mb-4';
        paragraph.textContent = paragraphText;
        paragraphsColumn.appendChild(paragraph);
    });

    // Append created elements to the aboutUsSection
    flexContainer.appendChild(imageColumn);
    flexContainer.appendChild(paragraphsColumn);

    // Clear existing content and append new elements
    aboutUsSection.innerHTML = '';
    aboutUsSection.appendChild(title);
    aboutUsSection.appendChild(flexContainer);
}



function injectReservationForm(reservationsData){
        // Create and inject elements into the reservations section
        const reservationsSection = document.getElementById('reservations-section');
    
        const title = document.createElement('h2');
        title.className = 'text-3xl font-bold mb-4 text-center';
        title.textContent = reservationsData.title;
    
        const description = document.createElement('p');
        description.className = 'text-gray-700 mb-4';
        description.textContent = reservationsData.description;
    
        const form = document.createElement('form');
        form.className = 'max-w-md mx-auto border rounded-md p-6 mb-8 shadow-md text-center';
    
        Object.entries(reservationsData.formLabels).forEach(([key, value]) => {
            const label = document.createElement('label');
            label.for = `reservation-${key}`;
            label.className = 'block text-gray-700 text-sm font-bold mb-2';
            label.textContent = value;
    
            const input = document.createElement('input');
            input.type = key === 'date' ? 'date' : key === 'time' ? 'time' : key === 'partySize' ? 'number' : 'tel';
            input.id = `reservation-${key}`;
            input.name = `reservation_${key}`;
            input.className = 'border rounded-md p-2 mb-4 w-full';
            input.required = true;
            if (key === 'partySize') {
                input.min = 1;
            }
            if (key === 'phoneNumber') {
                input.placeholder = 'Enter your phone number';
            }
    
            form.appendChild(label);
            form.appendChild(input);
        });
    
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-300';
        submitButton.textContent = reservationsData.buttonText;
                    submitButton.disabled = true; // Initially, disable the button

                // Function to check if all required fields are filled
                function checkFormValidity() {
                    const isValid = Array.from(form.elements).every(element => {
                        return element.tagName !== 'INPUT' || (element.required && element.value.trim() !== '');
                    });

                    submitButton.disabled = !isValid;
                }

                // Add an event listener to each input field for change events
                Array.from(form.elements).forEach(element => {
                    if (element.tagName === 'INPUT') {
                        element.addEventListener('input', checkFormValidity);
                    }
                });

                // Add an event listener to the form
                form.addEventListener('submit', async function (event) {
                    event.preventDefault(); // Prevent the default form submission behavior

                    // Create a JSON object to store the form data
                    const formData = {};

                    // Iterate over form elements and add them to the formData object
                    Array.from(form.elements).forEach(element => {
                        if (element.tagName === 'INPUT') {
                            formData[element.name] = element.value;
                        }
                    });

                                                    // Display the JSON data in the console (you can modify this part)
                                                    console.log('Form Data as JSON:', JSON.stringify(formData, null, 2));
                                // Fetch the reservations.json file
                                try {
                                    // Fetch the existing data from localStorage
                                    const storedData = localStorage.getItem('reservationsData');
                                    const jsonFile = storedData ? JSON.parse(storedData) : [];
                                
                                    // Check if the form data matches any entry in the JSON file
                                    if (isFormDataInJsonFile(formData, jsonFile)) {
                                        alert('Form data already exists in the reservations.json file!');
                                        // You can handle it as needed, e.g., show a message or prevent submission
                                    } else {
                                        // Add the form data to the JSON file
                                        jsonFile.push(formData);
                                
                                        // Save the updated data back to localStorage
                                        localStorage.setItem('reservationsData', JSON.stringify(jsonFile));
                                
                                        alert('Form data added to the reservations.json file!');
                                        // You can handle form submission or any other actions
                                    }
                                } catch (error) {
                                    console.error('Error fetching or updating reservations.json:', error);
                                }
                                                        // Function to check if form data exists in the JSON file
                                                        function isFormDataInJsonFile(formData, jsonFile) {
                                                            return jsonFile.some(entry => JSON.stringify(entry) === JSON.stringify(formData));
                                                        }


                    // You can now send the formData to your server or perform other actions
                });

        form.appendChild(submitButton);
    
        const confirmationMessage = document.createElement('p');
        confirmationMessage.className = 'text-gray-700 mb-8';
        confirmationMessage.textContent = reservationsData.confirmationMessage;
    
        reservationsSection.appendChild(title);
        reservationsSection.appendChild(description);
        reservationsSection.appendChild(form);
        reservationsSection.appendChild(confirmationMessage);

            

}












function injectGalleryData(galleryData){
               

    
                // Create and inject elements into the gallery section
                const gallerySection = document.getElementById('gallery-section');
    
                const title = document.createElement('h2');
                title.className = 'text-3xl font-bold mb-4 text-center';
                title.textContent = galleryData.title;
    
                const galleryContainer = document.createElement('div');
                galleryContainer.className = 'flex justify-center relative overflow-hidden items-center';
    
                const imageSlider = document.createElement('div');
                imageSlider.id = 'image-slider';
                imageSlider.className = 'grid grid-cols-1 items-center';
    
                const imageGrid = document.createElement('div');
                imageGrid.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';
    
                galleryData.images.forEach(image => {
                    const imageDiv = document.createElement('div');
                    imageDiv.className = 'aspect-w-1 aspect-h-1 overflow-hidden';
    
                    const img = document.createElement('img');
                    img.src = image.src;
                    img.alt = image.alt;
                    img.className = 'h-72 object-cover w-full rounded-md cursor-pointer transition duration-300 transform hover:scale-105';
    
                    imageDiv.appendChild(img);
                    imageGrid.appendChild(imageDiv);
                });
    
                imageSlider.appendChild(imageGrid);
                galleryContainer.appendChild(imageSlider);
                gallerySection.appendChild(title);
                gallerySection.appendChild(galleryContainer);
}



function injectCaering(cateringData){


    // Create and inject elements into the catering section
    const cateringSection = document.getElementById('catering-section');

    const title = document.createElement('h2');
    title.className = 'text-3xl font-bold mb-4 text-center';
    title.textContent = cateringData.title;

    const description = document.createElement('p');
    description.className = 'text-gray-700 mb-4';
    description.textContent = cateringData.description;

    cateringSection.appendChild(title);
    cateringSection.appendChild(description);

    const cateringPackagesContainer = document.createElement('div');
    cateringPackagesContainer.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6';

    cateringData.packages.forEach(package1 => {
        const card = createCard(package1.title, package1.description, package1.price, package1.imgSrc);
        cateringPackagesContainer.appendChild(card);
    });

    cateringSection.appendChild(cateringPackagesContainer);
}
function injectPrivateEvents(privateEventsData) {


    // Create and inject elements into the private events section
    const privateEventsSection = document.getElementById('private-events-section');

    const title = document.createElement('h2');
    title.className = 'text-3xl font-bold mb-4 text-center';
    title.textContent = privateEventsData.title;

    const description = document.createElement('p');
    description.className = 'text-gray-700 mb-8';
    description.textContent = privateEventsData.description;

    privateEventsSection.appendChild(title);
    privateEventsSection.appendChild(description);

    // Private Events Form
    const form = document.createElement('form');
    form.className = 'max-w-md mx-auto border rounded-md p-6 mb-8 shadow-md text-center';

    privateEventsData.formElements.forEach(element => {
        if (element.type === 'select') {
            const select = document.createElement('select');
            select.id = element.id;
            select.name = element.name;
            select.className = 'border rounded-md p-2 mb-4';
            select.required = element.required;

            element.options.forEach(optionText => {
                const option = document.createElement('option');
                option.value = optionText.toLowerCase();
                option.textContent = optionText;
                select.appendChild(option);
            });

            const label = createLabel(element.id, element.label);
            form.appendChild(label);
            form.appendChild(select);
        } else {
            const input = createInput(element.type, element.id, element.name, element.label, element.required, element.min, element.pattern);
            form.appendChild(input);
        }
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'bg-blue-500 text-white rounded-md py-2 px-4';
        submitButton.textContent = 'Submit Request';
 // Initially, disable the submit button
 submitButton.disabled = true;


    // Add an event listener to the form
    form.addEventListener('input', function () {
        // Enable the submit button if all required fields are filled
        submitButton.disabled = !areRequiredFieldsFilled();
    });


    // Add an event listener to the form
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Collect all form field values
        const formData = {};
        const formElements = form.elements;

        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.tagName !== 'BUTTON') {
                formData[element.name] = element.value;
            }
        }

        // Convert the form data to JSON
        const formDataJSON = JSON.stringify(formData);

        // Log the JSON data (you can modify this part based on your needs)
        console.log('Form Data JSON:', formDataJSON);

        // Perform other actions with the form data or send it to your server
    });

    form.appendChild(submitButton);

    privateEventsSection.appendChild(form);

    const inquiryMessage = document.createElement('p');
    inquiryMessage.className = 'text-gray-700 mb-8';
    inquiryMessage.textContent = "For inquiries about hosting private events or customizing your experience, feel free to reach out to our events team. We look forward to creating unforgettable moments with you.";

    privateEventsSection.appendChild(inquiryMessage);
}
    // Function to check if all required fields are filled
    function areRequiredFieldsFilled() {
        const requiredFields = form.querySelectorAll('[required]');
        return Array.from(requiredFields).every(field => field.value.trim() !== '');
    }

// Helper function to create a label
function createLabel(forAttribute, text) {
    const label = document.createElement('label');
    label.for = forAttribute;
    label.className = 'block text-gray-700 text-sm font-bold mb-2';
    label.textContent = text;
    return label;
}

// Helper function to create an input element
function createInput(type, id, name, label, required, min = '', pattern = '') {
    const container = document.createElement('div');
    container.className = 'mb-4';

    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = name;
    input.className = 'border rounded-md p-2 w-full';
    input.required = required;
    input.min = min;
    input.pattern = pattern;

    const labelElement = createLabel(id, label);

    container.appendChild(labelElement);
    container.appendChild(input);

    return container;
}

function injectHeroSection(heroData) {
  

    // Create and inject elements into the hero section
    const heroSection = document.getElementById('hero-section');

    // Left Column: Image
    const imageColumn = document.createElement('div');
    imageColumn.className = 'md:w-1/2 pr-8';
    
    const image = document.createElement('img');
    image.src = heroData.imageSrc;
    image.alt = "Flavor Voyage Restaurant";
    image.className = 'w-full h-auto rounded-lg shadow-md';

    imageColumn.appendChild(image);

    // Right Column: Text
    const textColumn = document.createElement('div');
    textColumn.className = 'md:w-1/2 justify-center items-center text-center flex flex-col';

    const title = document.createElement('h1');
    title.className = 'text-4xl font-bold mb-4 text-center mt-2.5';
    title.textContent = heroData.title;

    const description = document.createElement('p');
    description.className = 'text-gray-700 mb-8 text-center md:text-left';
    description.textContent = heroData.description;

    textColumn.appendChild(title);
    textColumn.appendChild(description);

    // Combine both columns
    const heroContent = document.createElement('div');
    heroContent.className = 'md:flex';
    heroContent.appendChild(imageColumn);
    heroContent.appendChild(textColumn);

    heroSection.appendChild(heroContent);
}

export  {injectHeroSection,injectPrivateEvents,injectCaering,injectGalleryData,injectReservationForm,injectAboutUsData,renderCards}