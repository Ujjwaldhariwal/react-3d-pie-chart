// Sample data for different sections
export const connectDisconnectData = [
  { id: 1, label: 'Connected', value: 375095, color: '#10B981' },
  { id: 2, label: 'Disconnected', value: 3835, color: '#EF4444' },
  { id: 3, label: 'Communication', value: 2500, color: '#3B82F6' },
  { id: 4, label: 'Non Communication', value: 1200, color: '#F59E0B' }
];

export const communicationStatusData = {
  fdr: [
    { id: 1, label: 'On Line Meters', value: 85, color: '#0EA5E9' },
    { id: 2, label: 'Off Line Meters', value: 15, color: '#F97316' }
  ],
  dtr: [
    { id: 1, label: 'On Line Meters', value: 92, color: '#0EA5E9' },
    { id: 2, label: 'Off Line Meters', value: 8, color: '#F97316' }
  ],
  consumer: [
    { id: 1, label: 'On Line Meters', value: 78, color: '#0EA5E9' },
    { id: 2, label: 'Off Line Meters', value: 22, color: '#F97316' }
  ]
};

export const disconnectionAgeingData = [
  { id: 1, label: 'Less than 2 Months', value: 45, color: '#06B6D4' },
  { id: 2, label: 'More than 2 Months', value: 25, color: '#8B5CF6' },
  { id: 3, label: 'Between 30 and 15', value: 15, color: '#10B981' },
  { id: 4, label: 'Between 15 and 7', value: 10, color: '#F59E0B' },
  { id: 5, label: 'Less than 7', value: 5, color: '#EF4444' }
];

export const monthlyPFStatusData = [
  { id: 1, label: 'PF Between 0.9 and 1', value: 60, color: '#10B981' },
  { id: 2, label: 'PF Between 0.85 and 0.9', value: 25, color: '#F59E0B' },
  { id: 3, label: 'PF Less than 0.85', value: 15, color: '#EF4444' }
];

export const outageStatusData = {
  duration: [
    { id: 1, label: 'Duration 0-5', value: 30, color: '#3B82F6' },
    { id: 2, label: 'Duration 5-10', value: 25, color: '#10B981' },
    { id: 3, label: 'Duration 10-60', value: 35, color: '#F59E0B' },
    { id: 4, label: 'Duration >60', value: 10, color: '#EF4444' }
  ],
  maxOutage: [
    { id: 1, label: 'Duration 0-5', value: 20, color: '#3B82F6' },
    { id: 2, label: 'Duration 5-10', value: 30, color: '#10B981' },
    { id: 3, label: 'Duration 10-60', value: 40, color: '#F59E0B' },
    { id: 4, label: 'Duration >60', value: 10, color: '#EF4444' }
  ]
};

export const installedMetersData = [
  { id: 1, label: 'Consumer', value: 85, color: '#0EA5E9' },
  { id: 2, label: 'Others', value: 15, color: '#F97316' }
];

// Dashboard sections configuration
export const dashboardSections = [
  {
    id: 'connect-disconnect',
    title: 'Connect & Disconnect Status',
    icon: '🔌',
    subtitle: 'Real-time connection monitoring',
    defaultOpen: true,
    charts: [
      {
        id: 'main-status',
        title: 'Overall Status',
        type: 'pie',
        data: connectDisconnectData,
        height: '300px'
      },
      {
        id: 'installed-meters',
        title: 'Installed Meters',
        type: 'donut',
        data: installedMetersData,
        height: '250px'
      }
    ]
  },
  {
    id: 'communication',
    title: 'Communication Status',
    icon: '📡',
    subtitle: 'Network communication metrics',
    defaultOpen: false,
    charts: [
      {
        id: 'comm-fdr',
        title: 'Communication Status - FDR',
        type: 'donut',
        data: communicationStatusData.fdr
      },
      {
        id: 'comm-dtr',
        title: 'Communication Status - DTR',
        type: 'donut',
        data: communicationStatusData.dtr
      },
      {
        id: 'comm-consumer',
        title: 'Communication Status - Consumer',
        type: 'donut',
        data: communicationStatusData.consumer
      }
    ]
  },
  {
    id: 'disconnection-ageing',
    title: 'Disconnection Ageing & PF Status',
    icon: '⏰',
    subtitle: 'Aging analysis and power factor monitoring',
    defaultOpen: false,
    charts: [
      {
        id: 'disconnection-aging',
        title: 'Disconnection Ageing',
        type: 'pie',
        data: disconnectionAgeingData
      },
      {
        id: 'monthly-pf',
        title: 'Monthly PF Status',
        type: 'pie',
        data: monthlyPFStatusData
      }
    ]
  },
  {
    id: 'outage-status',
    title: 'Outage Status',
    icon: '⚡',
    subtitle: 'Power outage duration analysis',
    defaultOpen: false,
    charts: [
      {
        id: 'outage-duration',
        title: 'Outage Count - Duration for Feeders',
        type: 'bar',
        data: outageStatusData.duration,
        barLabelStyle: 'front'
      },
      {
        id: 'max-outage',
        title: 'Max Outage Count Feeders',
        type: 'bar',
        data: outageStatusData.maxOutage,
        barLabelStyle: 'front'
      }
    ]
  }
];