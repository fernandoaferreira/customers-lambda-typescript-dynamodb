export default {
  type: "object",
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    clientId: { type: 'string' }
  },
  required: ['name']
} as const;
