<script lang="ts">
    // Bind the search input value
    let searchInput: string = ''; // Tracks the user input
    let showPopup: boolean = false; // Controls the visibility of the popup

    // List of options (e.g., city names)
    let options: string[] = ['Brisbane', 'Cairns', 'Gold Coast', 'Melbourne', 'Perth', 'Sydney'];

    // Filtered options based on user input
    $: filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Track the highlighted index for keyboard navigation
    let highlightedIndex: number = -1;

    // Function to handle option selection
    function handleSelect(option: string) {
        searchInput = option; // Set the input value to the selected option
        showPopup = false; // Close the dropdown
        console.log('Selected option:', option); // Log the selection
    }

    // Delayed blur to allow click events to trigger
    function delayedBlur() {
        setTimeout(() => {
            showPopup = false; // Close the dropdown after a short delay

        }, 100); // Adjust timeout as needed
    }

    // Handle keydown events for keyboard navigation
    function handleKeydown(event: KeyboardEvent) {
        if (!filteredOptions.length) return;

        switch (event.key) {
            case 'ArrowDown':
                // Move down the options
                highlightedIndex = (highlightedIndex + 1) % filteredOptions.length;
                event.preventDefault();
                break;
            case 'ArrowUp':
                // Move up the options
                highlightedIndex =
                    (highlightedIndex - 1 + filteredOptions.length) % filteredOptions.length;
                event.preventDefault();
                break;
            case 'Enter':
                // Select the currently highlighted option
                if (highlightedIndex >= 0) {
                    handleSelect(filteredOptions[highlightedIndex]);
                }
                break;
            case 'Escape':
                // Close the popup
                showPopup = false;
                break;
        }
    }

    // Automatically show the dropdown if input is not empty
    $: {
        if (searchInput.trim() && document.activeElement === inputElement) {
            showPopup = true;
        }
    }

    // Store the input element reference
    let inputElement: HTMLInputElement;

    // Log popup state changes
    $: console.log('Popup visibility:', showPopup);
</script>

<h1>Autocomplete Page</h1>

<!-- Input Field and Popup Wrapper -->
<div class="input-wrapper">
    <input
        bind:this={inputElement}
        class="input"
        type="search"
        bind:value={searchInput}
        placeholder="Search cities..."
        on:focus={() => (showPopup = true)}
        on:blur={delayedBlur}
        on:keydown={handleKeydown}
    />
    <!-- Popup Dropdown -->
    {#if showPopup}
        <div class="popup">
            {#if filteredOptions.length > 0}
                {#each filteredOptions as option, i}
                    <p class="popup-option {i === highlightedIndex ? 'highlighted' : ''}"
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
    /* Wrapper for Input and Popup */
    .input-wrapper {
        position: relative; /* Ensure popup is positioned relative to this container */
        display: inline-block; /* Optional: Keep input and popup aligned */
        width: 100%; /* Ensure the wrapper matches the input width */
    }

    .popup {
        position: absolute;
        top: calc(100% + 4px); /* Position below the input field */
        left: 0;
        width: 100%; /* Match the width of the input */
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000; /* Ensure popup is on top */
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