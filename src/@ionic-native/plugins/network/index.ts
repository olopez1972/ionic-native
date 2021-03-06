import { Injectable } from '@angular/core';
import {
  Cordova,
  CordovaCheck,
  CordovaProperty,
  IonicNativePlugin,
  Plugin
} from '@ionic-native/core';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';

declare const navigator: any;

/**
 * @name Network
 * @description
 * Requires Cordova plugin: cordova-plugin-network-information. For more info, please see the [Network plugin docs](https://github.com/apache/cordova-plugin-network-information).
 *
 * @usage
 * ```typescript
 * import { Network } from '@ionic-native/network';
 *
 * constructor(private network: Network) { }
 *
 * ...
 *
 * // watch network for a disconnect
 * let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
 *   console.log('network was disconnected :-(');
 * });
 *
 * // stop disconnect watch
 * disconnectSubscription.unsubscribe();
 *
 *
 * // watch network for a connection
 * let connectSubscription = this.network.onConnect().subscribe(() => {
 *   console.log('network connected!');
 *   // We just got a connection but we need to wait briefly
 *    // before we determine the connection type. Might need to wait.
 *   // prior to doing any api requests as well.
 *   setTimeout(() => {
 *     if (this.network.type === 'wifi') {
 *       console.log('we got a wifi connection, woohoo!');
 *     }
 *   }, 3000);
 * });
 *
 * // stop connect watch
 * connectSubscription.unsubscribe();
 *
 * ```
 * @advanced
 * The `type` property will return one of the following connection types: `unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
 */
@Plugin({
  pluginName: 'Network',
  plugin: 'cordova-plugin-network-information',
  pluginRef: 'navigator.connection',
  repo: 'https://github.com/apache/cordova-plugin-network-information',
  platforms: ['Amazon Fire OS', 'Android', 'Browser', 'iOS', 'Windows']
})
@Injectable()
export class Network extends IonicNativePlugin {
  /**
   * Connection type
   * @return {string}
   */
  @CordovaProperty type: string;

  /**
   * Downlink Max Speed
   * @return {string}
   */
  @CordovaProperty downlinkMax: string;

  /**
   * Returns an observable to watch connection changes
   * @return {Observable<any>}
   */
  @CordovaCheck()
  onchange(): Observable<any> {
    return merge(this.onConnect(), this.onDisconnect());
  }

  /**
   * Get notified when the device goes offline
   * @returns {Observable<any>} Returns an observable.
   */
  @Cordova({
    eventObservable: true,
    event: 'offline',
    element: document
  })
  onDisconnect(): Observable<any> {
    return;
  }

  /**
   * Get notified when the device goes online
   * @returns {Observable<any>} Returns an observable.
   */
  @Cordova({
    eventObservable: true,
    event: 'online',
    element: document
  })
  onConnect(): Observable<any> {
    return;
  }
}
