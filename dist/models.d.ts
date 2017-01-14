import { Model } from 'rawmodel';
export interface ReactiveModelRecipe {
    parent?: Model;
    vm?: any;
    dataKey?: string;
    [key: string]: any;
}
export declare class ReactiveModel extends Model {
    private _debounce;
    readonly vm: any;
    readonly dataKey: string;
    constructor(data?: ReactiveModelRecipe);
    isReactive(): boolean;
    $rebuild(): this;
    $forceUpdate(): this;
    $populate(data: any): this;
    $applyErrors(errors?: any[]): this;
    $clear(): this;
    $fake(): this;
    $handle(error: any, {debounce, quiet}?: {
        debounce?: number;
        quiet?: boolean;
    }): Promise<this>;
    $invalidate(): this;
    $reset(): this;
    $rollback(): this;
    $validate({debounce, quiet}?: {
        debounce?: number;
        quiet?: boolean;
    }): Promise<this>;
}
