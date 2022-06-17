import { Notice } from '../types/notice';

export const PREVIEW_NOTICE_CONTENT_LENGTH = 240;
export const PREVIEW_CONTENT_RATIO = 2;
export const LONGER_PREVIEW_CONTENT_RATIO = 3;
export const NOTICE_CONTENT_RATIO =
  PREVIEW_CONTENT_RATIO / LONGER_PREVIEW_CONTENT_RATIO;

export const VISIBLE_LATEST_NOTICES = 3;

// @todo remove when no longer mocked
export const notices: Notice[] = [
  {
    id: 'm39f',
    title: 'Looking for Journalistic Circle members!',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non justo ornare, fringilla lorem non, elementum sapien. Nulla vitae tellus velit. Morbi tempus lectus est, ut laoreet urna sodales at. Fusce et molestie felis. Suspendisse potenti. Pellentesque tellus enim, varius ac ultricies in, tincidunt eu erat. Donec vitae nisl ac mi semper ornare vitae nec elit. Proin sed convallis libero. Curabitur tincidunt mollis blandit.',
  },
  {
    id: 'k342',
    title: 'Extra biology classes are opened!',
    content:
      'Pellentesque sagittis sapien felis, ac varius massa gravida a. Pellentesque maximus tristique convallis. Cras convallis, diam quis varius feugiat, ex turpis porttitor elit, id hendrerit libero nibh non massa. Quisque quis lacinia est, et lacinia quam. Suspendisse id nulla non justo luctus semper. Praesent et feugiat purus, sit amet eleifend metus. Etiam eu congue nulla. Nunc at nulla enim. Curabitur at massa nec ante tempor pretium ut et nulla.',
  },
  {
    id: 'hm55',
    title: 'PE is going outdoors for the next two months',
    content:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque sit amet ornare lacus. Quisque id pulvinar justo. Sed dictum non eros et varius. Curabitur vitae ligula massa. Fusce tellus tortor, congue a molestie in, varius sit amet arcu. Cras auctor magna tortor, vel commodo purus hendrerit eget. Nam tempor accumsan mi. Pellentesque quis bibendum eros. Praesent dapibus auctor odio vitae tristique. Fusce id suscipit est, id pharetra quam. Aliquam mollis vitae quam vel faucibus. Curabitur commodo erat ut volutpat aliquam. Donec lobortis tortor sed justo semper laoreet. Curabitur semper nisi rhoncus iaculis viverra.',
  },
  {
    id: '2n1t',
    title: "Monthly Principal's announcement",
    content:
      'Proin feugiat ipsum vel neque lacinia faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Donec consectetur hendrerit feugiat. In dapibus sit amet erat id auctor. Donec iaculis libero vitae ante fringilla ornare. Vivamus massa magna, lobortis et rutrum at, commodo nec lectus. Fusce non ligula tristique ligula mollis tempus pellentesque sed augue. Aliquam euismod enim lacus, et sollicitudin tortor ultricies et.',
  },
  {
    id: '123t',
    title: 'New teacher joins starting November',
    content:
      'Etiam a arcu ut risus rutrum blandit. Maecenas consequat maximus mauris vitae consectetur. Morbi finibus nunc sapien, et vulputate sapien finibus id. Morbi in est at eros tempus scelerisque. Donec dictum mattis nulla, et dignissim magna semper et. Etiam vel neque diam. Nam tincidunt efficitur lorem, et luctus felis fermentum eu. Aliquam tempor tellus ac dui ornare, at dictum ligula feugiat. Quisque ipsum dolor, ornare id condimentum sed, posuere ac quam. Cras sodales consequat turpis, a lobortis odio hendrerit at. Aenean laoreet sollicitudin erat, eu fermentum nunc tempus et. Nunc tempus metus eget mi fermentum bibendum. Vivamus aliquet tincidunt arcu ut auctor. Morbi convallis bibendum magna, nec vestibulum lorem aliquam sit amet. Ut consectetur neque eu metus varius porta.',
  },
];
