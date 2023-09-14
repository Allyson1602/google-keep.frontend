<script lang="ts">
  import Routes from './routes/+page.svelte';
  import { listings } from './lib/store';
  import listingService from './lib/services/listing.service';

  // fazendo várias requisições
  listingService.listListings().then(response => {
    listings.set(response.data);
  });
</script>

<Routes />
