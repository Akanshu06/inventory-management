export interface SocketEvents {
  'stock-updated': {
    productId: string;
    locationId: string;
    quantity: number;
    timestamp: Date;
  };
  'new-notification': {
    notification: any;
    timestamp: Date;
  };
}