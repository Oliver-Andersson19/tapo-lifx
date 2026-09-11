import lifxLan from 'lifx-lan-client';

const LifxClient = lifxLan.Client;
const client = new LifxClient();



// These listeners are just for visibility in the console — actual light
// lookups always go through client.lights(), which only returns lights
// currently considered active, so there's nothing stale to track here.
client.on('light-new', (light) => {
  console.log(`[lifx] discovered light ${light.id}`);
});

client.on('light-offline', (light) => {
  console.log(`[lifx] light offline: ${light.id}`);
});

client.on('light-online', (light) => {
  console.log(`[lifx] light back online: ${light.id}`);
});


export function startLifxDiscovery() {
  client.init();
}

export function listLights() {
  return client.lights().map((light) => ({ id: light.id }));
}

function getLight(id) {
  const activeLights = client.lights();

  // If no id is given and there's exactly one bulb, default to it.
  if (!id && activeLights.length === 1) {
    return activeLights[0];
  }

  const light = activeLights.find((l) => l.id === id);
  if (!light) throw new Error(`No active LIFX light found for id "${id}"`);
  return light;
}

export function turnLightOn(id) {
  return new Promise((resolve, reject) => {
    getLight(id).on(0, (err) => (err ? reject(err) : resolve()));
  });
}

export function turnLightOff(id) {
  return new Promise((resolve, reject) => {
    getLight(id).off(0, (err) => (err ? reject(err) : resolve()));
  });
}

export function getLightState(id) {
  return new Promise((resolve, reject) => {
    getLight(id).getState((err, state) => (err ? reject(err) : resolve(state)));
  });
}