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

    let loading = false
    let result = ''

    const txInfo = {
        contractName: 'currency',
        methodName: 'balance_of',
        networkType: 'testnet',
        kwargs: {
            account: '0000803efd5df09c75c0c6670742db5074e5a011b829dfd8a0c50726d263a345',  // account address
        },
        stampLimit: 100
    }

    // send connection request
	const getBalance = () => {
		loading = true
		lwc.sendTransaction(txInfo, handleTxResults) 
	}

    const handleTxResults = (response) => {
        if (response.resultInfo.type === 'error') {
            console.log(response.resultInfo.errors)
        }else{
            result = response.txBlockResult.result
        } 
        loading = false
    }

</script>

<Text size='md' css={{ marginBottom: 10 }}>Result:</Text>
<Text size='lg' css={{ marginBottom: 10 }} color="blue">{result}</Text>
<Button color='teal' loading={loading} on:click={getBalance}>Send Tx</Button>