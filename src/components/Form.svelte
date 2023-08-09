<script lang="ts">
	async function handleSubmit({ target }: SubmitEvent): Promise<void> {
		// TODO(pascal): Remove this method since it mimics the default behaviour of the submit.
		if (!target) {
			return;
		}
		const data = new FormData(target as HTMLFormElement);
		const hostname = data.get('hostname');
		console.log('formData hostname', hostname);
		if (!hostname) return;
		location.href = `/?hostname=${hostname}`;
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label for="hostname">Enter Mastodon hostname</label>
	<input name="hostname" type="text" placeholder="e.g. mastodon.lol" id="hostname" />
	<input type="submit" value="Show me all emojis! 👀" />
</form>
