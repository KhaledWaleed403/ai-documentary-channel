import { Episode001Composition } from "./compositions/Episode001";
import { Episode001LongComposition } from "./compositions/Episode001Long";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Episode001Composition />
      <Episode001LongComposition />
    </>
  );
};
