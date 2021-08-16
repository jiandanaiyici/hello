import os from 'os';

// get the ip
export function getIp(): string | undefined {
  return (
    os.networkInterfaces().en0.find((item: any) => item.family === 'IPv4') || {}
  ).address;
}
