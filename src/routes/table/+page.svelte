<script lang="ts">
    export let data;
</script>

<h1>Cities</h1>

<table>
    <thead>
        <tr>
            <th>City</th>
            <th>Country</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Global Region</th>
        </tr>
    </thead>
    <tbody>
        {#each data.cities as city}
            <tr>
                <td>{city.name}</td>
                <td>{city.country}</td>
                <td>{city.latitude}</td>
                <td>{city.longitude}</td>
                <td>{city.globalRegion}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f3f4f6;
    }

    tr:nth-child(even) {
        background-color: #f9fafb;
    }

    tr:hover {
        background-color: #e5e7eb;
    }
</style>
