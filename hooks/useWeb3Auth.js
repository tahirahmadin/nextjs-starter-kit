import { useEffect, useMemo, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import ethersServiceProvider from "../services/ethersServiceProvider";

import Web3 from "web3";
import { useSelector, useDispatch } from "react-redux";
import { setWalletStatus } from "../reducers/UiReducer";

export const useWeb3Auth = () => {
  const [web3Auth, setWeb3Auth] = useState(null);
  const [address, setAddress] = useState(null);

  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { walletStatus } = store.ui;

  const clientId =
    "BO4HCk43o947D30mqNyxPNCwO5gVBTNaK_k1UYMi8SGf6s1ESZhLPl4BkEL-K8ZJWmhvwMKQITFG-SBfT6m9tao"; // get from https://dashboard.web3auth.io

  useEffect(() => {
    const init = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId,

          uiConfig: {
            theme: "light",
            loginMethodsOrder: ["google", "facebook", "twitter", "apple"],
            appLogo:
              "https://cdn3d.iconscout.com/3d/free/thumb/squigly-globe-3494833-2926648@0.png",
          },
          modalZIndex: "9999",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://rpc-mumbai.maticvigil.com/",
          },
        });

        await web3authInstance.initModal();
        await ethersServiceProvider.setCurrentWeb3AuthInstance(
          web3authInstance
        );
        setWeb3Auth(web3authInstance);

        // Finding if user's session is stored
        if (web3authInstance.provider) {
          const web3 = new Web3(web3authInstance.provider);
          const accounts = (await web3.eth.getAccounts())[0];
          if (accounts) {
            await ethersServiceProvider.setCurrentAccount(accounts);
            await dispatch(setWalletStatus(walletStatus + 1));
            setAddress(accounts);
          }
        }
        await dispatch(setWalletStatus(walletStatus + 1));
      } catch (error) {
        console.error(error);
        // Router.push("/");
      }
    };

    init();
  }, []);

  const _web3Auth = useMemo(() => {
    let instance = ethersServiceProvider.web3AuthInstance;

    if (!instance) {
      return null;
    }
    return instance;
  }, [walletStatus]);

  const _account = useMemo(() => {
    let addressData = ethersServiceProvider.currentAccount;

    if (!addressData) {
      return null;
    }

    return addressData;
  }, [walletStatus]);

  const _active = useMemo(() => {
    let instance = web3Auth;

    if (instance) {
      return instance.status === "connected";
    } else {
      let instanceFromEthers = ethersServiceProvider.web3AuthInstance;
      if (instanceFromEthers) {
        return instanceFromEthers.status === "connected";
      }
      return false;
    }
  }, [walletStatus]);
  const _wallet = useMemo(() => {
    let instance = web3Auth;

    if (instance) {
      if (instance.status === "connected") {
        return 2;
      } else if (instance.status === "ready") {
        return 1;
      } else {
        return 0;
      }
    } else {
      let instanceFromEthers = ethersServiceProvider.web3AuthInstance;
      if (instanceFromEthers) {
        if (instanceFromEthers.status === "connected") {
          return 2;
        } else if (instanceFromEthers.status === "ready") {
          return 1;
        } else {
          return 0;
        }
      }
      return 0;
    }
  }, [walletStatus]);

  const _disconnect = async () => {
    let instance = ethersServiceProvider.web3AuthInstance;

    if (instance) {
      if (instance.status != "connected") {
        return;
      } else {
        await instance.logout();
        ethersServiceProvider.setCurrentWeb3AuthInstance(instance);
        ethersServiceProvider.setCurrentAccount(null);
        await dispatch(setWalletStatus(walletStatus + 1));
        setAddress(null);
        setWeb3Auth(instance);
        window.location.reload();
      }
    }
  };
  // To connect the smart contract wallet
  const _connect = async () => {
    let web3AuthInstance = ethersServiceProvider.web3AuthInstance;

    if (!web3AuthInstance) {
      console.log("web3auth not initialized yet");
      return;
    }
    // Connecting the wallet
    const web3authProvider = await web3AuthInstance.connect();
    //setting up address into ethersServicesProvider
    const web3 = new Web3(web3authProvider);
    const accounts = (await web3.eth.getAccounts())[0];
    if (accounts) {
      await ethersServiceProvider.setCurrentWeb3AuthInstance(web3AuthInstance);
      await ethersServiceProvider.setCurrentAccount(accounts);
      await dispatch(setWalletStatus(walletStatus + 1));
      setAddress(accounts);
      setWeb3Auth(web3AuthInstance);
    }
  };

  return {
    web3AuthSC: _web3Auth,
    accountSC: _account,
    active: _active,
    connect: _connect,
    disconnect: _disconnect,
    wallet: _wallet,
  };
};
