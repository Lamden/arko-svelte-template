<script>
	import { Tabs } from "@svelteuidev/core";
	import Connection from "./Connection.svelte";
	import SendTx from "./SendTx.svelte";

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
	</Tabs>
</div>