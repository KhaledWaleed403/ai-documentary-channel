// Audio files imported from episodes/*/assets resolve to a URL via the bundler.
declare module "*.wav" {
  const src: string;
  export default src;
}
