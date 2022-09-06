<script>
    import { onDestroy } from 'svelte';
	import { Button, Text} from "@svelteuidev/core";
	import WalletController from 'lamden_wallet_controller';

	// init
	const connectionRequest = {
		appName: 'My dApp name', // Your DAPPS's name
		version: '1.0.0', // any version to start, increment later versions to update connection info
		logo: 'images/logo.png', // or whatever the location of your logo
		contractName: 'currency', // Contract name
		networkType: 'testnet', // other option is 'mainnet'
	}
	const lwc = new WalletController(connectionRequest)

	let connecting = false
	let account = ''
	let message = ''
	let status = ''

	$: connectBtnText = connecting ? 'Connecting' : 'Connect Wallet'

	// send connection request
	const connect = () => {
		connecting = true
		lwc.sendConnection(connectionRequest)
	}

	// Create event handlers
	const handleWalletInfo = (response) => {
		console.log(response)
		if (response.errors && response.errors.length > 0){
			message = response.errors[0]
			status = 'Connected Failed'
		} else {
			//Get user's account address
			account = response.wallets[0]
			status = 'Connected'
		}
		connecting = false
	}

	//Connect to event emitters
	lwc.events.on('newInfo', handleWalletInfo) // Wallet Info Events, including errors

    // remove listener when the component is unmounted.
    onDestroy(() => {
        lwc.events.removeListener('newInfo', handleWalletInfo)
    })

</script>

<Text size='md' css={{ marginBottom: 10 }}>Account:</Text>
<Text size='lg' css={{ marginBottom: 10 }} color="blue">{account}</Text>	
<Text size='md' css={{ marginBottom: 10 }}>Status:</Text>
<Text size='lg' css={{ marginBottom: 10 }} color="blue">{status}</Text>
<Text size='md' css={{ marginBottom: 10 }}>Message:</Text>
<Text size='lg' css={{ marginBottom: 20 }} color="blue">{message}</Text>
<Button color='teal' on:click={connect} loading={connecting}>{connectBtnText}</Button>