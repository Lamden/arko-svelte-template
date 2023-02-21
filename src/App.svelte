<script>
	import { onMount } from 'svelte';

	import { Tabs } from "@svelteuidev/core";
	import WalletController from 'lamden_wallet_controller';

	// Components
	import Connection from "./Connection.svelte";
	import SendTx from "./SendTx.svelte";
	import Auth from "./Auth.svelte";

	// Stores
	import { lwc, walletInfo, wallet_connected } from './stores/lwc'

	// Misc
	import connectionRequest from './connection_request'

	onMount(() => {
		// Create Lamden Wallet Controller Instance
		lwc.set(new WalletController(connectionRequest))

		//Connect to wallet listeners
		$lwc.events.on('newInfo', walletInfo.set) // Wallet Info Events, including errors

		return () => $lwc.events.removeListener('newInfo', handleWalletInfo)
	})	
</script>

<style>
	.box {
		width: 50%;
    	margin: 100px auto;
	}
	.p20 {
		padding: 20px;
	}
</style>

{#if !$wallet_connected}
	<div class="box">
		<Tabs color='teal'>
			<Tabs.Tab label='Wallet Connect'>
				<div class="p20">
					<Connection />
				</div>
			</Tabs.Tab>
		</Tabs>
	</div>
{:else}
	<div class="box">
		<Tabs color='teal'>
			<Tabs.Tab label='Wallet Connect'>
				<div class="p20">
					<Connection />
				</div>
			</Tabs.Tab>
			<Tabs.Tab label='Send Transaction'>
				<div class="p20">
					<SendTx />
				</div>
			</Tabs.Tab>
			<Tabs.Tab label='Vault Auth'>
				<div class="p20">
					<Auth />
				</div>
			</Tabs.Tab>
		</Tabs>
	</div>
{/if}