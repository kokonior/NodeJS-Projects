import ethers from 'ethers';

const rpc = 'RPC'
const mnemonic = 'MNEMONIC 12 WORDS'

const app = express();
const provider = await new ethers.providers.WebSocketProvider(rpc)
const wallet = await new ethers.Wallet.fromMnemonic(mnemonic);
const account = await wallet.connect(provider);
