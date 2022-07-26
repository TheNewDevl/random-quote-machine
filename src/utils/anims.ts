const rotateKeyf: Keyframe[] = [
  { transform: "rotate(0deg)" },
  { transform: "rotate(360deg) scale(0)" },
];

const reverseRotateKeyf: Keyframe[] = [
  { transform: "rotate(360deg) scale(0)" },
  { transform: " rotate(0deg) scale(1)" },
];

const defaultOpions: KeyframeAnimationOptions = {
  duration: 500,
  easing: "ease-in-out",
  fill: "forwards",
};

export const rotateFn = (el: HTMLElement, options?: KeyframeAnimationOptions) => {
  const keyframe = new KeyframeEffect(el, rotateKeyf, {
    ...defaultOpions,
    ...options,
  });

  return new Animation(keyframe, document.timeline);
};

export const reverseRotateFn = (el: HTMLElement, options?: KeyframeAnimationOptions) => {
  const keyframe = new KeyframeEffect(el, reverseRotateKeyf, {
    ...defaultOpions,
    ...options,
  });

  return new Animation(keyframe, document.timeline);
};
