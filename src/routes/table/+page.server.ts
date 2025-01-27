import placesData from '$lib/data/places.json';

export function load() {
    const cities = placesData.countries.flatMap(country =>
        country.cities.map(city => ({
            ...city,
            country: country.name, // Add the country name to the city object
        }))
    );

    return {
        cities,
    };
}