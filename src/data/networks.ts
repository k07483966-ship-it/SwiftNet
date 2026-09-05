export interface Network {
  id: string;
  name: string;
  brandType: 'mtn' | 'airteltigo' | 'telecel' | 'waec';
}

export const networks: Network[] = [
  { id: '1', name: 'MTN', brandType: 'mtn' },
  { id: '2', name: 'AirtelTigo', brandType: 'airteltigo' },
  { id: '3', name: 'Telecel', brandType: 'telecel' },
  { id: '4', name: 'Results Checkers', brandType: 'waec' },
];

export interface Order {
  id: string;
  networkId: string;
  bundleName: string;
  time: string;
  amount: number;
  status: 'Success' | 'Pending' | 'Failed';
}

export const mockOrders: Order[] = [
  // empty by default to show empty state, or we can toggle
];

// Let's have a populated version for testing if needed
export const populatedOrders: Order[] = [
  { id: 'o1', networkId: '1', bundleName: 'MTN 10GB Data', time: 'Today, 10:42 AM', amount: 50, status: 'Success' },
  { id: 'o2', networkId: '3', bundleName: 'Telecel 5GB', time: 'Yesterday, 3:15 PM', amount: 30, status: 'Success' },
  { id: 'o3', networkId: '2', bundleName: 'AirtelTigo 20GB', time: 'Yesterday, 1:00 PM', amount: 80, status: 'Pending' },
];
