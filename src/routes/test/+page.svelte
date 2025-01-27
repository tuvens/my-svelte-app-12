<script lang="ts">
    import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
    import { storePopup } from '@skeletonlabs/skeleton';
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import DropdownPopup from '$lib/components/DropdownPopup.svelte';

    export let data; // Data loaded from the server
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    let input: string = ''; // Input value
    let globalRegions = data.globalRegions.map(region => ({
        value: region.name,
        label: region.name
    }));

    let popupSettings: PopupSettings = {
        event: 'focus-click',
        target: 'globalRegionPopup',
        placement: 'bottom-start',
        middleware: [offset(4), shift(), flip()]
    };

    function handleRegionSelect(region: { value: string; label: string }) {
        input = region.label;
        console.log('Selected Region:', region.value);
    }
</script>

<h1>Select a Global Region</h1>
<div>
    <label for="region-select">Global Region:</label>
    <input
        id="region-select"
        type="text"
        bind:value={input}
        class="input autocomplete"
        placeholder="Search for a region..."
        use:popup={{ ...popupSettings, target: 'globalRegionPopup' }}
    />
</div>

<DropdownPopup
    options={globalRegions}
    input={input}
    popupId="globalRegionPopup"
    popupSettings={popupSettings}
    onSelect={handleRegionSelect}
/>
