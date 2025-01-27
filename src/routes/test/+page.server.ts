import { json } from '@sveltejs/kit';
import places from '$lib/data/places.json';

export function load() {
    return {
        globalRegions: places.globalRegions.map(region => ({
            name: region.name,
            countries: region.countries
        }))
    };
}


