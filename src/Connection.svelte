<script>
	import { Button, Text} from "@svelteuidev/core";

	// Stores
	import { lwc, wallet_account, wallet_connected, wallet_installed, wallet_locked } from './stores/lwc'

	// Misc
	import connectionRequest from './connection_request'

	let connecting = false
	let message = ''

	$: status = $wallet_connected ? "Connected" : ""

	// send connection request
	const connect = () => {
		connecting = true
		$lwc.sendConnection(connectionRequest)
		.then(() => {
			if ($lwc.approved){
				status = 'Connected'
			}else{
				status = 'Connected Failed'
			}
			connecting = false
			lwc.set($lwc)
		})
		.catch(e => {
			message = e.message
			status = 'Connected Failed'
			connecting = false
		})
	}

</script>
{#if $lwc != null}
	{#if $wallet_installed}
		{#if !$wallet_locked}
			<Text size='md' css={{ marginBottom: 10 }}>Account:</Text>
			<Text size='lg' css={{ marginBottom: 10 }} color="blue">{$wallet_account || "None"}</Text>	
			<Text size='md' css={{ marginBottom: 10 }}>Status:</Text>
			<Text size='lg' css={{ marginBottom: 10 }} color={$wallet_connected ? "teal" : "red"}>{status || "Not Connected"}</Text>
			{#if message}
				<Text size='md' css={{ marginBottom: 10 }}>Message:</Text>
				<Text size='lg' css={{ marginBottom: 20 }} color="blue">{message}</Text>
			{/if}
			<Button diabled={$wallet_connected} color='teal' on:click={connect} loading={connecting}>Connect Wallet</Button>
		{:else}
			<Text size='md' css={{ marginBottom: 10 }}>Account:</Text>
			<Text size='lg' css={{ marginBottom: 10 }} color="blue">None</Text>	
			<Text size='md' css={{ marginBottom: 10 }}>Status:</Text>
			<Text size='lg' css={{ marginBottom: 10 }} color="red">Wallet is Locked</Text>
		{/if}
	{:else}
		<Text size='md' css={{ marginBottom: 10 }}>Account:</Text>
		<Text size='lg' css={{ marginBottom: 10 }} color="blue">None</Text>	
		<Text size='md' css={{ marginBottom: 10 }}>Status:</Text>
		<Text size='lg' css={{ marginBottom: 10 }} color="red">Wallet is not installed.</Text>
	{/if}
{/if}
