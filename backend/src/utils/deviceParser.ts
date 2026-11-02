import { Request } from 'express';
import { IDeviceInfo, INetworkInfo } from '../models/ChatLog';

export function parseDeviceAndNetworkInfo(req: Request): {
  deviceInfo: IDeviceInfo;
  networkInfo: INetworkInfo;
} {
  const userAgent = (req.headers['user-agent'] || '').toString();
  const clientInfo = req.body?.clientInfo || {};

  // 1. Detect Device Type
  const isTablet =
    /tablet|ipad|playbook|silk/i.test(userAgent) ||
    (/android/i.test(userAgent) && !/mobile/i.test(userAgent));
  const isMobile =
    !isTablet &&
    /mobile|iphone|ipod|android|blackberry|iemobile|kindle|opera mini/i.test(userAgent);
  const deviceType = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop';

  // 2. Detect Operating System
  let os = 'Unknown OS';
  if (/windows nt 10.0/i.test(userAgent)) os = 'Windows 10/11';
  else if (/windows nt 6.3/i.test(userAgent)) os = 'Windows 8.1';
  else if (/windows nt 6.2/i.test(userAgent)) os = 'Windows 8';
  else if (/windows nt 6.1/i.test(userAgent)) os = 'Windows 7';
  else if (/windows/i.test(userAgent)) os = 'Windows';
  else if (/android/i.test(userAgent)) {
    const androidVer = userAgent.match(/Android\s*([0-9.]+)/i);
    os = androidVer ? `Android ${androidVer[1]}` : 'Android';
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    const iosVer = userAgent.match(/OS\s*([0-9_]+)/i);
    os = iosVer ? `iOS ${iosVer[1].replace(/_/g, '.')}` : 'iOS';
  } else if (/mac os x/i.test(userAgent)) {
    const macVer = userAgent.match(/Mac OS X\s*([0-9_]+)/i);
    os = macVer ? `macOS ${macVer[1].replace(/_/g, '.')}` : 'macOS';
  } else if (/linux/i.test(userAgent)) os = 'Linux';

  // 3. Detect Browser
  let browser = 'Unknown Browser';
  if (/edg/i.test(userAgent)) browser = 'Edge';
  else if (/samsungbrowser/i.test(userAgent)) browser = 'Samsung Internet';
  else if (/chrome|crios/i.test(userAgent)) browser = 'Chrome';
  else if (/safari/i.test(userAgent) && !/chrome|crios/i.test(userAgent)) browser = 'Safari';
  else if (/firefox|fxios/i.test(userAgent)) browser = 'Firefox';
  else if (/opr|opera/i.test(userAgent)) browser = 'Opera';

  // 4. Detect Specific Phone / Device Model
  let mobileModel = 'Unknown Device';
  if (/iphone/i.test(userAgent)) {
    mobileModel = 'Apple iPhone';
  } else if (/ipad/i.test(userAgent)) {
    mobileModel = 'Apple iPad';
  } else if (/android/i.test(userAgent)) {
    // Typical Android UA includes: (Linux; Android 14; Pixel 8 Pro Build/...) or (Linux; Android 13; SM-S918B)
    const match = userAgent.match(/Android[^;]+;\s*([^;)]+)(?:\s+Build|[;)])/i);
    if (match && match[1]) {
      mobileModel = match[1].trim();
    } else {
      mobileModel = 'Android Device';
    }
  } else if (deviceType === 'Desktop') {
    mobileModel = os;
  }

  // 5. Client provided diagnostics (screen, language, timezone)
  const screenResolution =
    typeof clientInfo.screen === 'string' ? clientInfo.screen : '';
  const language =
    typeof clientInfo.language === 'string'
      ? clientInfo.language
      : (req.headers['accept-language'] || '').split(',')[0];
  const timezone =
    typeof clientInfo.timezone === 'string' ? clientInfo.timezone : '';

  // 6. Network Information
  const forwardedFor = req.headers['x-forwarded-for'];
  let ip = 'Unknown IP';
  if (typeof forwardedFor === 'string') {
    ip = forwardedFor.split(',')[0].trim();
  } else if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    ip = forwardedFor[0].trim();
  } else if (req.socket.remoteAddress) {
    ip = req.socket.remoteAddress;
  }

  // Normalize IPv6 localhost
  if (ip === '::1' || ip === '::ffff:127.0.0.1') {
    ip = '127.0.0.1 (Localhost)';
  }

  const origin = (req.headers['origin'] || req.headers['host'] || '').toString();
  const referer = (req.headers['referer'] || '').toString();

  return {
    deviceInfo: {
      deviceType,
      os,
      browser,
      mobileModel,
      isMobile,
      screenResolution,
      language,
      timezone,
      userAgent,
    },
    networkInfo: {
      ip,
      origin,
      referer,
    },
  };
}
