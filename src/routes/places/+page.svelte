<script lang="ts">
    import AutocompleteDropdown from '$lib/components/AutocompleteDropdown.svelte';
    import type { GlobalRegion, Country, City } from '$lib/data/types';

    export let data: {
        globalRegions: GlobalRegion[];
        countries: Country[];
        cities: City[];
    };

    // State variables
    let selectedRegion: string | null = null;
    let selectedCountry: string | null = null;
    let selectedCity: string | null = null;

    // Filtered options for each dropdown
    let regionOptions: string[] = data.globalRegions.map(region => region.name);
    let countryOptions: string[] = [];
    let cityOptions: string[] = [];

    // Filtered cities for the table
    let filteredCities: City[] = data.cities;

	let regionDropdown: AutocompleteDropdown | null = null;
	let countryDropdown: AutocompleteDropdown | null = null;
	let cityDropdown: AutocompleteDropdown | null = null;


    // Handle region selection
    function handleRegionSelect(region: string) {
        selectedRegion = region;
        selectedCountry = null; // Reset selected country
        selectedCity = null; // Reset selected city

		// Clear dependent dropdowns
		countryDropdown?.clear();
		cityDropdown?.clear();

        // Filter countries based on selected region
        countryOptions =
            data.globalRegions
                .find(r => r.name === region)
                ?.countries || [];

        // Filter cities based on selected region
        filteredCities = data.cities.filter(city => city.globalRegion === region);
        cityOptions = []; // Clear city options

        console.log('Selected Region:', region);
    }

    // Handle country selection
    function handleCountrySelect(country: string) {
        selectedCountry = country;
        selectedCity = null; // Reset selected city

		// Clear dependent dropdown
		cityDropdown?.clear();

        // Filter cities based on selected country
        filteredCities = data.cities.filter(city => city.country === country);
        cityOptions = filteredCities.map(city => city.name);

        console.log('Selected Country:', country);
    }

    // Handle city selection
    function handleCitySelect(city: string) {
        selectedCity = city;

        // Filter cities based on selected city
        filteredCities = data.cities.filter(c => c.name === city);

        console.log('Selected City:', city);
    }
</script>

<h1>Filter by Region, Country, and City</h1>

<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <!-- Global Regions Dropdown -->
    <div>
        <h2>Global Regions</h2>
        <AutocompleteDropdown
			bind:this={regionDropdown}
            options={regionOptions}
            placeholder="Select a region"
            on:select={(event) => handleRegionSelect(event.detail)}
        />
    </div>

    <!-- Country Dropdown -->
    <div>
        <h2>Countries</h2>
        <AutocompleteDropdown
			bind:this={countryDropdown}
            options={countryOptions}
            placeholder="Select a country"
            on:select={(event) => handleCountrySelect(event.detail)}
        />
    </div>

    <!-- City Dropdown -->
    <div>
        <h2>Cities</h2>
        <AutocompleteDropdown
			bind:this={cityDropdown}
            options={cityOptions}
            placeholder="Select a city"
            on:select={(event) => handleCitySelect(event.detail)}
        />
    </div>
</div>

<!-- Table of cities -->
{#if filteredCities.length > 0}
    <h2 class="mt-4">Filtered Cities</h2>
    <table class="table-auto w-full border-collapse border border-gray-300">
        <thead>
            <tr>
                <th class="border px-4 py-2 bg-gray-200">City</th>
                <th class="border px-4 py-2 bg-gray-200">Country</th>
                <th class="border px-4 py-2 bg-gray-200">Latitude</th>
                <th class="border px-4 py-2 bg-gray-200">Longitude</th>
            </tr>
        </thead>
        <tbody>
            {#each filteredCities as city}
                <tr>
                    <td class="border px-4 py-2">{city.name}</td>
                    <td class="border px-4 py-2">{city.country}</td>
                    <td class="border px-4 py-2">{city.latitude}</td>
                    <td class="border px-4 py-2">{city.longitude}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <p class="text-gray-500 italic mt-4">No cities match your filters.</p>
{/if}

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 1rem;
    }

    @media (min-width: 640px) {
        .grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }
</style>