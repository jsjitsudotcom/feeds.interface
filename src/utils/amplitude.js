import Amplitude from "amplitude-js/amplitude";

const key = process.env.AMPLITUDE_KEY;

export const getInstance = () => {
  const instance = Amplitude.getInstance();
  instance.init(key);
  instance.setVersionName(process.env.VERSION);

  return instance;
};
