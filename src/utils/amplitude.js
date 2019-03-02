import AmplitudeSDK from "amplitude-js";

const key = process.env.AMPLITUDE_KEY;

const initAmplitude = () => {
  const instance = AmplitudeSDK.getInstance();
  instance.init(key);
  instance.setVersionName(process.env.VERSION);

  return instance;
};

export const Amplitude = initAmplitude();
