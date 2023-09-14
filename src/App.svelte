<script lang="ts">
  import Routes from './routes/+page.svelte';
  import { listings } from './lib/store';
  import listingService from './lib/services/listing.service';
  import { onMount } from 'svelte';

	onMount(() => {
    listingService.listListings().then(response => {
      listings.set(response.data);
    });
  });
</script>

<Routes />
