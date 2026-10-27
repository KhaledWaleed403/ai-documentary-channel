import { Episode001Composition } from "./compositions/Episode001";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Episode001Composition />
    </>
  );
};
