import { FigureNames } from "../models/figures/Figure";

export function getFigureName(key: string): FigureNames {
    switch(key) {
        case FigureNames.BISHOP:
            return FigureNames.BISHOP
        case FigureNames.KING:
            return FigureNames.KING
        case FigureNames.KNIGHT:
            return FigureNames.KNIGHT
        case FigureNames.PAWN:
            return FigureNames.PAWN
        case FigureNames.QUEEN:
            return FigureNames.QUEEN
        case FigureNames.ROOK:
            return FigureNames.ROOK
        default:
            throw new Error('unvalid name')
    }
}