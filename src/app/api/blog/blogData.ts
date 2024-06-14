import mock from "../mock";
import { Chance } from "chance";
import { random } from "lodash";
import { sub } from "date-fns";
import { uniqueId } from "lodash";
import { BlogType, BlogPostType } from "../../(DashboardLayout)/types/apps/blog";

const chance = new Chance();


const BlogComment: BlogType[] = [
  {
    id: uniqueId("#comm_"),
    profile: {
      id: chance.integer({ min: 1, max: 2000 }),
      avatar: "/images/profile/user-5.jpg",
      name: chance.name(),
    },
    time: chance.date(),
    comment: chance.paragraph({ sentences: 2 }),
    replies: [],
  },
  {
    id: uniqueId("#comm_"),
    profile: {
      id: chance.integer({ min: 1, max: 2000 }),
      avatar: "/images/profile/user-3.jpg",
      name: chance.name(),
    },
    time: chance.date(),
    comment: chance.paragraph({ sentences: 2 }),
    replies: [
      {
        id: uniqueId("#comm_"),
        profile: {
          id: chance.integer({ min: 1, max: 2000 }),
          avatar: "/images/profile/user-3.jpg",
          name: chance.name(),
        },
        time: chance.date(),
        comment: chance.paragraph({ sentences: 2 }),
      },
    ],
  },
  {
    id: uniqueId("#comm_"),
    profile: {
      id: chance.integer({ min: 1, max: 2000 }),
      avatar: "/images/profile/user-4.jpg",
      name: chance.name(),
    },
    time: chance.date(),
    comment: chance.paragraph({ sentences: 2 }),
    replies: [],
  },
];

