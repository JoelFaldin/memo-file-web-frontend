<script setup lang="ts">
import { useQuery } from 'vue-query';

const fetchData = async () => {
    const res = await fetch('http://localhost:3000/memo/overall');
    const response = await res.json();

    return response;
}

const { isLoading, isError, data, error } = useQuery('overall', fetchData);

</script>

<template>
    
    <span v-if="isLoading">
        <p>Loading...</p>
    </span>
    <span v-else-if="isError">
        <p>There was an error mate</p>
    </span>
    <span v-else-if="data">
        <table>
            <tr v-for="count in data.totalCount">
                <td>{{ count.count }}</td>
                <td>{{ count.label }}</td>
            </tr>
        </table>
    </span>


</template>
