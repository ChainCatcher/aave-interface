import { TenderlyFork, DEFAULT_TEST_ACCOUNT } from '../tools/tenderly';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { CustomizedBridge } from '../tools/bridge';
import { ChainId } from '@aave/contract-helpers';

const URL = Cypress.env('URL');
// const PERSIST_FORK_AFTER_RUN = Cypress.env('PERSIST_FORK_AFTER_RUN');

export const configEnvWithTenderly = ({
  chainId,
  market,
  tokens,
}: {
  chainId: number;
  market: string;
  tokens?: { address: string }[];
}) => {
  const tenderly = new TenderlyFork({ forkNetworkID: chainId });
  before(async () => {
    await tenderly.init();
    await tenderly.add_balance(DEFAULT_TEST_ACCOUNT.address, 10000);
    if (tokens) {
      await Promise.all(
        tokens.map((token) => tenderly.getERC20Token(DEFAULT_TEST_ACCOUNT.address, token.address))
      );
    }
  });
  before('Open main page', () => {
    const rpc = tenderly.get_rpc_url();
    const provider = new JsonRpcProvider(rpc, 3030);
    const signer = new Wallet(DEFAULT_TEST_ACCOUNT.privateKey, provider);
    cy.visit(URL, {
      onBeforeLoad(win) {
        // eslint-disable-next-line
        (win as any).ethereum = new CustomizedBridge(signer, provider);
        win.localStorage.setItem('forkEnabled', 'true');
        // forks are always expected to run on chainId 3030
        win.localStorage.setItem('forkNetworkId', '3030');
        win.localStorage.setItem('forkBaseChainId', chainId.toString());
        win.localStorage.setItem('forkRPCUrl', rpc);
        // win.localStorage.setItem('currentProvider', 'browser');
        win.localStorage.setItem('walletProvider', 'injected');
        // win.localStorage.setItem('WEB3_CONNECT_CACHED_PROVIDER', '"injected"');
        win.localStorage.setItem('selectedAccount', DEFAULT_TEST_ACCOUNT.address.toLowerCase());
        win.localStorage.setItem('selectedMarket', market);
        // required when testing governance/staking as otherwise the fork will check for kovan fork
        win.localStorage.setItem('testnetsEnabled', 'true');
      },
    });
  });
  after(async () => {
    // if (!PERSIST_FORK_AFTER_RUN) await tenderly.deleteFork();
  });
};

export const configEnvWithTenderlyMainnetFork = ({
  market = `fork_proto_mainnet`,
  tokens,
}: {
  market?: string;
  tokens?: { address: string }[];
}) => {
  configEnvWithTenderly({ chainId: ChainId.mainnet, market, tokens });
};

export const configEnvWithTenderlyPolygonFork = ({
  market = `fork_proto_polygon`,
  tokens,
}: {
  market?: string;
  tokens?: { address: string }[];
}) => {
  configEnvWithTenderly({ chainId: ChainId.polygon, market, tokens });
};

export const configEnvWithTenderlyAvalancheFork = ({
  market = `fork_proto_avalanche`,
  tokens,
}: {
  market?: string;
  tokens?: { address: string }[];
}) => {
  configEnvWithTenderly({ chainId: ChainId.avalanche, market, tokens });
};

export const configEnvWithTenderlyAvalancheFujiFork = ({
  market = `proto_fuji_v3`,
  tokens,
}: {
  market?: string;
  tokens?: { address: string }[];
}) => {
  configEnvWithTenderly({ chainId: ChainId.fuji, market, tokens });
};

export const configEnvWithTenderlyRinkebyFork = ({
  market = `fork_proto_eth_rinkeby_v3`,
  tokens,
}: {
  market?: string;
  tokens?: { address: string }[];
}) => {
  configEnvWithTenderly({ chainId: ChainId.rinkeby, market, tokens });
};

export const configEnvWithTenderlyMumbaiFork = ({
  market = `fork_proto_eth_rinkeby_v3`,
  tokens,
}: {
  market?: string;
  tokens?: { address: string }[];
}) => {
  configEnvWithTenderly({ chainId: ChainId.mumbai, market, tokens });
};

export const configEnvWithTenderlyOptimismKovanFork = ({
  market = `fork_proto_optimism_kovan_v3`,
  tokens,
}: {
  market?: string;
  tokens?: { address: string }[];
}) => {
  configEnvWithTenderly({ chainId: ChainId.optimism_kovan, market, tokens });
};

export const configEnvWithTenderlyFantomTestnetFork = ({
  market = `fork_proto_fantom_testnet_v3`,
  tokens,
}: {
  market?: string;
  tokens?: { address: string }[];
}) => {
  configEnvWithTenderly({ chainId: ChainId.fantom_testnet, market, tokens });
};

export const configEnvWithTenderlyFantomFork = ({
  market = `fork_proto_fantom_v3`,
  tokens,
}: {
  market?: string;
  tokens?: { address: string }[];
}) => {
  configEnvWithTenderly({ chainId: ChainId.fantom, market, tokens });
};

export const configEnvWithTenderlyHarmonyTestnetFork = ({
  market = `fork_proto_harmony_testnet_v3`,
  tokens,
}: {
  market?: string;
  tokens?: { address: string }[];
}) => {
  configEnvWithTenderly({ chainId: ChainId.harmony_testnet, market, tokens });
};

export const configEnvWithTenderlyArbitrumRinkebyFork = ({
  market = `fork_proto_eth_rinkeby_v3`,
  tokens,
}: {
  market?: string;
  tokens?: { address: string }[];
}) => {
  configEnvWithTenderly({ chainId: ChainId.arbitrum_rinkeby, market, tokens });
};

export const configEnvWithTenderlyArbitrumFork = ({
  market = `fork_proto_arbitrum_v3`,
  tokens,
}: {
  market?: string;
  tokens?: { address: string }[];
}) => {
  configEnvWithTenderly({ chainId: ChainId.arbitrum_one, market, tokens });
};