const BlogPost: BlogPostType[] = [
  {
    id: 1,
    title: "Garmins Instinct Crossover is a rugged hybrid smartwatch",
    content: chance.paragraph({ sentences: 2 }),
    coverImg: "/images/blog/blog-img2.jpg",
    createdAt: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    category: "Gadget",
    featured: false,
    author: {
      id: 2,
      avatar: "/images/profile/user-5.jpg",
      name: chance.name(),
    },
    comments: BlogComment,
  },
  {
    id: 3,
    title: "After Twitter Staff Cuts, Survivors Face Radio Silence",
    content: chance.paragraph({ sentences: 2 }),
    coverImg: "/images/blog/blog-img1.jpg",
    createdAt: sub(new Date(), { days: 7, hours: 3, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    category: "Lifestyle",
    featured: false,
    author: {
      id: chance.integer({ min: 1, max: 2000 }),
      avatar: "/images/profile/user-2.jpg",
      name: chance.name(),
    },
    comments: BlogComment,
  },
  {
    id: 4,
    title:
      "Apple is apparently working on a new streamlined accessibility for iOS",
    content: chance.paragraph({ sentences: 2 }),
    coverImg: "/images/blog/blog-img3.jpg",
    createdAt: sub(new Date(), { days: 5, hours: 2, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    category: "Design",
    featured: false,
    author: {
      id: chance.integer({ min: 1, max: 2000 }),
      avatar: "/images/profile/user-3.jpg",
      name: chance.name(),
    },
    comments: BlogComment,
  },
  {
    id: 5,
    title: "Why Figma is selling to Adobe for $20 billion",
    content: chance.paragraph({ sentences: 2 }),
    coverImg: "/images/blog/blog-img4.jpg",
    createdAt: sub(new Date(), { days: 7, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    category: "Design",
    featured: false,
    author: {
      id: chance.integer({ min: 1, max: 2000 }),
      avatar: "/images/profile/user-4.jpg",
      name: chance.name(),
    },
    comments: BlogComment,
  },
  {
    id: 6,
    title: "Streaming video way before it was cool, go dark tomorrow",
    content: chance.paragraph({ sentences: 2 }),
    coverImg: "/images/blog/blog-img5.jpg",
    createdAt: sub(new Date(), { days: 4, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    category: "Lifestyle",
    featured: false,
    author: {
      id: chance.integer({ min: 1, max: 2000 }),
      avatar: "/images/profile/user-5.jpg",
      name: chance.name(),
    },
    comments: BlogComment,
  },
  {
    id: 7,
    title: "As yen tumbles, gadget-loving Japan goes for secondhand iPhones ",
    content: chance.paragraph({ sentences: 2 }),
    coverImg: "/images/blog/blog-img6.jpg",
    createdAt: sub(new Date(), { days: 2, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    category: "Gadget",
    featured: false,
    author: {
      id: chance.integer({ min: 1, max: 2000 }),
      avatar: "/images/profile/user-6.jpg",
      name: chance.name(),
    },
    comments: BlogComment,
  },
  {
    id: 8,
    title:
      "Intel loses bid to revive antitrust case against patent foe Fortress",
    content: chance.paragraph({ sentences: 2 }),
    coverImg: "/images/blog/blog-img11.jpg",
    createdAt: sub(new Date(), { days: 3, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    category: "Social",
    featured: false,
    author: {
      id: chance.integer({ min: 1, max: 2000 }),
      avatar: "/images/profile/user-2.jpg",
      name: chance.name(),
    },
    comments: BlogComment,
  },
  {
    id: 9,
    title: "COVID outbreak deepens as more lockdowns loom in China",
    content: chance.paragraph({ sentences: 2 }),
    coverImg: "/images/blog/blog-img8.jpg",
    createdAt: sub(new Date(), { days: 4, hours: 6, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    category: "Health",
    featured: false,
    author: {
      id: chance.integer({ min: 1, max: 2000 }),
      avatar: "/images/profile/user-3.jpg",
      name: chance.name(),
    },
    comments: BlogComment,
  },
  {
    id: 10,
    title: "하나님의 마음을 가장 아프게 하는 일",
    content: "하나님의 마음을 가장 아프게 하는 일은 무엇일까요?\n\n우리가 그분의 말씀에 불순종하고 죄를 짓는 것일까요? 그렇지 않습니다. 하나님께서 그분의 자녀인 우리를 그분의 목숨처럼 사랑하신다는 것을 우리가 믿지 않는 것입니다. 이것이 하나님 아버지의 가슴을 찢어질 듯 아프게 합니다.\n\n만약 당신이 양자를 입양한 부모라고 생각해보십시오. 당신이 정말 사랑을 주기 위해서 자녀를 입양했는데, 그 자녀가 당신의 사랑을 믿지도 않고 받아들이지도 않으며, 어떻게 해야 할지 몰라 한쪽 구석에 쭈그리고 앉아 있거나 늘 잘못해서 꾸중을 듣지 않을까 두려워한다면 당신의 마음이 어떨까요?\n\n만약 자녀가 식탁에 놓인 과자를 보고 “이거 먹어도 되나요? 이거 먹으려면 제가 어떤 착한 일을 해야 할까요?”라고 묻는다면 당신의 사랑을 누리지 못하고 죄짓지 않고 벌 받지 않기 위해 안절부절못하고 있다면 당신은 어떤 마음이 들 것 같은가요?\n\n‘내가 이렇게 하면 부모님이 기분 나빠 하시지 않을까?’, ‘죄를 짓거나 잘못을 저지르면 나를 입양한 것을 후회하면서 나를 내쫓으실지도 몰라’, ‘무엇이든지 내 마음대로 할 수 없어. 눈치 보며 적당히 해야 해’ 이와 같은 마음으로 당신을 대한다면 어떨까요? 당신이 무엇을 해주기만 하면, “고맙습니다. 감사합니다. 더 잘하겠습니다”, “최선을 다해서 순종하겠습니다” 그렇게 말한다면 당신은 정말 기쁠까요?\n\n나의 모든 것을 나누기 위해서, 사랑을 나누기 위해서, 세상에서 가장 사랑받는 자로 만들기 위해서, 자신이 원하는 것은 다 해주고 싶어서 입양한 자녀인데도 불구하고, 그 자녀가 이런 반응을 보인다면 당신의 마음이 찢어지지 않을까요? 이런 반응은 입양된 자녀로서 아버지 또는 어머니라고 부르기는 하지만, 부모님을 사랑하지도 않고 좋아하지도 않는 것입니다.\n\n혹시 우리의 모습이 이와 같지 않나요? 하나님과 자신의 관계를 생각해보십시오. 우리는 하나님 아버지를 위해서 최선을 다해 살지만, 그분을 사랑하지도 좋아하지도 즐거워하지도 않습니다. 단지 입양된 것만으로 감사하고, 혹시나 쫓겨나지 않을까 노심초사하며 은혜가 끊어지면 죽기 때문에 최선을 다해 신앙생활을 하는 것입니다. 그런데 하나님께서 그렇게 살라고 우리를 자녀 삼으신 것일까요? 우리가 계속해서 그런 삶을 살기를 원하실까요?\n\n우리는 그리스도 안에서 하나님의 사랑을 누리지 않고 거짓자아로 하나님의 사랑을 판단하고 있습니다. 거듭나 하나님의 자녀가 된 우리는 구원받기 전과 태생과 신분이 다름에도 불구하고 그분의 사랑을 누릴 줄도, 그분을 즐거워할 줄도, 자랑할 줄도 모릅니다.\n\n하나님 아버지께서는 애타는 마음으로 그분의 자녀인 우리가 그분의 무조건적인 사랑을 누림으로써 그분을 좋아하고 사랑하며 즐거워하고 자랑하기를 원하십니다. 복종은 분리됨을 전제하기 때문에 하나님의 사랑은 절대로 복종을 요구하지 않습니다. 그분의 사랑은 우리가 그분과 하나가 되는 것입니다. 그분은 우리가 의탁과 순종을 통해 그분을 나타내기를 원하십니다.\n\n- 환영합니다 성령님, 손기철",
    coverImg: "https://cnts-image.godpeople.com/2024/05/700_gZ8Sbsns_240528.jpg",
    createdAt: sub(new Date(), { days: 5, hours: 3, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    category: "Gadget",
    featured: true,
    author: {
      id: chance.integer({ min: 1, max: 2000 }),
      avatar: "/images/profile/user-4.jpg",
      name: chance.name(),
    },
    comments: BlogComment,
  },
  {
    id: 11,
    title: "주님의 마음을 잘 받는 법!!",
    content: chance.paragraph({ sentences: 2 }),
    coverImg: "https://cnts-image.godpeople.com/2024/06/700_m5GeSsns_240613.jpg",
    createdAt: sub(new Date(), { days: 0, hours: 1, minutes: 20 }),
    view: random(9999),
    share: random(9999),
    category: "Health",
    featured: true,
    author: {
      id: chance.integer({ min: 1, max: 2000 }),
      avatar: "/images/profile/user-5.jpg",
      name: chance.name(),
    },
    comments: BlogComment,
  },
];

mock.onGet("/api/data/blog/BlogPosts").reply(() => {
  return [200, BlogPost];
});

// ----------------------------------------------------------------------
mock.onPost("/api/data/blog/post").reply((config) => {
  try {
    const { id } = JSON.parse(config.data);

    console.log('featured : '+id)
    /*
    const paramCase = (t: string) =>
      t
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    */
    //const post = BlogPost.find((_post) => paramCase(_post.title) === title);
    const post = BlogPost.find((_post) => _post.id === id);    
  
    if (!post) {
      return [404, { message: "Post not found 2" }];
    }

    return [200, { post }];
  } catch (error) {
    console.error(error);

    return [500, { message: "Internal server error" }];
  }
});

mock.onPost("/api/data/blog/post/add").reply((config) => {
  try {
    const { postId, comment } = JSON.parse(config.data);
    const postIndex = BlogPost.findIndex((x) => x.id === postId);
    const post = BlogPost[postIndex];
    const cComments = post.comments || [];
    post.comments = [comment, ...cComments];

    return [200, { posts: [...BlogPost] }];
  } catch (err) {
    console.error(err);

    return [500, { message: "Internal server error" }];
  }
});
