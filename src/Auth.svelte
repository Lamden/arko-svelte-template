<script>
	import { Button, Text} from "@svelteuidev/core";
    import Lamden from 'lamden-js'

    // Stores
    import { lwc, wallet_account, valid_account } from './stores/lwc'

    let loading = false

    // send connection request
	const verify = () => {
        const dapp_challenge = new Date().toString()

		$lwc.auth(dapp_challenge)
        .then((res) => {
            console.log(res)
            const { signature, vault_challenge } = res
            const challenge_message = $lwc.get_challenge_message(dapp_challenge, vault_challenge)

            if (signature){
                valid_account.set(Lamden.wallet.verify($wallet_account, challenge_message, signature))
            }
        })
        .catch(console.log)
	}

</script>
<p>
    This function will call an auth endpoint on the Lamden Vault to verify the wallet the Dapp is connected to actually has the private key.
    This can be used to authenticate users in to a website.
</p>

<Text size='md' css={{ marginBottom: 10 }}>Account:</Text>
<Text size='lg' css={{ marginBottom: 10 }} color="blue">{$wallet_account}</Text>	
<Text size='md' css={{ marginBottom: 10 }}>Account is Valid?</Text>
<Text size='lg' css={{ marginBottom: 10 }} color={$valid_account ? "teal" : "red"}>{$valid_account === null ? "" : $valid_account}</Text>	
<Button color='teal' loading={loading} on:click={verify}>Verify Account</Button>


