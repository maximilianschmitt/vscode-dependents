declare module "dependents" {
  type Options = {
    filename: string;
    directory: string;
    config?: string;
    webpackConfig?: string;
    exclude?: string[];
  };

  type Callback = (err: any, deps: string[]) => any;

  export default function dependents(opts: Options, cb: Callback): any;
}
