<template>
  <div>
    <h1>vue-Query</h1>
    <h2>Refresh me!</h2>
    {{ data }}
  </div>
</template>

<script>
import { useQuery } from "vue-query";

const fetcher = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('prefetchedData_' + Math.random()), 1000)
  })
}

export default defineComponent({
  setup() {
    const { data, suspense } = useQuery(["test"], fetcher);

    onServerPrefetch(async () => {
      await suspense();
    });

    return { data };
  },
});
</script>

<style>
</style>
