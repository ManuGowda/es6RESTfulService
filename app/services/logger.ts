/* istanbul ignore next */
import * as bunyan from 'bunyan';
import * as stream from 'stream';
import { settings } from '../config/Config';

let infoStream = new stream.Writable();
infoStream.writable = true;

infoStream.write = (info: any): boolean => {

  console.log(JSON.parse(info).msg);
  return true;
};

export let logger = bunyan.createLogger({
  name: settings.name,
  environment: settings.env,
  component: settings.name,
  origin_server: require('os').hostname(),
  src: true,
  streams: [
    {
      level: 'info',
      type: 'rotating-file',
      //path: `/var/log/kaybus/${settings.name}/stash_${settings.name}.log`,
      path: `/var/log/stash_${settings.name}.log`,
      period: '1d',   // daily rotation
      count: 3,        // keep 3 back copies
    }
  ]
});
