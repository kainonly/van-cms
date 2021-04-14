import { IParticlesParams } from 'ng-particles';

export const particles: IParticlesParams = {
  fpsLimit: 60,
  particles: {
    color: {
      value: '#333'
    },
    // links: {
    //   color: '#ddd',
    //   distance: 150,
    //   enable: true,
    //   opacity: 0.5,
    //   width: 1
    // },
    collisions: {
      enable: true
    },
    move: {
      enable: true,
      direction: 'bottom-right',
      speed: 1.5
    },
    number: {
      density: {
        enable: true,
        value_area: 1000
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: 'circle'
    },
    size: {
      random: true,
      value: 4
    }
  },
  detectRetina: true
};
