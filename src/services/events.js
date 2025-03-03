// events.js
export const events = [
    {
        id: 1,
        title: "Gaming Expo 2025",
        location: "New York",
        image: "/images/gamingExpo2025.webp",
    },
    {
        id: 2,
        title: "Indie Game Developers Meetup",
        location: "San Francisco",
        image: "/images/indieGame.webp",
    },
    {
        id: 3,
        title: "Esports Championship",
        location: "Los Angeles",
        image: "/images/esportChampionship.webp",
    },
];

export const fetchEvents = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(events);
        }, 500);
    });
};
