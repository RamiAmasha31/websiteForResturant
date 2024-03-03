    // Data model for the private events section
    const privateEventsData = {
        title: "Private Events",
        description: "Host your special moments with us! Flavor Voyage offers a unique and elegant setting for private events. Whether it's a birthday celebration, anniversary, or corporate gathering, our team is dedicated to making your event memorable.",
        formElements: [
            { type: 'date', id: 'event-date', name: 'event_date', label: 'Event Date:', required: true },
            { type: 'time', id: 'event-time', name: 'event_time', label: 'Event Time:', required: true },
            { type: 'select', id: 'event-type', name: 'event_type', label: 'Event Type:', required: true, options: ['Birthday', 'Anniversary', 'Corporate Event'] },
            { type: 'number', id: 'guest-count', name: 'guest_count', label: 'Number of Guests:', min: 1, required: true },
            { type: 'tel', id: 'contact-number', name: 'contact_number', label: 'Contact Number:', pattern: '[0-9]{10}', required: true },
        ],
    };
    export default privateEventsData;