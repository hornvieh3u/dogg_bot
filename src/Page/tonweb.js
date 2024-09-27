import TonWeb from 'tonweb';

const httpApiUrl = 'https://toncenter.com/api/v2/jsonRPC';

const provider = new TonWeb.HttpProvider(httpApiUrl, {
  /**
   * Get your own API key at: {@link https://t.me/tonapibot}
   */
  apiKey: '',
});

const tonweb = new TonWeb(provider);