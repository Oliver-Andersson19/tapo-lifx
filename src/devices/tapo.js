import { loginDeviceByIp } from 'tp-link-tapo-connect';

async function getDevice(ip) {
  return loginDeviceByIp(
    process.env.TAPO_EMAIL,
    process.env.TAPO_PASSWORD,
    ip
  );
}

export async function getPlugStatus(ip) {
  const device = await getDevice(ip);
  return device.getDeviceInfo();
}

export async function turnPlugOn(ip) {
  const device = await getDevice(ip);
  return device.turnOn();
}

export async function turnPlugOff(ip) {
  const device = await getDevice(ip);
  return device.turnOff();
}
