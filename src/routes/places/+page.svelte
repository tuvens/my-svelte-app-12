<script lang="ts">
    import DropdownPopup from '$lib/components/DropdownPopup.svelte';
	import type { DropdownOption } from '$lib/components/types.js';
	import type { GlobalRegion, Country, City } from '$lib/data/types';

	export let data: {
		globalRegions: GlobalRegion[];
		countries: Country[];
		cities: City[];
	};

	// State variables
	let selectedRegion: DropdownOption | null = null;
    let selectedCountry: DropdownOption | null = null;
	let selectedCity: DropdownOption | null = null;

	// Country options (dynamically populated based on selected region)
	let countryOptions: DropdownOption[] = [];
	let cityOptions: DropdownOption[] = [];

	// Filtered cities (dynamically populated based on selected country)
    let filteredCities: City[] = data.cities; // Start with all cities by default

    // Handle when a region is clicked
    function handleRegionClick(region: DropdownOption) {
		selectedRegion = region; // Set selected region
        selectedCountry = null; // Clear country selection
		selectedCity = null; // Clear city selection

		countryOptions =
            data.globalRegions
                .find(r => r.name === region.value)
                ?.countries.map(country => ({ value: country, label: country })) || []; // Populate countries
		cityOptions = []; // Clear city options

        // Filter cities by selected region
        filteredCities = data.cities.filter(city => city.globalRegion === region.value);

        console.log('Selected Region:', region.value); // Log the selected region
    }

	/*
    // Handle when a country is clicked
	function handleCountryClick(country: DropdownOption) {
		selectedCountry = country; // Set selected country
		selectedCity = null; // Clear city selection

		// Find the selected region
		const matchingRegion = data.globalRegions.find(region =>
			region.countries.includes(country.value)
		);

		// Find the cities for the selected country
		if (matchingRegion) {
			cityOptions =
				data.cities
					.filter(city => city.globalRegion === matchingRegion.name && city.country === country.value)
					.map(city => ({
						value: city.name,
						label: city.name,
					}));
			console.log('Matching Region:', matchingRegion);

			filteredCities = data.cities.filter(
				city => city.globalRegion === matchingRegion.name && city.country === country.value
			);
		} else {
			cityOptions = [];
			filteredCities = [];
			console.error('No matching region found for:', country.value);
		}

		console.log('Selected Country:', country.value); // Log the selected country
		console.log('City Options:', cityOptions);
	}
	*/

	 
	function handleCountryClick(country: DropdownOption) {
		// Set the selected country and clear any previously selected city
		selectedCountry = country;
		selectedCity = null;

		// Log the selected country for debugging
		console.log('Selected Country:', country.value);

		// Populate city options based on the selected country
		// This filters the cities to find those that belong to the selected country
		cityOptions = data.cities
			.filter(city => city.country === country.value) // Match cities by country
			.map(city => ({
				value: city.name, // Set the value for the dropdown
				label: city.name, // Set the label to display in the dropdown
			}));

		// Log the available city options for the dropdown
		console.log('City Options:', cityOptions);

		// Filter cities for the table to display only those that match the selected country
		filteredCities = data.cities.filter(
			city =>
				// Check if a region is selected, and match the city's global region if so
				(!selectedRegion || city.globalRegion === selectedRegion.value) &&
				// Always ensure the city matches the selected country
				city.country === country.value
		);

		// Log the filtered cities to verify what will be displayed in the table
		console.log('Filtered Cities:', filteredCities);
	}	

	// Handle when a city is clicked
	function handleCityClick(city: DropdownOption) {
        selectedCity = city; // Set selected city

		filteredCities = data.cities.filter(
       		c =>
				c.globalRegion === selectedRegion?.value &&
				c.country === selectedCountry?.value &&
				c.name === city.value
		);
	
        console.log('Selected City:', city.value);
    }
</script>

<h1>Filter by Region and Country</h1>

<div class="flex flex-col sm:flex-row gap-4">
    <!-- Global Regions Dropdown -->
    <div>
        <h2>Global Regions</h2>
        <DropdownPopup
            options={data.globalRegions.map(region => ({ value: region.name, label: region.name }))}
            onSelect={handleRegionClick}
        />
    </div>

    <!-- Country Dropdown -->
    {#if selectedRegion}
        <div>
            <h2>Countries in {selectedRegion.label}</h2>
            <DropdownPopup
                options={countryOptions}
                onSelect={handleCountryClick}
            />
        </div>
    {/if}

    <!-- City Dropdown -->
    {#if selectedCountry}
        <div>
            <h2>Cities in {selectedCountry.label}</h2>
            <DropdownPopup
                options={cityOptions}
                onSelect={handleCityClick}
            />
        </div>
    {/if}
</div>

{#if filteredCities.length === 0}
    <p class="text-gray-500 italic">No cities match your filters.</p>
{:else}
	{#if selectedCountry}
		<h2>Cities in {selectedCountry.label}</h2>
	{:else if selectedRegion}
		<h2>Cities in {selectedRegion.label}</h2>
	{:else}
		<h2>Cities around the World</h2>
	{/if}
	<table>
		<thead>
			<tr>
				<th>City</th>
				<th>Country</th>
				<th>Latitude</th>
				<th>Longitude</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredCities as city}
				<tr>
					<td>{city.name}</td>
					<td>{city.country}</td>
					<td>{city.latitude}</td>
					<td>{city.longitude}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}