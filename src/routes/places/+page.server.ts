import placesData from '$lib/data/places.json';

export function load() {
    const globalRegions = placesData.globalRegions.map(region => ({
        name: region.name,
        countries: region.countries
    }));

    const cities = placesData.countries.flatMap(country =>
        country.cities.map(city => ({
            ...city,
            country: country.name // Add the country name to the city object
        }))
    );

    return {
        globalRegions,
        cities,
    };
}

