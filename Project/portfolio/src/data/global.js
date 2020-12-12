export const global = {
  menu: {
    idle:-1,
    about: 0,
    works: 1,
    exhibition: 2,
    cv: 3,
    contact:4
  },
  worksMenu: {
    generativeArt:0,
    interactiveArt: 1,
    modeling: 2,
    software: 3,
  }
}

export const Data_Generative = {
  resourcePath: 'works',
  contents: [
    {
      thumbnailImage: 'soundVis_01',
      contentsImage: ['soundVis_01', 'soundVis_02', 'soundVis_03'],
      title: 'Sound visualisation',
      subTitle: 'This project demonstrates how to convert sound into a physical object',
      tool: 'Processing , Maya , Pakakura',
      description: 'The sound is the one of most sensory information for us to recognize what\'s going on the outside world. This audible information is mainly focused on our ears to perceive it. Hence, My question is that what happen if we could feel,see and touch this invisible energy. I mean how can our brain interpret the sound if the sound transformed into other medium. Does it help to listen to a sound? or it interrupts to enjoy listen to a sound? In order to do that, I used processing for sound analysis, Maya for build 3D object and laser cutter for cutting paper.'
    }
  ]
}