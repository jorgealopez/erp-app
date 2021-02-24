export namespace Sidenav {

  export class GetSidenavItems {
    static readonly type = '[Sidenav] GetSidenavItems'
    constructor(public collection: string) {}
  }
}
