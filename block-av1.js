// Pascal (GTX 10xx) saknar AV1-avkodning i hårdvara -> CPU-avkodning laggar i hög hastighet.
// Säg till YouTube att AV1 inte stöds, så väljer spelaren VP9/H.264 (hårdvaruavkodat).
const isAv1 = t => /av01|av1/i.test(String(t));

for (const MS of [window.MediaSource, window.ManagedMediaSource]) {
  if (!MS) continue;
  const orig = MS.isTypeSupported.bind(MS);
  MS.isTypeSupported = t => !isAv1(t) && orig(t);
}

const canPlay = HTMLMediaElement.prototype.canPlayType;
HTMLMediaElement.prototype.canPlayType = function (t) {
  return isAv1(t) ? '' : canPlay.call(this, t);
};

const mc = navigator.mediaCapabilities;
if (mc?.decodingInfo) {
  const decInfo = mc.decodingInfo.bind(mc);
  mc.decodingInfo = cfg => isAv1(cfg?.video?.contentType)
    ? Promise.resolve({ supported: false, smooth: false, powerEfficient: false })
    : decInfo(cfg);
}
