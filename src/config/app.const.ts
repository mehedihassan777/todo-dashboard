const AppConst: AppConstType = {
  appBaseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
  webApiBaseUrl: process.env.NEXT_PUBLIC_API_URL,
  assetsBaseUrl: process.env.NEXT_PUBLIC_ASSET_IMAGE_BASE_URL,
  webAppBaseUrl: process.env.NEXT_PUBLIC_CHS_SITE_URL,
};

interface AppConstType {
  appBaseUrl?: string;
  webApiBaseUrl?: string;
  assetsBaseUrl?: string;
  webAppBaseUrl?: string;
}

export default AppConst;
