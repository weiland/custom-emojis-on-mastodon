<script lang="ts">
	async function handleSubmit({ target }: SubmitEvent): Promise<void> {
		if (!target) {
			return;
		}
		const data = new FormData(target as HTMLFormElement);
		const hostname = data.get('hostname');
		if (!hostname) return;
		location.href = `/${hostname}`;
	}
</script>

<form action="/" on:submit|preventDefault={handleSubmit}>
	<label for="hostname">Enter Mastodon hostname</label>
	<input name="hostname" type="text" placeholder="e.g. mastodon.lol" id="hostname" />
	<input type="submit" value="Show me all emojis! 👀" />
</form>
