const createCard = (title, description, price, imgSrc) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('text-center', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'dark:bg-gray-800', 'dark:border-gray-700', 'hover:opacity-90', 'p-8', 'transform', 'hover:scale-105', 'transition-transform', 'duration-300');

    // Image
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('flex', 'justify-center', 'items-center', 'mb-4');

    const imgElement = document.createElement('img');
    imgElement.src = imgSrc;
    imgElement.alt = title;
    imgElement.classList.add('rounded-md');

    imageContainer.appendChild(imgElement);

    // Title
    const titleElement = document.createElement('h5');
    titleElement.textContent = title;
    titleElement.classList.add('mb-4', 'text-2xl', 'font-bold', 'tracking-tight', 'text-gray-900', 'dark:text-white');

    // Description
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    descriptionElement.classList.add('mb-6', 'font-normal', 'text-gray-700', 'dark:text-gray-400');

    // Price
    const priceElement = document.createElement('p');
    priceElement.textContent = `$${price}`;
    
    // Append elements to card
    cardElement.appendChild(imageContainer);
    cardElement.appendChild(titleElement);
    cardElement.appendChild(descriptionElement);
    cardElement.appendChild(priceElement);

    return cardElement;
};

export default createCard;