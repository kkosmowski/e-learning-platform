import { Notice } from 'shared/types/notice';
import { TEACHER } from './user';

export const BOARD_NOTICE_CONTENT_LENGTH = 500;
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
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      '\n' +
      'Vivamus non justo ornare, fringilla lorem non, elementum sapien. Nulla vitae tellus velit. Morbi tempus lectus est, ut laoreet urna sodales at. Fusce et molestie felis. Suspendisse potenti. Pellentesque tellus enim, varius ac ultricies in, tincidunt eu erat. Donec vitae nisl ac mi semper ornare vitae nec elit. Proin sed convallis libero. Curabitur tincidunt mollis blandit.',
    author: TEACHER,
    published: true,
    publishTime: '2022-06-28T09:12:59.000Z',
  },
  {
    id: 'k342',
    title: 'Extra biology classes are opened!',
    content:
      'Pellentesque sagittis sapien felis, ac varius massa gravida a. Pellentesque maximus tristique convallis. Cras convallis, diam quis varius feugiat, ex turpis porttitor elit, id hendrerit libero nibh non massa. Quisque quis lacinia est, et lacinia quam. Suspendisse id nulla non justo luctus semper. Praesent et feugiat purus, sit amet eleifend metus. Etiam eu congue nulla. Nunc at nulla enim. Curabitur at massa nec ante tempor pretium ut et nulla.',
    author: TEACHER,
    published: true,
    publishTime: '2022-06-24T11:42:59.000Z',
  },
  {
    id: 'hm55',
    title: 'PE is going outdoors for the next two months',
    content:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque sit amet ornare lacus. Quisque id pulvinar justo. Sed dictum non eros et varius. Curabitur vitae ligula massa. Fusce tellus tortor, congue a molestie in, varius sit amet arcu. Cras auctor magna tortor, vel commodo purus hendrerit eget. Nam tempor accumsan mi. Pellentesque quis bibendum eros. Praesent dapibus auctor odio vitae tristique. Fusce id suscipit est, id pharetra quam. Aliquam mollis vitae quam vel faucibus. Curabitur commodo erat ut volutpat aliquam. Donec lobortis tortor sed justo semper laoreet. Curabitur semper nisi rhoncus iaculis viverra.',
    author: TEACHER,
    published: true,
    publishTime: '2022-06-20T13:52:59.000Z',
  },
  {
    id: '2n1t',
    title: "Monthly Principal's announcement",
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ullamcorper enim nisl, in dapibus massa porta at. Etiam purus quam, consectetur at neque porta, semper convallis libero. Nunc id porta neque, ut rutrum tortor. Mauris eget dolor est. Nam finibus sem ullamcorper, tincidunt elit ac, accumsan tortor. Aliquam ac purus vel tortor venenatis gravida. Curabitur rhoncus nulla magna, non sodales quam porta nec. Integer pellentesque odio sed augue facilisis, sit amet maximus mi volutpat. Praesent feugiat metus id felis egestas finibus. Nullam leo felis, condimentum sed fringilla non, rutrum eu enim. Nunc id risus orci. Etiam sit amet commodo lacus.\n' +
      '\n' +
      'Sed porta ante vel neque pharetra, vel sodales neque lacinia. Nullam vel mi rutrum, maximus arcu non, elementum turpis. Etiam eu risus leo. Nulla at rhoncus magna, nec eleifend erat. Vestibulum scelerisque vestibulum sapien. Nullam rutrum vehicula dictum. Etiam tellus elit, condimentum aliquet nisl sed, consequat commodo ex. Vivamus sed magna egestas tellus auctor cursus. Nulla sit amet tempus nunc. Ut id condimentum mi. Ut vitae auctor sem. Quisque eget facilisis lacus. Donec nec eleifend mauris. Vestibulum vitae neque id massa consectetur pellentesque. Donec ornare at turpis id semper. Interdum et malesuada fames ac ante ipsum primis in faucibus.\n' +
      '\n' +
      'Sed tortor sapien, ultrices iaculis massa ut, feugiat efficitur purus. Etiam fermentum nulla congue neque aliquam, non accumsan est accumsan. Donec eget tortor sapien. Donec molestie eu nisl nec volutpat. Fusce finibus id tortor vel dictum. Praesent nec augue sed felis euismod fringilla ut ut est. Nam sit amet magna dui. Aenean non lectus at ipsum tincidunt tincidunt. Mauris blandit dolor sed orci ultricies tincidunt. Phasellus id justo eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam est erat, lobortis vel augue id, aliquet cursus nibh. In vel vehicula eros, vestibulum imperdiet urna. Donec eleifend nibh in nisl porta ullamcorper.\n' +
      '\n' +
      'Nulla sit amet nisi at leo scelerisque cursus in id felis. Aliquam erat volutpat. Sed pulvinar aliquet venenatis. In hac habitasse platea dictumst. Mauris id magna erat. Vivamus porttitor lobortis est eget porta. Duis condimentum quis elit at elementum. Mauris volutpat pulvinar massa non ultrices. Donec sit amet nibh at purus varius dictum ut a metus. In nec justo lacinia magna fermentum fermentum. Suspendisse a sem porttitor, placerat arcu in, vestibulum turpis.\n' +
      '\n' +
      'Phasellus sed faucibus felis. Vivamus id ante luctus, bibendum ipsum a, cursus ex. In sed malesuada neque, et dictum nisi. Integer auctor sagittis maximus. Maecenas eu ex ut nisl pharetra accumsan a eget risus. Nam nec augue viverra diam volutpat eleifend ac rutrum massa. Cras ac lorem tempor, volutpat turpis eu, tincidunt lectus. In scelerisque rutrum velit, a tristique tortor pretium eget. Nunc sapien velit, molestie eget fringilla faucibus, tincidunt eu urna. Fusce quis odio posuere, blandit velit a, consectetur dolor. Aenean augue ipsum, egestas et eleifend ac, blandit eget neque. In tortor nulla, rhoncus laoreet facilisis quis, viverra vitae turpis. Nullam fermentum purus eu lorem sollicitudin, sit amet ultrices lacus faucibus.\n' +
      '\n' +
      'Sed at neque tincidunt, accumsan diam non, lobortis turpis. Suspendisse vestibulum lacinia neque, nec laoreet ante mattis a. Nunc ullamcorper vehicula cursus. Donec vel nulla purus. Maecenas ac libero dapibus, luctus massa et, bibendum arcu. Donec justo augue, eleifend nec ligula vel, gravida bibendum ipsum. Maecenas sapien magna, lacinia sit amet lobortis volutpat, vehicula non velit. Vivamus vel ultricies ante, sit amet aliquam dui. Nunc risus nisl, lobortis eget aliquam vitae, maximus vel nunc. Aliquam at turpis justo. Etiam nulla diam, feugiat vitae ante sit amet, euismod laoreet lorem. Morbi in massa pretium, volutpat ex feugiat, pretium nunc. Nam imperdiet nec augue ac laoreet. Cras nec gravida est. Duis vitae vehicula sapien. Cras tellus justo, efficitur tristique neque quis, dictum fermentum dolor.\n' +
      '\n' +
      'Phasellus suscipit vel leo in dictum. Maecenas dolor massa, imperdiet id cursus sit amet, eleifend ut elit. Suspendisse vitae orci eget magna malesuada consequat ac a lorem. Nullam non lacinia felis, sed auctor ligula. Integer vel ante eu nulla aliquet ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla eget convallis ante, ac feugiat sapien. Aenean consectetur consectetur eros, non convallis turpis blandit quis. Integer imperdiet libero a congue malesuada. Donec ut bibendum felis. Aliquam erat volutpat. Nullam sed lobortis felis, id semper urna. Ut maximus viverra nisl vel efficitur. Integer pulvinar hendrerit mauris non placerat.\n' +
      '\n' +
      'Aliquam eu porta quam. Suspendisse pulvinar gravida ante, blandit dictum augue tempus non. Vivamus eu justo tellus. In euismod malesuada diam, nec lobortis magna consequat ut. Etiam in dui dignissim, maximus quam sit amet, iaculis neque. Donec quam nibh, posuere vel risus in, interdum efficitur nunc. Mauris sodales mauris nulla, eu tempor odio lacinia sit amet. Fusce laoreet dui convallis magna lacinia vestibulum. Integer condimentum imperdiet ultricies. Donec vitae leo tempor, bibendum lorem finibus, molestie velit. Pellentesque molestie, neque et rhoncus sodales, risus lacus sagittis sapien, ut fringilla risus nulla quis diam. Phasellus laoreet venenatis est ac aliquam. Fusce lobortis, purus at hendrerit ultricies, augue mi porta nulla, nec tempor est urna rutrum odio. Donec sodales vel leo vel maximus. Sed ultrices urna eu ante ullamcorper imperdiet. Duis orci nisi, lacinia eu ante ac, rhoncus sagittis est.\n' +
      '\n' +
      'Cras facilisis mauris eget efficitur aliquet. Nullam aliquet nec metus nec pellentesque. Sed dolor enim, luctus sed quam non, mattis lacinia nisi. Praesent turpis ligula, consequat ut maximus ut, suscipit nec sapien. Vestibulum ac velit nisl. Maecenas feugiat arcu tristique tortor varius, a pretium dolor pulvinar. Proin purus mauris, rutrum ut justo non, tincidunt vehicula dui. Suspendisse id tellus laoreet, rhoncus lacus quis, porta ex. Sed eros ipsum, bibendum vitae pharetra quis, suscipit vel eros. Cras urna metus, bibendum id ullamcorper ac, maximus id augue. Donec et dolor sit amet dolor accumsan rutrum. Pellentesque efficitur cursus ante, at hendrerit nisl. Vivamus semper faucibus luctus. Vestibulum ut convallis nisi, quis efficitur dolor. Aenean volutpat pellentesque dui nec maximus. Vivamus commodo velit sollicitudin nisl aliquam scelerisque.\n' +
      '\n' +
      'Mauris nec dictum purus, quis posuere enim. Proin at imperdiet magna. Quisque vel massa nec nibh vehicula tempor vel vel magna. Pellentesque vestibulum porta tellus eu volutpat. Suspendisse potenti. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc sed magna sit amet erat tristique aliquet vel et sapien. Cras vitae odio ut nisi tincidunt auctor. Duis enim magna, accumsan at viverra a, vehicula in justo.\n' +
      '\n' +
      'Maecenas massa elit, dignissim ac feugiat eget, molestie ac libero. In vulputate tempor metus in condimentum. Cras mollis, neque nec consequat elementum, ante sem consequat nibh, maximus maximus tortor enim eget mi. Sed tincidunt arcu sed mi laoreet finibus. Nullam viverra ante ut fermentum tincidunt. Suspendisse venenatis tempor nunc, ac egestas elit. Ut varius lacinia iaculis. Curabitur ut tristique mi.\n' +
      '\n' +
      'Vestibulum mauris ante, commodo id ligula a, convallis molestie erat. Duis turpis nisl, interdum vitae fringilla in, gravida ut ligula. Suspendisse aliquet id neque vitae scelerisque. Nullam molestie augue id dui dictum, sed commodo nunc egestas. In tincidunt leo nec felis finibus, sed varius est efficitur. Morbi blandit velit eu semper facilisis. Proin nibh nisl, blandit ac felis ut, aliquam ultricies sapien. Morbi at elit erat. Proin a laoreet felis, at tincidunt ipsum. Vivamus purus metus, iaculis sit amet maximus a, tempus a lectus. Proin in diam ut ligula scelerisque bibendum nec non sapien.\n' +
      '\n' +
      'Sed feugiat nibh ante, id finibus nisl venenatis ac. Nunc aliquet lacus placerat nunc bibendum, ac faucibus metus elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque auctor orci neque, id feugiat eros facilisis vitae. Mauris ultricies odio eget porta vestibulum. Maecenas fringilla, quam vel ultricies porta, sem elit mattis augue, in tincidunt nibh augue convallis lacus. Pellentesque eu mauris rutrum nulla pharetra lobortis. Fusce justo justo, dignissim sit amet felis vitae, pulvinar consequat metus.\n' +
      '\n' +
      'Phasellus dolor arcu, laoreet sit amet nibh in, iaculis mollis libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed hendrerit fermentum tempus. Suspendisse odio lectus, vulputate vitae efficitur condimentum, auctor eget arcu. In hac habitasse platea dictumst. Aliquam vehicula sem ac lorem cursus congue. Fusce ac metus nisi.\n' +
      '\n' +
      'Proin id neque quis ante pharetra feugiat bibendum sit amet nisl. Sed et finibus odio. Vivamus non ligula id nulla tincidunt bibendum in sed turpis. Cras a justo mauris. Nulla gravida cursus finibus. Nunc blandit libero in sapien finibus pharetra. Sed lobortis sed tortor ac commodo. Nulla facilisi. Vivamus hendrerit, massa sed placerat posuere, tortor augue tincidunt libero, id vehicula leo orci tristique velit. Suspendisse efficitur lobortis pharetra. Morbi in velit quis risus molestie feugiat elementum condimentum velit. Aenean congue nibh tortor, ut bibendum lectus faucibus ut.\n' +
      '\n' +
      'Sed ut metus scelerisque, sagittis quam luctus, rutrum dui. In tellus mi, tempus id nibh sit amet, blandit viverra dui. Duis maximus, quam et sagittis malesuada, dui arcu dapibus nibh, id commodo purus erat at enim. Fusce sit amet finibus arcu. Mauris mollis egestas nunc. Curabitur ligula nulla, eleifend id risus nec, ullamcorper iaculis mauris. Morbi lacinia, metus eu tincidunt commodo, magna nibh malesuada est, eu fermentum diam nisi non orci. Phasellus rhoncus, risus et malesuada ultricies, risus velit cursus lectus, vitae bibendum ante magna eu ex. Aenean egestas purus risus, convallis volutpat ante tempus id. Phasellus in magna et justo convallis facilisis. Mauris ultrices nunc sed nunc luctus, nec sollicitudin nibh semper.\n' +
      '\n' +
      'Maecenas quis gravida dui, sit amet facilisis ante. Etiam volutpat dictum urna, ut maximus magna faucibus vitae. Phasellus ac lorem eu magna ultricies eleifend. Praesent in commodo dui, non congue purus. Nulla at hendrerit odio, nec luctus erat. Sed vel sollicitudin velit. Morbi sagittis elementum diam fringilla finibus. Aenean sollicitudin faucibus faucibus. Etiam placerat eleifend commodo. Nam vulputate odio magna, lobortis condimentum libero sagittis vel. Fusce efficitur quam a ex ornare, vel lacinia sapien ultricies.\n' +
      '\n' +
      'Quisque condimentum magna ut malesuada varius. Ut vitae venenatis nibh. Fusce bibendum in risus a tempor. Donec vel convallis diam. Etiam eget libero aliquet, posuere metus id, varius ipsum. Aliquam laoreet imperdiet turpis non tempus. Suspendisse sed massa tincidunt purus scelerisque consequat. Sed volutpat auctor tortor. Cras at leo pretium, pretium augue sit amet, facilisis nulla.\n' +
      '\n' +
      'Donec vel metus vel sapien pharetra imperdiet vitae vel quam. Maecenas volutpat consequat viverra. Curabitur rhoncus, ante in placerat mattis, lorem felis vulputate diam, sit amet tristique diam sem ac lacus. Ut vitae pretium enim. Nullam ullamcorper diam sed nisi euismod euismod. In finibus dignissim ex sed malesuada. Nullam vel consectetur orci. Ut eu tortor ut nisi dignissim tempus vitae quis nunc. Nam vel mauris non ligula vestibulum dictum. Aliquam facilisis, risus at vestibulum porttitor, ipsum neque interdum urna, ac dapibus lorem nisi eu nibh. Phasellus pretium, leo a iaculis vestibulum, purus ex lobortis lacus, eget faucibus tellus ipsum et magna. Donec pellentesque tellus efficitur turpis rhoncus tempor. Integer tempus efficitur felis, non pulvinar turpis sagittis ac. Donec purus diam, rutrum nec rutrum eu, suscipit mollis tellus. Morbi nec diam eget quam hendrerit auctor ut in orci.\n' +
      '\n' +
      'Mauris sapien augue, aliquam eu pulvinar sed, auctor ac metus. Sed efficitur justo enim, eu finibus est ultricies nec. Integer eget neque orci. Donec purus risus, hendrerit in viverra sit amet, consectetur eu nunc. Suspendisse odio augue, ultrices pulvinar bibendum vel, sagittis eu eros. Morbi viverra viverra risus, scelerisque malesuada elit rhoncus a. Mauris nunc leo, consequat vel hendrerit vel, venenatis varius eros. Integer purus diam, congue in ipsum lobortis, varius vestibulum velit. Nulla a velit justo. Integer mollis sem ut enim pulvinar varius ac ut eros. In placerat aliquam leo ac maximus. Vivamus luctus at arcu ut rhoncus. In leo mauris, pharetra sit amet suscipit ac, pulvinar sit amet ante. Proin nisl est, egestas ut erat nec, posuere convallis orci. Nunc aliquam elementum mi, a lobortis metus.\n' +
      '\n' +
      'Aliquam eget ultrices quam, auctor varius elit. Nam faucibus, ex sit amet maximus eleifend, diam ipsum congue tellus, eget volutpat dui diam eget metus. Etiam vitae nisi convallis, elementum quam eu, congue leo. Nam lacinia placerat tempus. Fusce quis mattis ipsum. Ut convallis finibus felis eget rutrum. Vivamus id lobortis libero, id laoreet arcu. Mauris augue risus, interdum eu semper nec, condimentum at dolor. Nam ultricies enim quis urna mattis, vel tempor justo feugiat. Integer nec consectetur purus. Maecenas diam ipsum, posuere sit amet libero vitae, viverra pharetra nisl. Curabitur ac ornare nisl. Donec hendrerit sapien ac quam tristique suscipit. Sed id ex lobortis, consectetur elit mattis, rhoncus tellus.\n' +
      '\n' +
      'Donec ultricies bibendum sem, a commodo erat dapibus eget. Ut et tincidunt dolor. Phasellus pretium dolor sed nisi viverra, porttitor euismod est placerat. Curabitur efficitur dolor quis arcu facilisis, consectetur gravida arcu tempor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce eget eros interdum, dapibus arcu porta, rhoncus nibh. Ut sit amet lacinia nibh. Donec id erat orci. Curabitur in tempor enim. Etiam efficitur quis elit vel lobortis. Praesent vitae purus lacus.\n' +
      '\n' +
      'Etiam lacinia tristique euismod. Ut nisl ex, faucibus a rhoncus a, blandit vitae nisi. Maecenas efficitur a lacus quis auctor. Sed nulla metus, euismod at condimentum a, volutpat luctus diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce consequat augue quis sapien consequat sollicitudin. Sed imperdiet ornare libero, vel sagittis massa gravida finibus.\n' +
      '\n' +
      'Praesent neque nulla, ultricies id risus a, mollis lacinia turpis. Cras iaculis tincidunt tincidunt. Nunc erat quam, ultrices eu neque sit amet, facilisis mattis justo. Etiam lobortis diam in nulla condimentum ullamcorper. Vivamus fermentum tortor dolor, sed efficitur augue mollis in. Ut consequat sed lorem vitae lobortis. Phasellus non mi in nisl finibus lacinia. Sed quis mauris vitae nisi placerat efficitur.\n' +
      '\n' +
      'Duis sit amet imperdiet urna. Vivamus elementum condimentum velit nec commodo. Curabitur dapibus nibh risus. Curabitur eu nulla purus. Nam vel dictum dui. Etiam vel diam congue, consequat mi ac, facilisis lorem. Maecenas volutpat ligula et neque venenatis, quis condimentum diam euismod. Sed vestibulum, mi vitae auctor vulputate, quam tellus suscipit est, et mollis massa ipsum at arcu. In sed erat sed quam hendrerit mattis et et nisi. Nam semper laoreet sapien ac hendrerit. Praesent aliquam, massa eu ultrices ornare, orci ante posuere mauris, quis condimentum odio massa quis ligula. Morbi lorem felis, sollicitudin at imperdiet sed, malesuada quis neque.\n' +
      '\n' +
      'Donec vitae quam lectus. Integer interdum augue semper, sollicitudin dui ac, dapibus neque. Pellentesque vitae tortor sit amet velit maximus fringilla. Sed congue ante a neque elementum aliquam. Quisque facilisis leo ac ipsum convallis faucibus. Praesent dui tortor, ullamcorper eu urna et, aliquet elementum urna. Aenean ullamcorper fermentum metus, ac blandit dui. Sed sit amet dignissim urna. In augue ipsum, maximus vel ante in, ultrices aliquet felis. Curabitur porta in lectus auctor finibus.\n' +
      '\n' +
      'Sed ac mauris et enim mollis mollis. Etiam eget mauris in enim hendrerit interdum. Vestibulum nec auctor dui, id lobortis lacus. Aenean egestas ipsum leo. Quisque sit amet lacus pharetra, rutrum sapien quis, consectetur orci. Maecenas a blandit lacus, vitae porttitor metus. Nam non consectetur nulla. In quis elit malesuada, ornare quam ac, molestie ante. Vestibulum in enim vestibulum, vulputate lorem et, dictum massa.',
    author: TEACHER,
    published: true,
    publishTime: '2022-06-11T08:03:59.000Z',
  },
  {
    id: '123t',
    title: 'New teacher joins starting November',
    content:
      'Etiam a arcu ut risus rutrum blandit. Maecenas consequat maximus mauris vitae consectetur. Morbi finibus nunc sapien, et vulputate sapien finibus id. Morbi in est at eros tempus scelerisque. Donec dictum mattis nulla, et dignissim magna semper et. Etiam vel neque diam. Nam tincidunt efficitur lorem, et luctus felis fermentum eu. Aliquam tempor tellus ac dui ornare, at dictum ligula feugiat. Quisque ipsum dolor, ornare id condimentum sed, posuere ac quam. Cras sodales consequat turpis, a lobortis odio hendrerit at. Aenean laoreet sollicitudin erat, eu fermentum nunc tempus et. Nunc tempus metus eget mi fermentum bibendum. Vivamus aliquet tincidunt arcu ut auctor. Morbi convallis bibendum magna, nec vestibulum lorem aliquam sit amet. Ut consectetur neque eu metus varius porta.',
    author: TEACHER,
    published: true,
    publishTime: '2022-06-05T12:25:59.000Z',
  },
];
