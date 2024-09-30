const { WalletAdapterNetwork } = require('@solana/wallet-adapter-base');
const { Connection, PublicKey, clusterApiUrl } = require('@solana/web3.js');

const TOKEN_MINT_ADDRESS = "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"; // USDT

const getTokenDuration = async walletAddress => {
    const res = { result: false, message: "Error" }

    try {
        const network = WalletAdapterNetwork.Mainnet;
        const connection = new Connection(clusterApiUrl(network));

        const walletPublicKey = new PublicKey(walletAddress);
        const tokenMintPublicKey = new PublicKey(TOKEN_MINT_ADDRESS);

        // Get token accounts by owner
        const tokenAccounts = await connection.getTokenAccountsByOwner(walletPublicKey, {
            mint: tokenMintPublicKey,
        });

        if (tokenAccounts.value.length === 0) {
            res.message = 'No token accounts found.';
            return res;
        }

        // Get the first token account
        const tokenAccount = tokenAccounts.value[0].pubkey;

        // Get the transaction history
        const signatures = await connection.getSignaturesForAddress(tokenAccount);
        if (signatures.length === 0) {
            res.message = 'No transactions found for this token account.';
            return res;
        }

        res.result = true;
        res.message = signatures[signatures.length - 1].blockTime;
        return res;
    } catch (error) {
        return res;
    }
}

module.exports = {
    getTokenDuration
}