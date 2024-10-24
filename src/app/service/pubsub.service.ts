
// import { Injectable } from '@angular/core';
// import PubSub from 'pubsub-js';

// @Injectable({
//   providedIn: 'root',
// })
// export class PubsubService {

//   publish(event: string, data?: any) {
//     console.log(`published ${event}`);
//     PubSub.publish(event, data);
//   }

//   subscribe(event: string, callback: Subscriber) {
//     console.log(`subscribed ${event}`);
//     return PubSub.subscribe(event, (msg, data: any) =>{
//       console.log(`received data ${event}`);
//       callback(msg, data);
//     });
//   }

//   unsubscribe(token: string) {
//     PubSub.unsubscribe(token);
//   }
// }

// // create a function to subscribe to topics
// export type Subscriber = (message: string, data: any) => void;

// export const DefaultPubsubService = new PubsubService();
