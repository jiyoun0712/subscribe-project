import mock from '../mock';
import { sub } from 'date-fns';
import { Chance } from 'chance';
import { uniqueId } from 'lodash';

const chance = new Chance();

const GalleryData = [
    {
      id: 1,
      cover: "https://cnts-image.godpeople.com/wallpaper/watch/no/2024/gp_2405_insta1_27laAz.jpg",
      name: chance.sentence({ words: 103 }),
      time: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    },
    {
      id: 2,
      cover: "https://cnts-image.godpeople.com/wallpaper/watch/no/2024/gp_240604_insta4_2mCK0d.jpg",
      name: chance.sentence({ words: 103 }),
      time: sub(new Date(), { days: 8, hours: 4, minutes: 20 }),
    },
    {
      id: 3,
      cover: "https://cnts-image.godpeople.com/wallpaper/watch/ko/2024/gp_2407_insta3_1IkTQu.jpg",
      name: chance.sentence({ words: 3 }),
      time: sub(new Date(), { days: 8, hours: 3, minutes: 20 }),
    },
    {
      id: 4,
      cover: "https://cnts-image.godpeople.com/wallpaper/watch/ko/2024/gp_2407_insta2_1wip1f.jpg",
      name: chance.sentence({ words: 3 }),
      time: sub(new Date(), { days: 8, hours: 2, minutes: 20 }),
    },
    {
      id: 5,
      cover: "https://cnts-image.godpeople.com/wallpaper/tablet/no/2024/gp_2409_t1_56KCH1.jpg",
      name: chance.sentence({ words: 103 }),
      time: sub(new Date(), { days: 8, hours: 1, minutes: 20 }),
    },
    {
      id: 6,
      cover: "https://cnts-image.godpeople.com/wallpaper/mobile/no/2024/gp_2409_ip2_43K4uR.jpg",
      name: chance.sentence({ words: 203 }),
      time: sub(new Date(), { days: 7, hours: 6, minutes: 20 }),
    },
    {
      id: 7,
      cover: "https://cnts-image.godpeople.com/wallpaper/tablet/no/2024/gp_2409_t4_28hcb6.jpg",
      name: chance.sentence({ words: 203 }),
      time: sub(new Date(), { days: 6, hours: 6, minutes: 20 }),
    },
    {
      id: 8,
      cover: "https://cnts-image.godpeople.com/wallpaper/tablet/no/2024/gp_2409_t5_3lHVcL.jpg",
      name: chance.sentence({ words: 503 }),
      time: sub(new Date(), { days: 5, hours: 6, minutes: 20 }),
    },
    {
      id: 9,
      cover: "https://cnts-image.godpeople.com/wallpaper/tablet/no/2024/gp_2408_t2_3oObIq.jpg",
      name: chance.sentence({ words: 63 }),
      time: sub(new Date(), { days: 4, hours: 6, minutes: 20 }),
    },
    {
      id: 10,
      cover: "https://cnts-image.godpeople.com/wallpaper/tablet/no/2024/gp_2408_t1_3jeb13.jpg",
      name: chance.sentence({ words: 90 }),
      time: sub(new Date(), { days: 3, hours: 6, minutes: 20 }),
    },
    {
      id: 11,
      cover: "https://cnts-image.godpeople.com/wallpaper/tablet/no/2024/gp_2408_t4_36RKdT.jpg",
      name: chance.sentence({ words: 103 }),
      time: sub(new Date(), { days: 2, hours: 6, minutes: 20 }),
    },
    {
      id: 12,
      cover: "https://cnts-image.godpeople.com/wallpaper/tablet/no/2024/gp_2408_t6_3qvOMf.jpg",
      name: chance.sentence({ words: 103 }),
      time: sub(new Date(), { days: 1, hours: 6, minutes: 20 }),
    },
  ];

  

mock.onGet('/api/data/gallery/GalleryData').reply(() => {
    return [200, GalleryData];
  });
  