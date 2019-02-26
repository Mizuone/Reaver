import Player from "../character/player";
import { TransferOptions } from "../dtos/transfer-options";

export interface Location {
    draw(influenceObject: Player, drawTransitionOptions: Array<any>): void;
    transferNewLocation(location: any, transferOptions: TransferOptions): void;
}