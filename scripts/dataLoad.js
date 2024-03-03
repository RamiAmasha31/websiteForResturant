import {injectHeroSection,injectPrivateEvents,injectCaering,injectGalleryData,injectReservationForm,injectAboutUsData,renderCards} from './injectors.js'
export function db_load(){
    function fetchJSONData(path) {
        return fetch(path)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                // Transform the fetched data into the desired format
                const transformedData = data.map(item => ({
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    imgSrc: item.imgSrc,
                }));
                switch (path) {
                        case '../data/dishes.json':
                                renderCards(transformedData, 'dishes_menu_item');
                                break;
                         case '../data/drinks.json':
                                renderCards(transformedData, 'drinks_menu_item');
                                break;
                        case '../data/alcohol.json':
                                renderCards(transformedData, 'alcohol_menu_item');                                
                                break;                                
                        default:
                                break;
                }
                
                return transformedData;
            })
            .catch((error) => {
                console.error("Unable to fetch data:", error);
                throw error; // Re-throw the error for further handling if needed
            });
    }

const dishes_path="../data/dishes.json";
const drinks_path="../data/drinks.json";
const alcohol_path="../data/alcohol.json";

// bring data from databse
fetchJSONData(dishes_path);
fetchJSONData(drinks_path);
fetchJSONData(alcohol_path);
//




}