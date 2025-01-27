<script lang="ts">
   // Type for dropdown options
    import type { DropdownOption } from './types.js';

    // Accept options as an array of DropdownOption
    export let options: DropdownOption[] = [];

    // Callback function to handle selection
    export let onSelect: (option: DropdownOption) => void = () => {};
</script>

<ul class="space-y">
    {#each options as option}
        <li class="bg-white hover:bg-white">
            <button
                type="button"
                on:click={() => onSelect(option)}
                class="dropdown-btn"
            >
                {option.label}
            </button>
        </li>
    {/each}
</ul>

<style>
    button.dropdown-btn {
        @apply block w-full text-left px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300 !important;
    }
</style>

<!--
<script lang="ts">
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';

    export let options: { value: string; label: string }[] = [];
    export let input: string = '';
    export let popupId: string = 'dropdownPopup';
    export let popupSettings: PopupSettings;

    export let onSelect: (value: { value: string; label: string }) => void;

    let filteredOptions = [...options];

    // Filter the options based on the input
    $: filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(input.toLowerCase())
    );
</script>

<div data-popup={popupId} class="popup-container">
    {#if filteredOptions.length > 0}
        <ul>
            {#each filteredOptions as option}
                <button
                    type="button"
                    class="dropdown-item"
                    on:click={() => onSelect(option)}
                >
                    {option.label}
                </button>
            {/each}
        </ul>
    {:else}
        <p class="no-results">No matching regions found.</p>
    {/if}
</div>
-->