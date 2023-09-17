<script lang="ts">
  import Routes from './routes/+page.svelte';
  import { listings } from './lib/store';
  import listingService from './lib/services/listing.service';
  import { onMount } from 'svelte';
  import { EHttpCode, ELocalStorage } from './lib/enums/local-storage.enum';

	onMount(() => {
    const userIdStorage = localStorage.getItem(ELocalStorage.USER_ID);

    if (userIdStorage) {
      listingService.listListings(parseInt(userIdStorage)).then(response => {
        if (response.status === EHttpCode.OK && response.data) {
          listings.set(response.data);
        }
      });
    }
  });
</script>

<Routes />
