<script lang="ts">
    import { createEventDispatcher, type EventDispatcher } from 'svelte';

    // Define event types
    type Events = {
        select: string; // Name of the event and its detail type
    };

    // Initialize the event dispatcher with typed events
    const dispatch: EventDispatcher<Events> = createEventDispatcher<Events>();

    // Props
    export let options: string[] = [];
    export let placeholder: string = 'Search...';

    // State variables
    let searchInput: string = '';
    let showPopup: boolean = false;
    let highlightedIndex: number = -1;
    let inputElement: HTMLInputElement;

    // Filter options based on user input
    $: filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Handle option selection
    function handleSelect(option: string) {
        searchInput = option;
        showPopup = false;
        dispatch('select', option); // Emit selected option
    }

    // Handle blur with delay
    function delayedBlur() {
        setTimeout(() => {
            showPopup = false;
        }, 100);
    }

    // Handle keydown events for navigation
    function handleKeydown(event: KeyboardEvent) {
        if (!filteredOptions.length) return;

        switch (event.key) {
            case 'ArrowDown':
                highlightedIndex = (highlightedIndex + 1) % filteredOptions.length;
                event.preventDefault();
                break;
            case 'ArrowUp':
                highlightedIndex = (highlightedIndex - 1 + filteredOptions.length) % filteredOptions.length;
                event.preventDefault();
                break;
            case 'Enter':
                if (highlightedIndex >= 0) {
                    handleSelect(filteredOptions[highlightedIndex]);
                }
                break;
            case 'Escape':
                showPopup = false;
                break;
        }
    }

    function clear() {
        searchInput = ''; // Reset the search input
        highlightedIndex = -1; // Reset the highlighted index
        showPopup = false; // Close the dropdown
    }

    export { clear };

    // Show the dropdown if input is not empty
    $: {
        if (searchInput.trim() && document.activeElement === inputElement) {
            showPopup = true;
        }
    }
</script>

<!-- Input Field and Popup Wrapper -->
<div class="input-wrapper">
    <input
        bind:this={inputElement}
        class="input"
        type="search"
        bind:value={searchInput}
        {placeholder}
        on:focus={() => (showPopup = true)}
        on:blur={delayedBlur}
        on:keydown={handleKeydown}
    />
    {#if showPopup}
        <div class="popup">
            {#if filteredOptions.length > 0}
                {#each filteredOptions as option, i}
                    <p
                        class="popup-option {i === highlightedIndex ? 'highlighted' : ''}"
                        on:pointerdown={() => handleSelect(option)}>
                        {option}
                    </p>
                {/each}
            {:else}
                <p>No results found.</p>
            {/if}
        </div>
    {/if}
</div>

<style>
    .input-wrapper {
        position: relative;
        display: inline-block;
        width: 100%;
    }

    .popup {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        width: 100%;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }

    .popup-option {
        padding: 0.5rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .popup-option:hover,
    .popup-option.highlighted {
        background-color: #f0f0f0;
    }
</style>
