<script>
	import { Button, Text} from "@svelteuidev/core";
    import { JsonView } from '@zerodevx/svelte-json-view'

    // Stores
    import { lwc } from './stores/lwc'

	// init
    const connectionRequest = {
		appName: 'My dApp name', // Your DAPPS's name
		version: '1.0.0', // any version to start, increment later versions to update connection info
		logo: 'images/logo.png', // or whatever the location of your logo
		contractName: 'currency', // Contract name
		networkType: 'testnet', // other option is 'mainnet'
        networkName: 'arko'
	}

    let loading = false
    let result = null

    const txInfo = {
        contractName: 'currency',
        methodName: 'balance_of',
        networkType: 'testnet',
        networkName: 'arko',
        kwargs: {
            account: '0000803efd5df09c75c0c6670742db5074e5a011b829dfd8a0c50726d263a345',  // account address
        },
        stampLimit: 100
    }

    // send connection request
	const getBalance = () => {
		loading = true
		$lwc.sendTransaction(txInfo, handleTxResults) 
	}

    const handleTxResults = (response) => {
        if (response.data.resultInfo.type === 'error') {
            console.log(response.data.resultInfo.errors)
        }else{
            result = JSON.parse(JSON.stringify(response.data))
        } 
        loading = false
    }

</script>
<Button color='teal' loading={loading} on:click={getBalance}>Send Simple Tx</Button>

<Text size='md' css={{ marginTop: 10, marginBottom: 10 }}>Transaction Result:</Text>
{#if result}
    <JsonView json={result} />
{:else}
{"{}"}
{/if}