import { base } from "viem/chains";

export const baseNetwork = {
  id: base.id,
  name: base.name,
  nativeCurrency: base.nativeCurrency.symbol,
  blockExplorer: base.blockExplorers.default.url
};
