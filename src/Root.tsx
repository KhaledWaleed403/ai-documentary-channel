import { Episode001Composition } from "./compositions/Episode001";
import { Episode001CaptionedComposition } from "./compositions/Episode001Captioned";
import { Episode001LongComposition } from "./compositions/Episode001Long";
import { Episode001LongThumbnailStill } from "./compositions/Episode001LongThumbnail";
import { Episode001ShortsCompositions } from "./compositions/Episode001Shorts";
import { Episode001ShortsThumbnailStills } from "./compositions/Episode001ShortsThumbnails";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Episode001Composition />
      <Episode001CaptionedComposition />
      <Episode001LongComposition />
      <Episode001LongThumbnailStill />
      <Episode001ShortsCompositions />
      <Episode001ShortsThumbnailStills />
    </>
  );
};
